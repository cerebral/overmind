import { Configuration, IAction } from '../'

type SubType<Base, Condition> = Pick<
  Base,
  { [Key in keyof Base]: Base[Key] extends Condition ? Key : never }[keyof Base]
>

/*
  MERGE
*/

export function merge<A extends Configuration, B extends Configuration>(
  configA: A,
  configB: B
): A & B
export function merge<
  A extends Configuration,
  B extends Configuration,
  C extends Configuration
>(configA: A, configB: B, configC: C): A & B & C
export function merge<
  A extends Configuration,
  B extends Configuration,
  C extends Configuration,
  D extends Configuration
>(configA: A, configB: B, configC: C, configD: D): A & B & C & D
export function merge<
  A extends Configuration,
  B extends Configuration,
  C extends Configuration,
  D extends Configuration,
  E extends Configuration
>(configA: A, configB: B, configC: C, configD: D, configE: E): A & B & C & D & E
export function merge<
  A extends Configuration,
  B extends Configuration,
  C extends Configuration,
  D extends Configuration,
  E extends Configuration,
  F extends Configuration
>(
  configA: A,
  configB: B,
  configC: C,
  configD: D,
  configE: E,
  configF: F
): A & B & C & D & E & F
export function merge<
  A extends Configuration,
  B extends Configuration,
  C extends Configuration,
  D extends Configuration,
  E extends Configuration,
  F extends Configuration,
  G extends Configuration
>(
  configA: A,
  configB: B,
  configC: C,
  configD: D,
  configE: E,
  configF: F,
  configG: G
): A & B & C & D & E & F & G
export function merge<
  A extends Configuration,
  B extends Configuration,
  C extends Configuration,
  D extends Configuration,
  E extends Configuration,
  F extends Configuration,
  G extends Configuration,
  H extends Configuration
>(
  configA: A,
  configB: B,
  configC: C,
  configD: D,
  configE: E,
  configF: F,
  configG: G,
  configH: H
): A & B & C & D & E & F & G & H
export function merge<
  A extends Configuration,
  B extends Configuration,
  C extends Configuration,
  D extends Configuration,
  E extends Configuration,
  F extends Configuration,
  G extends Configuration,
  H extends Configuration,
  I extends Configuration
>(
  configA: A,
  configB: B,
  configC: C,
  configD: D,
  configE: E,
  configF: F,
  configG: G,
  configH: H,
  configI: I
): A & B & C & D & E & F & G & H & I
export function merge(...configurations: Configuration[]): Configuration {
  const initializers = configurations.reduce(
    (aggr, config) =>
      config.onInitialize ? aggr.concat(config.onInitialize) : aggr,
    [] as any[]
  )

  return configurations.reduce(
    (aggr, config) => {
      return {
        onInitialize: aggr.onInitialize,
        state: {
          ...aggr.state,
          ...config.state,
        },
        effects: {
          ...aggr.effects,
          ...config.effects,
        },
        actions: {
          ...aggr.actions,
          ...config.actions,
        },
      }
    },
    {
      onInitialize: initializers.length
        ? (context) => Promise.all(initializers.map((cb) => cb(context)))
        : undefined,
      state: {},
      effects: {},
      actions: {},
    }
  )
}

/*
  NAMESPACED
*/
interface NamespacedConfiguration {
  [namespace: string]: {
    onInitialize?: any
    state?: {}
    effects?: {}
    actions?: {}
    reactions?: {}
  }
}

function parseNamespacedConfig(
  result: { actions: any; effects: any; state: any; initializers: any[] },
  name: string,
  config: Configuration
) {
  const { actions, effects, onInitialize, state }: Configuration = config

  if (actions) {
    result.actions[name] = actions
  }
  if (effects) {
    result.effects[name] = effects
  }
  if (state) {
    result.state[name] = state
  }
  if (onInitialize) {
    result.initializers.push(onInitialize)
  }
}

export function namespaced<T extends NamespacedConfiguration>(
  namespaces: T
): {
  onInitialize?: any
  state: SubType<{ [P in keyof T]: T[P]['state'] }, object>
  effects: SubType<{ [P in keyof T]: T[P]['effects'] }, object>
  actions: SubType<{ [P in keyof T]: T[P]['actions'] }, object>
} {
  const result: any = {
    initializers: [],
    actions: {},
    effects: {},
    state: {},
  }

  Object.keys(namespaces).forEach((name) => {
    parseNamespacedConfig(result, name, namespaces[name])
  })

  return Object.assign(
    {
      actions: result.actions,
      effects: result.effects,
      state: result.state,
    },
    result.initializers.length
      ? {
          onInitialize: (context) =>
            Promise.all(result.initializers.map((cb) => cb(context))),
        }
      : {}
  )
}

interface LazyConfiguration {
  [namespace: string]: () => Promise<{
    onInitialize?: any
    state?: {}
    effects?: {}
    actions?: {}
    reactions?: {}
  }>
}

export function lazy<T extends LazyConfiguration, B = T>(
  configurations: T
): {
  onInitialize?: any
  state: SubType<
    {
      [P in keyof T]?: ReturnType<T[P]> extends Promise<infer U>
        ? U extends { state: any }
          ? U['state']
          : never
        : never
    },
    object
  >
  effects: SubType<
    {
      [P in keyof T]?: ReturnType<T[P]> extends Promise<infer U>
        ? U extends { effects: any }
          ? U['effects']
          : never
        : never
    },
    object
  > & {
    lazy: {
      loadConfig: (config: keyof T) => Promise<void>
    }
  }
  actions: SubType<
    {
      [P in keyof T]?: ReturnType<T[P]> extends Promise<infer U>
        ? U extends { actions: any }
          ? U['actions']
          : never
        : never
    },
    object
  > & {
    lazy: {
      loadConfig: IAction<any, keyof T>
    }
  }
} {
  let app
  return {
    onInitialize({ value }) {
      app = value
    },
    effects: {
      lazy: {
        loadConfig(config) {
          return app.actions.lazy.loadConfig(config)
        },
      },
    },
    actions: {
      lazy: {
        loadConfig({ value: key, state, ...rest }) {
          const configToLoad = configurations[key]
          configToLoad().then((loadedConfig) => {
            const newConfig = namespaced({
              [key]: loadedConfig,
            })

            if (newConfig.state && newConfig.state[key])
              state[key] = newConfig.state[key]
            if (newConfig.effects && newConfig.effects[key])
              app.effects[key] = newConfig.effects[key]
            if (newConfig.actions && newConfig.actions[key])
              app.actions[key] = app.getActions(newConfig.actions[key])
            if (newConfig.onInitialize)
              newConfig.onInitialize({
                value: app,
                state,
                ...rest,
              })
          })
        },
      },
    },
  } as any
}
