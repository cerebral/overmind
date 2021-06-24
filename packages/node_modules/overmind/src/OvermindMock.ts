import * as proxyStateTree from 'proxy-state-tree'
import { IConfiguration } from './types'
import * as internalTypes from './internalTypes'
import { Overmind } from './Overmind'
import * as utils from './utils'

export interface OvermindMock<Config extends IConfiguration>
  extends Overmind<Config> {
  onInitialize: () => Promise<proxyStateTree.IMutation[]>
  mutations: proxyStateTree.IMutation[]
}

export function createOvermindMock<Config extends IConfiguration>(
  config: Config
): OvermindMock<Config>
export function createOvermindMock<Config extends IConfiguration>(
  config: Config,
  setInitialState: (state: Config['state']) => void
): OvermindMock<Config>
export function createOvermindMock<Config extends IConfiguration>(
  config: Config,
  mockedEffects: internalTypes.NestedPartial<Config['effects']>
): OvermindMock<Config>
export function createOvermindMock<Config extends IConfiguration>(
  config: Config,
  mockedEffects: internalTypes.NestedPartial<Config['effects']>,
  setInitialState: (state: Config['state']) => void
): OvermindMock<Config>
export function createOvermindMock<Config extends IConfiguration>(
  ...args:
    | [Config]
    | [Config, (state: Config['state']) => void]
    | [Config, internalTypes.NestedPartial<Config['effects']>]
    | [
        Config,
        internalTypes.NestedPartial<Config['effects']>,
        (state: Config['state']) => void
      ]
): OvermindMock<Config> {
  const setState = typeof args[1] === 'function' ? args[1] : args[2]
  const mockedEffects = typeof args[1] === 'function' ? undefined : args[1]

  const state = utils.deepCopy(args[0].state)

  if (setState) {
    ;(setState as any)(state)
  }
  const mock = new Overmind(
    Object.assign({}, args[0], {
      state,
    }),
    {
      devtools: false,
    },
    {
      mode: utils.MODE_TEST,
      options: {
        effectsCallback: (effect) => {
          const mockedEffect = (effect.name
            ? effect.name.split('.')
            : []
          ).reduce((aggr, key) => (aggr ? aggr[key] : aggr), mockedEffects)

          if (!mockedEffect || (mockedEffect && !mockedEffect[effect.method])) {
            throw new Error(
              `The effect "${effect.name}" with method ${
                effect.method
              } has not been mocked`
            )
          }
          return mockedEffect[effect.method](...effect.args)
        },
      },
    } as internalTypes.TestMode
  ) as OvermindMock<Config>

  const action = (mock as any).createAction(
    'onInitialize',
    utils.createOnInitialize()
  )

  mock.onInitialize = () => action(mock)
  mock.mutations = []

  return mock as any
}
