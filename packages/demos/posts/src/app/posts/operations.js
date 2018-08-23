export const getNextPost = ({ state, api }) =>
  api.getPost(state.posts.list.length + 1)
