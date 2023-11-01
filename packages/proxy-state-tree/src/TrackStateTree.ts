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

  // Does not seem to be used
  /*
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
  */

  track() {
    this.root.changeTrackStateTree(this)
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
    console.log('Adddig', this.pathDependencies)
    for (const path of this.pathDependencies) {
      this.root.addPathDependency(path, cb)
    }
    return () => {
      console.log('Removing', this.pathDependencies)
      for (const path of this.pathDependencies) {
        this.root.removePathDependency(path, cb)
      }
    }
  }

  /*
  trackScope(scope: ITrackScopedCallback<T>, cb?: ITrackCallback) {
    const previousPreviousTree = this.master.previousTree
    const previousCurrentTree = this.master.currentTree
    this.master.currentTree = this
    this.track(cb)
    const result = scope(this)
    this.master.currentTree = previousCurrentTree
    this.master.previousTree = previousPreviousTree
    return result
  }
*/
}
