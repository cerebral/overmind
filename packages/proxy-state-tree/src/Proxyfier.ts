import { IMutationTree, ITrackStateTree, TTree } from './types'

const ENVIRONMENT = (() => {
  let env: string
  try {
    env = process.env.NODE_ENV!
  } catch {
    env = 'development'
  }

  return env
})()

export const IS_PROXY = Symbol('IS_PROXY')
export const PATH = Symbol('PATH')
export const VALUE = Symbol('VALUE')
export const PROXY_TREE = Symbol('PROXY_TREE')

const isPlainObject = (value: any) => {
  return (
    String(value) === '[object Object]' && value.constructor.name === 'Object'
  )
}

const arrayMutations = new Set([
  'push',
  'shift',
  'pop',
  'unshift',
  'splice',
  'reverse',
  'sort',
  'copyWithin',
])

const getValue = (proxyOrValue) =>
  proxyOrValue && proxyOrValue[IS_PROXY] ? proxyOrValue[VALUE] : proxyOrValue

const isClass = (value) =>
  typeof value === 'object' &&
  value !== null &&
  !Array.isArray(value) &&
  value.constructor.name !== 'Object' &&
  Object.isExtensible(value)

const shouldProxy = (value: any) => {
  return (
    value !== undefined &&
    (!isClass(value) ||
      (isClass(value) &&
        !(value instanceof Date) &&
        !(value instanceof Map) &&
        !(value instanceof Set)))
  )
}

export class Proxifier {
  CACHED_PROXY = Symbol('CACHED_PROXY')
  delimiter: string
  ssr: boolean
  constructor(private tree: TTree) {
    this.delimiter = tree.master.options.delimiter
    this.ssr = Boolean(tree.master.options.ssr)
  }

  private concat(path, prop) {
    return path ? path + this.delimiter + prop : prop
  }

  ensureMutationTrackingIsEnabled(path) {
    if (ENVIRONMENT === 'production') return

    if (this.tree.master.options.devmode && !this.tree.canMutate()) {
      throw new Error(
        `proxy-state-tree - You are mutating the path "${path}", but it is not allowed. The following could have happened:
        
        - The mutation is explicitly being blocket
        - You are passing state to a 3rd party tool trying to manipulate the state
        - You are running asynchronous code and forgot to "await" its execution
        `
      )
    }
  }

  isDefaultProxifier() {
    return this.tree.proxifier === this.tree.master.proxifier
  }

  ensureValueDosntExistInStateTreeElsewhere(value) {
    if (ENVIRONMENT === 'production') return

    if (value && value[IS_PROXY] === true) {
      throw new Error(
        `proxy-state-tree - You are trying to insert a value that already exists in the state tree on path "${
          value[PATH]
        }"`
      )
    }

    return value
  }

  trackPath(path: string) {
    if (!this.tree.canTrack()) {
      return
    }

    if (this.isDefaultProxifier()) {
      const trackStateTree = this.tree.master.currentTree as ITrackStateTree<
        any
      >

      if (!trackStateTree) {
        return
      }

      trackStateTree.addTrackingPath(path)
    } else {
      ;(this.tree as ITrackStateTree<any>).addTrackingPath(path)
    }
  }

  // With tracking trees we want to ensure that we are always
  // on the currently tracked tree. This ensures when we access
  // a tracking proxy that is not part of the current tracking tree (pass as prop)
  // we move the ownership to the current tracker
  getTrackingTree() {
    if (this.tree.master.currentTree && this.isDefaultProxifier()) {
      return this.tree.master.currentTree
    }

    if (!this.tree.canTrack()) {
      return null
    }

    if (this.tree.canTrack()) {
      return this.tree
    }

    return null
  }

  getMutationTree() {
    return this.tree.master.mutationTree || (this.tree as IMutationTree<any>)
  }

  private isProxyCached(value, path) {
    return (
      value[this.CACHED_PROXY] &&
      String(value[this.CACHED_PROXY][PATH]) === String(path)
    )
  }

  private createArrayProxy(value, path) {
    if (!this.ssr && this.isProxyCached(value, path)) {
      return value[this.CACHED_PROXY]
    }

    const proxifier = this

    const proxy = new Proxy(value, {
      get(target, prop) {
        if (prop === IS_PROXY) return true
        if (prop === PATH) return path
        if (prop === VALUE) return value
        if (prop === 'indexOf') {
          return (searchTerm, offset) =>
            value.indexOf(getValue(searchTerm), getValue(offset))
        }
        if (
          prop === 'length' ||
          (typeof target[prop] === 'function' &&
            !arrayMutations.has(String(prop))) ||
          typeof prop === 'symbol'
        ) {
          return target[prop]
        }

        const trackingTree = proxifier.getTrackingTree()
        const nestedPath = proxifier.concat(path, prop)
        const currentTree = trackingTree || proxifier.tree

        trackingTree && trackingTree.proxifier.trackPath(nestedPath)
        currentTree.trackPathListeners.forEach((cb) => cb(nestedPath))

        const method = String(prop)

        if (arrayMutations.has(method)) {
          /* @__PURE__ */ proxifier.ensureMutationTrackingIsEnabled(nestedPath)
          return (...args) => {
            const mutationTree = proxifier.getMutationTree()

            let result

            if (ENVIRONMENT === 'production') {
              result = target[prop](...args)
            } else {
              result = target[prop](
                ...args.map((arg) =>
                  /* @__PURE__ */ proxifier.ensureValueDosntExistInStateTreeElsewhere(
                    arg
                  )
                )
              )
            }

            mutationTree.addMutation({
              method,
              path: path,
              delimiter: proxifier.delimiter,
              args: args,
              hasChangedValue: true,
            })

            return result
          }
        }

        if (shouldProxy(target[prop])) {
          return proxifier.proxify(target[prop], nestedPath)
        }

        return target[prop]
      },
      set(target, prop, value) {
        const nestedPath = proxifier.concat(path, prop)

        /* @__PURE__ */ proxifier.ensureMutationTrackingIsEnabled(nestedPath)
        /* @__PURE__ */ proxifier.ensureValueDosntExistInStateTreeElsewhere(
          value
        )

        const mutationTree = proxifier.getMutationTree()
        const result = Reflect.set(target, prop, value)

        mutationTree.addMutation({
          method: 'set',
          path: nestedPath,
          args: [value],
          delimiter: proxifier.delimiter,
          hasChangedValue: true,
        })

        return result
      },
    })

    if (!this.ssr) {
      Object.defineProperty(value, this.CACHED_PROXY, {
        value: proxy,
        configurable: true,
      })
    }

    return proxy
  }

  private createObjectProxy(object, path) {
    if (!this.ssr && this.isProxyCached(object, path)) {
      return object[this.CACHED_PROXY]
    }

    const proxifier = this

    const proxy = new Proxy(object, {
      get(target, prop) {
        if (prop === IS_PROXY) return true
        if (prop === PATH) return path
        if (prop === VALUE) return object
        if (prop === PROXY_TREE) return proxifier.tree

        if (typeof prop === 'symbol' || prop in Object.prototype)
          return target[prop]

        const descriptor =
          Object.getOwnPropertyDescriptor(target, prop) ||
          (Object.getPrototypeOf(target) &&
            Object.getOwnPropertyDescriptor(
              Object.getPrototypeOf(target),
              prop
            ))

        if (descriptor && 'get' in descriptor) {
          const value = descriptor.get.call(proxy)

          if (
            proxifier.tree.master.options.devmode &&
            proxifier.tree.master.options.onGetter
          ) {
            proxifier.tree.master.options.onGetter(
              proxifier.concat(path, prop),
              value
            )
          }

          return value
        }

        const trackingTree = proxifier.getTrackingTree()
        const targetValue = target[prop]
        const nestedPath = proxifier.concat(path, prop)
        const currentTree = trackingTree || proxifier.tree

        if (typeof targetValue === 'function') {
          if (proxifier.tree.master.options.onGetFunction) {
            return proxifier.tree.master.options.onGetFunction(
              trackingTree || proxifier.tree,
              nestedPath,
              target,
              prop
            )
          }
          return isClass(target)
            ? targetValue
            : targetValue.call(target, proxifier.tree, nestedPath)
        } else {
          currentTree.trackPathListeners.forEach((cb) => cb(nestedPath))
          trackingTree && trackingTree.proxifier.trackPath(nestedPath)
        }

        if (shouldProxy(targetValue)) {
          return proxifier.proxify(targetValue, nestedPath)
        }

        return targetValue
      },
      set(target, prop, value) {
        const nestedPath = proxifier.concat(path, prop)

        /* @__PURE__ */ proxifier.ensureMutationTrackingIsEnabled(nestedPath)
        /* @__PURE__ */ proxifier.ensureValueDosntExistInStateTreeElsewhere(
          value
        )

        let objectChangePath

        if (!(prop in target)) {
          objectChangePath = path
        }

        const mutationTree = proxifier.getMutationTree()
        const existingValue = target[prop]

        if (
          typeof value === 'function' &&
          proxifier.tree.master.options.onSetFunction
        ) {
          value = proxifier.tree.master.options.onSetFunction(
            proxifier.getTrackingTree() || proxifier.tree,
            nestedPath,
            target,
            prop,
            value
          )
        }

        const hasChangedValue = existingValue !== value
        const result = Reflect.set(target, prop, value)

        mutationTree.addMutation(
          {
            method: 'set',
            path: nestedPath,
            args: [value],
            delimiter: proxifier.delimiter,
            hasChangedValue,
          },
          objectChangePath
        )

        return result
      },
      deleteProperty(target, prop) {
        const nestedPath = proxifier.concat(path, prop)

        /* @__PURE__ */ proxifier.ensureMutationTrackingIsEnabled(nestedPath)

        let objectChangePath
        if (prop in target) {
          objectChangePath = path
        }

        const mutationTree = proxifier.getMutationTree()

        delete target[prop]

        mutationTree.addMutation(
          {
            method: 'unset',
            path: nestedPath,
            args: [],
            delimiter: proxifier.delimiter,
            hasChangedValue: true,
          },
          objectChangePath
        )

        return true
      },
    })

    if (!this.ssr) {
      Object.defineProperty(object, this.CACHED_PROXY, {
        value: proxy,
        configurable: true,
      })
    }

    return proxy
  }

  proxify(value: any, path: string) {
    if (value) {
      const isUnmatchingProxy =
        value[IS_PROXY] &&
        (String(value[PATH]) !== String(path) ||
          value[VALUE][this.CACHED_PROXY] !== value)

      if (isUnmatchingProxy) {
        return this.proxify(value[VALUE], path)
      } else if (value[IS_PROXY]) {
        return value
      } else if (Array.isArray(value)) {
        return this.createArrayProxy(value, path)
      } else if (isPlainObject(value) || isClass(value)) {
        return this.createObjectProxy(value, path)
      }
    }

    return value
  }
}
