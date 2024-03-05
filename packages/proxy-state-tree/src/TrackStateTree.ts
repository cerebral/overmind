import {
  IProxifier,
  IProxyStateTree,
  ITrackCallback,
  ITrackScopedCallback,
  ITrackStateTree,
} from './types'

export class TrackStateTree<T extends object> implements ITrackStateTree<T> {
  private disposeOnReset: Function
  root: IProxyStateTree<T>
  pathDependencies: Set<string> = new Set()
  state: T
  proxifier: IProxifier<T>
  trackPathListeners: Array<(path: string) => void> = []
  constructor(root: IProxyStateTree<T>) {
    this.root = root
    this.proxifier = root.proxifier
    this.state = root.state
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

  track() {
    this.root.changeTrackStateTree(this)

    return this
  }

  canMutate() {
    return false
  }

  canTrack() {
    return true
  }

  addTrackingPath(path: string) {
    this.pathDependencies.add(path)
  }

  subscribe(cb: ITrackCallback) {
    this.root.changeTrackStateTree(null)
    for (const path of this.pathDependencies) {
      this.root.addPathDependency(path, cb)
    }
    return () => {
      for (const path of this.pathDependencies) {
        this.root.removePathDependency(path, cb)
      }
    }
  }

  trackScope(scope: ITrackScopedCallback<T>) {
    const previousPreviousTree = this.root.previousTree
    const previousCurrentTree = this.root.currentTree

    this.root.currentTree = this
    this.track()
    scope(this)
    this.root.currentTree = previousCurrentTree
    this.root.previousTree = previousPreviousTree

    return this
  }
}
