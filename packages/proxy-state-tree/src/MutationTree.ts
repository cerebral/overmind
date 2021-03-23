import { Proxifier } from './Proxyfier'
import {
  IMutation,
  IMutationCallback,
  IMutationTree,
  IProxifier,
  IProxyStateTree,
} from './types'

export class MutationTree<T extends object> implements IMutationTree<T> {
  private mutationCallbacks: IMutationCallback[] = []
  master: IProxyStateTree<T>
  state: T
  proxifier: IProxifier<T>
  mutations: IMutation[] = []
  objectChanges = new Set<string>()
  isTracking: boolean = false
  isBlocking: boolean = false
  trackPathListeners: Array<(path: string) => void> = []
  constructor(master: IProxyStateTree<T>, proxifier?: IProxifier<T>) {
    this.isTracking = true
    this.master = master
    this.proxifier = proxifier || new Proxifier(this)
    this.state = this.proxifier.proxify(master.sourceState, '')
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

  getMutations() {
    const mutations = this.mutations.slice()

    this.mutations.length = 0

    return mutations
  }

  getObjectChanges() {
    const objectChanges = new Set([...this.objectChanges])

    this.objectChanges.clear()

    return objectChanges
  }

  addMutation(mutation: IMutation, objectChangePath?: string) {
    const currentFlushId = this.master.currentFlushId

    this.mutations.push(mutation)

    if (objectChangePath) {
      this.objectChanges.add(objectChangePath)
    }

    for (const cb of this.master.mutationCallbacks) {
      cb(
        mutation,
        new Set(
          objectChangePath ? [mutation.path, objectChangePath] : [mutation.path]
        ),
        currentFlushId
      )
    }

    for (const callback of this.mutationCallbacks) {
      callback(
        mutation,
        new Set(
          objectChangePath ? [mutation.path, objectChangePath] : [mutation.path]
        ),
        currentFlushId
      )
    }
  }

  flush(isAsync: boolean = false) {
    return this.master.flush(this, isAsync)
  }

  onMutation(callback: IMutationCallback) {
    this.mutationCallbacks.push(callback)
  }

  canMutate() {
    return this.isTracking && !this.isBlocking
  }

  canTrack() {
    return false
  }

  blockMutations() {
    this.isBlocking = true
  }

  enableMutations() {
    this.isBlocking = false
  }

  dispose() {
    this.isTracking = false
    this.mutationCallbacks.length = 0
    this.proxifier = this.master.proxifier

    return this
  }
}
