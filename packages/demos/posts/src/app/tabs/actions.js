import * as mutations from './mutations'

export const changeTo = (action) => action().mutate(mutations.changeTab)
