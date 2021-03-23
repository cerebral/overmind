import { SubType } from '../internalTypes'
import { IAction } from '..'

interface LazyConfiguration {
  [namespace: string]: () => Promise<{
    state?: {}
    effects?: {}
    actions?: {}
    reactions?: {}
  }>
}

export function lazy<T extends LazyConfiguration>(
  configurations: T
): {
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
  >
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
      loadConfig: IAction<keyof T, any>
    }
  }
} {
  return {
    actions: {
      lazy: {
        loadConfig({ state, execution, addNamespace }, key) {
          const configToLoad = configurations[key]
          const namespacePath = execution.namespacePath
            .slice(0, execution.namespacePath.length - 1)
            .concat(key)
          return configToLoad().then((loadedConfig) => {
            addNamespace(loadedConfig, namespacePath, state)
          })
        },
      },
    },
  } as any
}
