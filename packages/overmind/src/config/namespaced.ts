import { IConfiguration } from '../'
import { SubType } from '../internalTypes'

interface NamespacedConfiguration {
  [namespace: string]: {
    state?: {}
    effects?: {}
    actions?: {}
    reactions?: {}
  }
}

function parseNamespacedConfig(
  result: { actions: any; effects: any; state: any },
  name: string,
  config: IConfiguration
) {
  const { actions, effects, state }: IConfiguration = config

  if (actions) {
    result.actions[name] = actions
  }
  if (effects) {
    result.effects[name] = effects
  }
  if (state) {
    result.state[name] = state
  }
}

export function namespaced<T extends NamespacedConfiguration>(
  namespaces: T
): {
  state: SubType<{ [P in keyof T]: T[P]['state'] }, object>
  effects: SubType<{ [P in keyof T]: T[P]['effects'] }, object>
  actions: SubType<{ [P in keyof T]: T[P]['actions'] }, object>
} {
  const result: any = {
    initializers: {},
    actions: {},
    effects: {},
    state: {},
  }

  Object.keys(namespaces).forEach((name) => {
    parseNamespacedConfig(result, name, namespaces[name])
  })

  return Object.assign({
    actions: result.actions,
    effects: result.effects,
    state: result.state,
  })
}
