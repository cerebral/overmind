import * as operations from './operations'
import * as mutations from './mutations'

export const loadPost = (action) =>
  action()
    .map(operations.getNextPost)
    .mutate(mutations.addPost)
