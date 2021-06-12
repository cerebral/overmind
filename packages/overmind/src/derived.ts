import { EventEmitter } from 'betsy'
import {
  IMutationTree,
  IS_PROXY,
  ITrackStateTree,
  ProxyStateTree,
  TrackStateTree,
} from 'proxy-state-tree'

import { EventType, Events } from './internalTypes'

export const IS_DERIVED = Symbol('IS_DERIVED')
export const IS_DERIVED_CONSTRUCTOR = Symbol('IS_DERIVED_CONSTRUCTOR')

export class Derived {
  private isDirty: boolean = true
  private previousProxifier: any
  private value: any
  private paths: Set<string>
  private updateCount: number = 0
  private disposeOnMutation: () => void
  constructor(private cb: (state: object, parent: object) => void) {
    const boundEvaluate: any = this.evaluate.bind(this)

    if (process.env.NODE_ENV === 'development') {
      boundEvaluate.dispose = () => {
        this.disposeOnMutation()
      }
    }

    boundEvaluate[IS_DERIVED] = true

    return boundEvaluate
  }

  private runScope(tree, path) {
    const parent = path
      .slice(0, path.length - 1)
      .reduce((curr, key) => curr[key], tree.state)

    return this.cb(parent, tree.state)
  }

  evaluate(
    eventHub: EventEmitter<Events>,
    tree: ITrackStateTree<any> | IMutationTree<any>,
    proxyStateTree: ProxyStateTree<any>,
    path
  ) {
    if (!this.disposeOnMutation) {
      this.disposeOnMutation = proxyStateTree.onMutation(
        (_, paths, flushId) => {
          if (
            typeof path.reduce(
              (aggr, key) => aggr && aggr[key],
              proxyStateTree.sourceState
            ) !== 'function'
          ) {
            this.disposeOnMutation()
            return
          }

          if (this.isDirty) {
            return
          }

          for (const mutationPath of paths) {
            if (this.paths.has(mutationPath)) {
              this.isDirty = true
              eventHub.emitAsync(EventType.DERIVED_DIRTY, {
                derivedPath: path,
                path: mutationPath,
                flushId,
              })
              return
            }
          }
        }
      )
    }

    // During development we need to move the ownership of whatever state is returned from
    // the derived to track it correctly. In production we only have one proxifier, so no worries
    if (this.isDirty || this.previousProxifier !== tree.proxifier) {
      const getPaths = tree.trackPaths()

      this.value = this.runScope(tree, path)
      this.isDirty = false
      this.paths = getPaths()

      if (process.env.NODE_ENV === 'development') {
        eventHub.emitAsync(EventType.DERIVED, {
          path,
          paths: Array.from(this.paths),
          updateCount: this.updateCount,
          value: this.value,
        })
        this.updateCount++
      }
    }

    if (tree instanceof TrackStateTree) {
      // If we access a cached value we have to make sure that we move
      // the tracked paths into the tree looking at it, where
      // addTrackingPath is for initial tree and "trackPathListeners"
      // is for nested derived
      for (const path of this.paths) {
        tree.addTrackingPath(path)
        tree.trackPathListeners.forEach((cb) => cb(path))
      }
    }

    this.previousProxifier = tree.proxifier

    // This value might be a proxy, we need to rescope
    // it to the current tree looking
    if (this.value && this.value[IS_PROXY]) {
      return proxyStateTree.rescope(this.value, tree)
    }

    return this.value
  }
}
