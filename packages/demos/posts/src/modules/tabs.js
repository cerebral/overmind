export const state = {
  current: 'posts',
}

export const actions = {
  changeTo: (action) =>
    action().mutation((state, tab) => (state.tabs.current = tab)),
}
