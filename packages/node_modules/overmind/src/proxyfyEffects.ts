export const doNotProxy = Symbol('doNotProxy')

function isObject(value) {
  return typeof value === 'object' && !Array.isArray(value) && value !== null
}

let hasWarnedConstructor = false
let currentEffectId = 0

function wrapEffect(target, prop, path, cb) {
  const func = function(...args) {
    const effectId = currentEffectId++

    return cb({
      func: target[prop].bind(target),
      effectId,
      name: path,
      method: prop,
      args,
    })
  }

  return new Proxy(func, {
    construct(_, args) {
      if (!hasWarnedConstructor) {
        console.warn(
          `EFFECTS - It is highly recommended to create a custom effect, exposing a method that deals with the instantiation of "${path}.${prop.toString()}". It improves readability and debugability of your app`
        )
        hasWarnedConstructor = true
      }

      return new target[prop](...args)
    },
  })
}

function createProxyGetHandler(
  path: string,
  cb: (effect) => void
): ProxyHandler<any>['get'] {
  return (target, prop) => {
    if (typeof target[prop] === 'function') {
      return wrapEffect(target, prop, path, cb)
    }

    if (isObject(target[prop])) {
      return new Proxy(target[prop], {
        get: createProxyGetHandler(
          path ? path + '.' + prop.toString() : prop.toString(),
          cb
        ),
      })
    }
    return target[prop]
  }
}

export function proxifyEffects<Effects>(
  effects: Effects,
  cb: (effect) => void
): Effects {
  return new Proxy(effects, {
    get: createProxyGetHandler('', cb),
  })
}
