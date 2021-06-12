import {
  IProxifier,
  IProxyStateTree,
  ITrackCallback,
  ITrackScopedCallback,
  ITrackStateTree,
} from './types'

export class TrackStateTree<T extends object> implements ITrackStateTree<T> {
  private disposeOnReset: Function
  master: IProxyStateTree<T>
  pathDependencies: Set<string> = new Set()
  callback: ITrackCallback
  shouldTrack: boolean = false
  state: T
  proxifier: IProxifier<T>
  trackPathListeners: Array<(path: string) => void> = []
  constructor(master: IProxyStateTree<T>) {
    this.master = master
    this.proxifier = master.proxifier
    this.state = master.state
  }

  trackPaths() {
    const paths = new Set<string>()
    const listener = (path) => {
      paths.add(path)
    }
    this.trackPathListeners.push(listener)

    return () => {
      this.trackPathListeners.splice(
        this.trackPathListeners.indexOf(listener),
        1
      )

      return paths
    }
  }

  canMutate() {
    return false
  }

  canTrack() {
    return true
  }

  addTrackingPath(path: string) {
    if (!this.shouldTrack) {
      return
    }

    this.pathDependencies.add(path)

    if (this.callback) {
      this.master.addPathDependency(path, this.callback)
    }
  }

  track(cb?: ITrackCallback) {
    this.master.changeTrackStateTree(this)
    this.shouldTrack = true

    this.clearTracking()

    if (cb) {
      this.callback = (...args) => {
        if (!this.callback) {
          return
        }
        // eslint-disable-next-line
        cb(...args)
      }
    }

    return this
  }

  clearTracking() {
    if (this.callback) {
      for (const path of this.pathDependencies) {
        this.master.removePathDependency(path, this.callback)
      }
    }

    this.pathDependencies.clear()
  }

  stopTracking() {
    this.shouldTrack = false
  }

  trackScope(scope: ITrackScopedCallback<T>, cb?: ITrackCallback) {
    const previousPreviousTree = this.master.previousTree
    const previousCurrentTree = this.master.currentTree
    this.master.currentTree = this
    this.track(cb)
    const result = scope(this)
    this.master.currentTree = previousCurrentTree
    this.master.previousTree = previousPreviousTree
    this.stopTracking()
    return result
  }

  dispose() {
    if (!this.callback) {
      this.pathDependencies.clear()

      return this
    }

    this.clearTracking()
    this.callback = null
    this.proxifier = this.master.proxifier

    if (this.master.currentTree === this) {
      this.master.currentTree = null
    }

    return this
  }
}
