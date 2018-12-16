import { EventEmitter } from 'betsy'
import {
  ProxyStateTree,
  VALUE,
  IS_PROXY,
  ITrackCallback,
  ITrackStateTree,
  TrackStateTree,
} from 'proxy-state-tree'

import { EventType, Events } from './internalTypes'

export class Derived {
  private isDirty: boolean = true
  private trackStateTree: ITrackStateTree<any>
  private scope: any
  private value: any
  private paths: Set<string>
  private updateCount: number = 0
  constructor(private cb: (state: object, parent: object) => void) {
    return this.evaluate.bind(this)
  }
  evaluate(
    eventHub: EventEmitter<Events>,
    proxyStateTree: ProxyStateTree<any>,
    path
  ) {
    if (!this.trackStateTree) {
      this.trackStateTree = proxyStateTree.getTrackStateTree()

      const pathAsArray = path.split('.')
      pathAsArray.pop()
      const parent = pathAsArray.reduce(
        (curr, key) => curr[key],
        this.trackStateTree.state
      )

      this.scope = () => this.cb(parent, this.trackStateTree.state)
      proxyStateTree.onMutation((_, paths, flushId) => {
        if (this.isDirty) {
          return
        }

        for (let path of paths) {
          if (this.paths.has(path)) {
            eventHub.emitAsync(EventType.DERIVED_DIRTY, {
              path,
              flushId,
            })
            this.isDirty = true
            return
          }
        }
      })
    }
    if (
      this.isDirty ||
      (this.value &&
        this.value[IS_PROXY] &&
        this.value[VALUE][(proxyStateTree as any).PROXY] !== this.value)
    ) {
      this.value = this.trackStateTree.trackScope(this.scope)

      this.isDirty = false
      this.paths = new Set(this.trackStateTree.pathDependencies)
      eventHub.emitAsync(EventType.DERIVED, {
        path,
        paths: Array.from(this.paths),
        updateCount: this.updateCount,
        value: this.value,
      })
      this.updateCount++
    }

    // Tracks the paths for the consumer of this derived value
    for (let path of this.paths) {
      const currentTree = proxyStateTree.currentTree

      if (currentTree instanceof TrackStateTree) {
        currentTree.addTrackingPath(path)
      }
    }

    return this.value
  }
}
