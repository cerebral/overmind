export type Mutation = {
  args: any[]
  method: string
  path: string
  delimiter: string
}

export type OperatorsByPath = Array<{
  path: string
  operator: Operator
  childrenByPath: OperatorsByPath[]
  value: any
}>

export type Effect = {
  args: any[]
  method: string
  name: string
  result: any
  isPending: boolean
  error: string
  effectId: number
}

export enum ActionsListItemType {
  ACTION = 'ACTION',
  GROUP = 'GROUP',
}

export type ActionItem = {
  type: ActionsListItemType.ACTION
  id: string
  actionId: number
}

export type ActionGroupItem = {
  type: ActionsListItemType.GROUP
  id: string
  actionId: number
  isCollapsed: boolean
  actionIds: string[]
}

export type ActionsListItem = ActionItem | ActionGroupItem

export type Execution = {
  actionId: number
  actionName: string
  executionId: number
  isAsync?: boolean
  operatorId: number
  path: string[]
  type: ExecutionType
  result?: any
}

export enum EventType {
  Mutation = 'MUTATION',
  Effect = 'EFFECT',
  Action = 'ACTION',
}

export type Event = {
  type: EventType
  data: Mutation | Effect | string
}

export type Operator = {
  isRunning: boolean
  events: Event[]
  type: string
  actionId: number
  name: string
  executionId: number
  isAsync?: boolean
  operatorId: number
  path: string[]
  result?: any
  error?: string
  isIntercepted?: boolean
  isSkipped?: boolean
}

export type Action = {
  actionName: string
  actionId: number
  executionId: number
  isRunning: boolean
  operators: {
    [id: string]: Operator
  }
  value: any
  hasError: boolean
  time: number
}

export type Actions = {
  [id: string]: Action
}

export type Flush = {
  flushId: number
  mutations: Mutation[]
  components: string[]
  derived: string[]
  isCollapsed: boolean
  actionName: string
}

export type FlushReference = {
  flushId: number
}

export type Flushes = {
  [id: string]: Flush
}

export type Component = {
  id: string
  name: string
  isMounted: boolean
  paths: string[]
  updateCount: number
  isCollapsed: boolean
}

export type Derived = {
  flushId: number
  path: string
  paths: string[]
  updateCount: number
  value: any
}

export type Components = {
  [id: string]: Component
}

export type DerivedMap = {
  [path: string]: Derived
}

export enum HistoryRecordType {
  Mutation = 'Mutation',
  Effect = 'Effect',
  Flush = 'Flush',
}

export type HistoryRecord =
  | MutationHistoryRecord
  | FlushHistoryRecord
  | EffectHistoryRecord

export type MutationHistoryRecord = {
  type: HistoryRecordType.Mutation
  data: Mutation
  actionName: string
}

export type FlushHistoryRecord = {
  type: HistoryRecordType.Flush
  data: Flush
  actionName: string
}

export type EffectHistoryRecord = {
  type: HistoryRecordType.Effect
  data: Effect
  actionName: string
}

export type Charts = {
  [path: string]: Chart
}

export type App = {
  name: string
  messages: AppMessage<any>[]
  delimiter: string
  state: object
  components: Components
  derived: Derived
  flushes: Flushes
  flushByActionId: {
    [id: string]: FlushReference
  }
  flushByOperatorId: {
    [id: string]: FlushReference
  }
  actions: Actions
  charts: Charts
  actionsList: ActionsListItem[]
  currentActionId: string
  currentChartId: string
  actionQuery: string
  actionQuerySuggestion: string
  selectedActionQuery: string
  isQueryingAction: boolean
  actionPaths: string[]
  actionQueryPayload: string
  expandedStatePaths: string[]
  expandedComponents: string[]
  selectedStatePath: string
  connectionState: 'connected' | 'pending' | 'disconnected'
}

export type Apps = {
  [name: string]: App
}

export enum ExecutionType {
  INIT = 'init',
  RE_INIT = 're_init',
  FLUSH = 'flush',
  DERIVED = 'derived',
  MUTATIONS = 'mutations',
  EFFECT = 'effect',
  COMPONENT_ADD = 'component:add',
  COMPONENT_UPDATE = 'component:update',
  COMPONENT_REMOVE = 'component:remove',
  DERIVED_DIRTY = 'derived:dirty',
  ACTION_START = 'action:start',
  OPERATOR_START = 'operator:start',
  OPERATOR_END = 'operator:end',
  OPERATOR_ASYNC = 'operator:async',
  ACTION_END = 'action:end',
  GETTER = 'getter',
  STATE = 'state',
  CHART = 'chart',
}

export enum AppMessageType {
  PORT_EXISTS = 'PORT_EXISTS',
}

export type AppMessage<T> = {
  type: AppMessageType | ExecutionType
  appName: string
  data: T
}

export type StateMessage = AppMessage<{
  path: string[]
  value: any
}>

export type InitMessage = AppMessage<{
  appName: string
  state: object
  delimiter: string
  actions: string[]
}>

export type GetterMessage = AppMessage<{
  path: string
  value: any
}>

export type FlushMessage = AppMessage<
  Execution & {
    flushId: number
    mutations: Mutation[]
  }
>

export type AddComponentMessage = AppMessage<{
  name: string
  paths: string[]
  componentId: number
  componentInstanceId: number
}>

export type UpdateComponentMessage = AppMessage<{
  name: string
  paths: string[]
  flushId: number
  componentId: number
  componentInstanceId: number
}>

export type RemoveComponentMessage = AddComponentMessage

export type DerivedMessage = AppMessage<{
  path: string[]
  paths: string[]
  updateCount: number
  value: any
}>

export type DirtyDerivedMessage = AppMessage<{
  path: string
  flushId: number
  paths: string[]
  updateCount: number
  value: any
  derivedPath: string
}>

export type StartActionMessage = AppMessage<{
  actionId: number
  actionName: string
  executionId: number
  value: any
  parentExecution?: any
}>

export type ChartMessage = AppMessage<Chart>

export type StartOperatorMessage = AppMessage<{
  actionId: number
  actionName: string
  name: string
  executionId: number
  operatorId: number
  path: string[]
  type: string
  parentExecution: any
}>

export type EndOperatorMessage = AppMessage<{
  actionId: number
  actionName: string
  name: string
  executionId: number
  operatorId: number
  path: string[]
  type: string
  isAsync: boolean
  result: any
  error?: string
  isIntercepted?: boolean
  isSkipped?: boolean
}>

export type AsyncOperatorMessage = AppMessage<{
  actionId: number
  actionName: string
  name: string
  executionId: number
  operatorId: number
  path: string[]
  type: string
  isAsync: boolean
  result: any
}>

export type EndActionMessage = StartActionMessage

export type MutationsMessage = AppMessage<{
  actionId: number
  actionName: string
  executionId: number
  mutations: Mutation[]
  operatorId: number
  path: string[]
}>

export type EffectMessage = AppMessage<{
  actionId: number
  actionName: string
  executionId: number
  operatorId: number
  path: string[]
  args: any[]
  method: string
  name: string
  result: any
  isPending: boolean
  error: string
  effectId: number
}>

export type Message = {
  appName: string
  message: AppMessage<any>
}

export enum Tab {
  Actions = 'Actions',
  State = 'State',
  Console = 'Console',
  Components = 'Components',
  Flushes = 'Flushes',
  Remove = 'Remove',
  History = 'History',
  Charts = 'Charts',
}

export type GroupedComponent = {
  name: string
  components: Component[]
  isCollapsed: boolean
}

export type GroupedComponents = {
  [name: string]: GroupedComponent
}

export type NestedChart = {
  initial: string
  states: {
    [key: string]: {
      entry?: string
      exit?: string
      charts?: {
        [id: string]: NestedChart
      }
      on?: {
        [key: string]:
          | string
          | {
              target: string
            }
      }
    }
  }
}

export type Chart = {
  path: string[]
  states: Array<string[]>
  charts: {
    [id: string]: NestedChart
  }
  actions: {
    [name: string]: boolean
  }
}
