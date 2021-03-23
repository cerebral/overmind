import { IConfiguration } from './types'
import { Overmind } from './Overmind'
import * as proxyStateTree from 'proxy-state-tree'
import * as utils from './utils'
import * as internalTypes from './internalTypes'

export interface OvermindSSR<Config extends IConfiguration>
  extends Overmind<Config> {
  hydrate(): proxyStateTree.IMutation[]
}

export function createOvermindSSR<Config extends IConfiguration>(
  config: Config
): OvermindSSR<Config> {
  const ssr = new Overmind(
    config,
    {
      devtools: false,
    },
    {
      mode: utils.MODE_SSR,
    } as internalTypes.SSRMode
  ) as any

  const mutationTree = ssr.proxyStateTreeInstance.getMutationTree()

  ssr.state = mutationTree.state
  ssr.hydrate = () => {
    return mutationTree.flush().mutations
  }
  return ssr
}
