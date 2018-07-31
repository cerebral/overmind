export const state = {
  current: 'posts',
}

export const actions = (action) => ({
  changeTo: action().mutation((state, tab) => (state.tabs.current = tab)),
})
