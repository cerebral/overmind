import * as mutations from './mutations'

export const changeTo = (action) => action().mutation(mutations.changeTab)
