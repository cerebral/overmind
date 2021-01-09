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

export interface IMutationTree<T extends object> {
  addMutation(mutation: IMutation, objectChangePath?: string): void
  onMutation(callback: IMutationCallback): void
  canTrack(): boolean
  canMutate(): boolean
  getMutations(): IMutation[]
  getObjectChanges(): Set<string>
  trackPaths(): () => Set<string>
  flush(
    async?: boolean
  ): {
    mutations: IMutation[]
    flushId: number
  }
  dispose(): IMutationTree<T>
  objectChanges: Set<string>
  master: IProxyStateTree<T>
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

export interface ITrackScopedCallback<T extends object> {
  (tree: ITrackStateTree<T>): any
}

export interface ITrackStateTree<T extends object> {
  addTrackingPath(path: string): void
  track(cb?: ITrackCallback): ITrackStateTree<T>
  stopTracking(): void
  trackScope(scope: ITrackScopedCallback<T>, callback?: ITrackCallback): any
  trackPaths(): () => Set<string>
  canTrack(): boolean
  canMutate(): boolean
  dispose(): ITrackStateTree<T>
  clearTracking(): void
  master: IProxyStateTree<T>
  shouldTrack: boolean
  proxifier: IProxifier<T>
  state: T
  pathDependencies: Set<string>
  callback: ITrackCallback
  trackPathListeners: Array<(path: string) => void>
}

export interface IOptions {
  delimiter?: string
  devmode?: boolean
  ssr?: boolean
  onSetFunction?: (...args: any[]) => any
  onGetFunction?: (...args: any[]) => any
  onGetter?: Function
}

export interface IFlushCallback {
  (
    mutations: IMutation[],
    paths: string[],
    flushId: number,
    isAsync: boolean
  ): void
}

export type TTree = IMutationTree<any> | ITrackStateTree<any>

export interface IRemoveProxyCallback {
  (path: string): void
}

export interface IProxyStateTree<T extends object> {
  addPathDependency(path: string, callback: ITrackCallback): void
  removePathDependency(path: string, callback: ITrackCallback): void
  getTrackStateTree(): ITrackStateTree<T>
  getMutationTree(): IMutationTree<T>
  changeTrackStateTree(tree: ITrackStateTree<T>): void
  disposeTree(proxy: TTree): void
  onMutation(cb: IMutationCallback): void
  flush(
    tree: IMutationTree<T>,
    isAsync: boolean
  ): {
    mutations: IMutation[]
    flushId: number
  }
  flush(
    trees: IMutationTree<T>[],
    isAsync: boolean
  ): {
    mutations: IMutation[]
    flushId: number
  }
  onFlush(cb: IFlushCallback): void
  rescope(value: any, tree: TTree): any
  sourceState: T
  state: T
  options: IOptions
  pathDependencies: {
    [path: string]: Set<ITrackCallback>
  }
  master: IProxyStateTree<T>
  proxifier: IProxifier<T>
  currentTree: TTree
  previousTree: TTree
  mutationTree: IMutationTree<T>
  mutationCallbacks: IMutationCallback[]
  flushCallbacks: IFlushCallback[]
  currentFlushId: number
}
