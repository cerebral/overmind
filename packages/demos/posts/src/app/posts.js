export const state = {
  list: [],
}

export const actions = (action) => ({
  loadPost: action()
    .map(({ state, api }) => api.getPost(state.posts.list.length + 1))
    .mutation((state, post) => state.posts.list.unshift(post)),
})
