export interface IProxifier<T extends object> {
  proxify(state: T, path: string): T
  trackPath(path: string): void
}

export interface IMutation {
  method: string
  delimiter: string
  path: string
  args: any[]
  hasChangedValue: boolean
}

export interface IMutationCallback {
  (mutation: IMutation, paths: Set<string>, flushId: number): void
}

export interface IMutationTree<T extends object, D> {
  addMutation(mutation: IMutation, objectChangePath?: string): void
  onMutation(callback: IMutationCallback): void
  canTrack(): boolean
  canMutate(): boolean
  getMutations(): IMutation[]
  getObjectChanges(): Set<string>
  trackPaths(): () => Set<string>
  flush(async?: boolean): {
    mutations: IMutation[]
    flushId: number
  }
  dispose(): IMutationTree<T, D>
  objectChanges: Set<string>
  root: IProxyStateTree<T, D>
  proxifier: IProxifier<T>
  mutations: IMutation[]
  state: T
  trackPathListeners: Array<(path: string) => void>
}

export interface ITrackCallback {
  (
    mutations: IMutation[],
    paths: Array<string>,
    flushId: number,
    isAsync: boolean
  ): void
}

export interface ITrackScopedCallback<T extends object, D> {
  (tree: ITrackStateTree<T, D>): any
}

export interface ITrackStateTree<T extends object, D> {
  addTrackingPath(path: string): void
  subscribe(cb: ITrackCallback): () => void
  track(): ITrackStateTree<T, D>
  trackScope(scope: ITrackScopedCallback<T, D>): any
  canTrack(): boolean
  canMutate(): boolean
  trackPaths(): () => Set<string>
  root: IProxyStateTree<T, D>
  proxifier: IProxifier<T>
  state: T
  pathDependencies: Set<string>
  trackPathListeners: Array<(path: string) => void>
}

export interface IOptions<D> {
  delimiter?: string
  devmode?: boolean
  ssr?: boolean
  onSetFunction?: (...args: any[]) => any
  onGetFunction?: (...args: any[]) => any
  onGetter?: Function
  getDevtools?: () => D
}

export interface IFlushCallback {
  (
    mutations: IMutation[],
    paths: string[],
    flushId: number,
    isAsync: boolean
  ): void
}

export type TTree = IMutationTree<any, any> | ITrackStateTree<any, any>

export interface IRemoveProxyCallback {
  (path: string): void
}

export interface IProxyStateTree<T extends object, D> {
  addPathDependency(path: string, callback: ITrackCallback): void
  removePathDependency(path: string, callback: ITrackCallback): void
  getTrackStateTree(): ITrackStateTree<T, D>
  getMutationTree(): IMutationTree<T, D>
  setTrackStateTree(tree: ITrackStateTree<T, D> | null): void
  unsetTrackStateTree(tree: ITrackStateTree<T, D> | null): void
  clearTrackStateTree(): void
  disposeTree(proxy: TTree): void
  onMutation(cb: IMutationCallback): void
  flush(
    tree: IMutationTree<T, D>,
    isAsync: boolean
  ): {
    mutations: IMutation[]
    flushId: number
  }
  flush(
    trees: IMutationTree<T, D>[],
    isAsync: boolean
  ): {
    mutations: IMutation[]
    flushId: number
  }
  onFlush(cb: IFlushCallback): void
  rescope(value: any, tree: TTree): any
  sourceState: T
  state: T
  options: IOptions<D>
  pathDependencies: {
    [path: string]: Set<ITrackCallback>
  }
  root: IProxyStateTree<T, D>
  proxifier: IProxifier<T>
  currentTree: TTree
  previousTree: TTree
  mutationTree: IMutationTree<T, D>
  mutationCallbacks: IMutationCallback[]
  flushCallbacks: IFlushCallback[]
  currentFlushId: number
}
