import { MutationTree } from './MutationTree'
import { IS_PROXY, PATH, PROXY_TREE, Proxifier, VALUE } from './Proxyfier'
import { TrackStateTree } from './TrackStateTree'
import {
  IFlushCallback,
  IMutation,
  IMutationCallback,
  IMutationTree,
  IOptions,
  IProxifier,
  IProxyStateTree,
  ITrackCallback,
  ITrackStateTree,
  TTree,
} from './types'

export {
  IS_PROXY,
  PROXY_TREE,
  VALUE,
  PATH,
  IMutation,
  ITrackCallback,
  ITrackStateTree,
  IMutationTree,
  TrackStateTree,
  MutationTree,
}

export * from './types'

export class ProxyStateTree<T extends object> implements IProxyStateTree<T> {
  private cache = {
    mutationTree: [] as IMutationTree<T>[],
    trackStateTree: [] as ITrackStateTree<T>[],
  }

  flushCallbacks: IFlushCallback[] = []
  mutationCallbacks: IMutationCallback[] = []
  currentFlushId: number = 0
  currentTree: TTree
  previousTree: TTree
  mutationTree: IMutationTree<T>
  proxifier: IProxifier<T>
  master: ProxyStateTree<T>
  pathDependencies: {
    [path: string]: Set<ITrackCallback>
  } = {}

  state: T
  sourceState: T
  options: IOptions
  constructor(state: T, options: IOptions = {}) {
    if (typeof options.devmode === 'undefined') {
      options.devmode = true
    }

    if (!options.delimiter) {
      options.delimiter = '.'
    }

    this.master = this
    this.sourceState = state
    this.options = options

    this.createTrackStateProxifier()
  }

  /*
    We create a base proxifier for tracking state. That means there is one
    proxifier for all track state trees. This works because the actual tracking
    refers to the current tree on "master"
  */
  private createTrackStateProxifier() {
    const trackStateTree = new TrackStateTree(this)

    this.proxifier = trackStateTree.proxifier = new Proxifier(trackStateTree)

    this.state = trackStateTree.state = this.proxifier.proxify(
      this.sourceState,
      ''
    )
  }

  getMutationTree(): IMutationTree<T> {
    if (!this.options.devmode) {
      return (this.mutationTree =
        this.mutationTree || new MutationTree(this, this.proxifier))
    }

    const tree = this.cache.mutationTree.pop() || new MutationTree(this)

    return tree
  }

  getTrackStateTree(): ITrackStateTree<T> {
    return this.cache.trackStateTree.pop() || new TrackStateTree(this)
  }

  getTrackStateTreeWithProxifier(): ITrackStateTree<T> {
    const tree = this.getTrackStateTree()

    if (this.options.ssr) {
      tree.state = this.sourceState
    } else {
      tree.proxifier = new Proxifier(tree)
      tree.state = tree.proxifier.proxify(this.sourceState, '')
    }

    return tree
  }

  changeTrackStateTree(tree: ITrackStateTree<T>) {
    this.previousTree = this.currentTree
    this.currentTree = tree
  }

  disposeTree(tree: IMutationTree<T> | ITrackStateTree<T>) {
    if (tree instanceof MutationTree) {
      this.cache.mutationTree.push((tree as IMutationTree<T>).dispose())
    } else if (tree instanceof TrackStateTree) {
      this.cache.trackStateTree.push((tree as ITrackStateTree<T>).dispose())
    }
  }

  onMutation(callback: IMutationCallback) {
    this.mutationCallbacks.push(callback)

    return () => {
      this.mutationCallbacks.splice(this.mutationCallbacks.indexOf(callback), 1)
    }
  }

  forceFlush() {
    const emptyMutations = []
    const emptyPaths = []
    for (const key in this.pathDependencies) {
      const callbacks = this.pathDependencies[key]
      callbacks.forEach((callback) => {
        callback(emptyMutations, emptyPaths, this.currentFlushId++, false)
      })
    }
  }

  flush(trees, isAsync: boolean = false) {
    let changes
    if (Array.isArray(trees)) {
      changes = trees.reduce(
        (aggr, tree) => ({
          mutations: aggr.mutations.concat(tree.getMutations()),
          objectChanges: new Set([
            ...aggr.objectChanges,
            ...tree.getObjectChanges(),
          ]),
        }),
        {
          mutations: [],
          objectChanges: new Set(),
        }
      )
    } else {
      changes = {
        mutations: (trees as IMutationTree<any>).getMutations(),
        objectChanges: (trees as IMutationTree<any>).getObjectChanges(),
      }
    }

    if (!changes.mutations.length && !changes.objectChanges.size) {
      return {
        mutations: [],
        flushId: null,
      }
    }

    const paths: Set<string> = new Set()
    const pathCallbacksToCall: Set<ITrackCallback> = new Set()

    const flushId = this.currentFlushId++

    for (const objectChange of changes.objectChanges) {
      if (this.pathDependencies[objectChange]) {
        paths.add(objectChange)
      }
    }

    for (const mutation of changes.mutations) {
      if (mutation.hasChangedValue) {
        paths.add(mutation.path)
      }
    }

    // Sort so that parent paths are called first
    const sortedPaths = Array.from(paths).sort()

    for (const path of sortedPaths) {
      if (this.pathDependencies[path]) {
        for (const callback of this.pathDependencies[path]) {
          pathCallbacksToCall.add(callback)
        }
      }
    }

    for (const callback of pathCallbacksToCall) {
      callback(changes.mutations, sortedPaths, flushId, isAsync)
    }

    // We have to ensure that we iterate all callbacks. One flush might
    // lead to a change of the array (disposing), which means something
    // might be skipped. But we still want to allow removal of callbacks,
    // we just do not want to skip any, which is why we still check if it
    // exists in the original array
    const flushCallbacks = this.flushCallbacks.slice()
    for (const callback of flushCallbacks) {
      if (this.flushCallbacks.includes(callback)) {
        callback(changes.mutations, sortedPaths, flushId, isAsync)
      }
    }

    paths.clear()
    pathCallbacksToCall.clear()

    return {
      mutations: changes.mutations,
      flushId,
    }
  }

  onFlush(callback: IFlushCallback) {
    this.flushCallbacks.push(callback)

    return () =>
      this.flushCallbacks.splice(this.flushCallbacks.indexOf(callback), 1)
  }

  rescope(value: any, tree: TTree) {
    return value && value[IS_PROXY]
      ? tree.proxifier.proxify(value[VALUE], value[PATH])
      : value
  }

  addPathDependency(path: string, callback: ITrackCallback) {
    if (!this.pathDependencies[path]) {
      this.pathDependencies[path] = new Set()
    }

    this.pathDependencies[path].add(callback)
  }

  removePathDependency(path: string, callback: ITrackCallback) {
    this.pathDependencies[path].delete(callback)

    if (!this.pathDependencies[path].size) {
      delete this.pathDependencies[path]
    }
  }

  toJSON() {
    return this.sourceState
  }
}
