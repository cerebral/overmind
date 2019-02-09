import { Action, pipe, action, filter, debounce, Operator } from 'overmind'
import { Page, RouteContext, GuideParams, VideoParams } from './types'
import { ensureViewAndTypescript } from './operators'

export const openHome: Operator<RouteContext> = pipe(
  ensureViewAndTypescript(),
  action(async ({ state, effects }) => {
    state.page = Page.HOME
    if (!state.demos.length) {
      state.demos = await effects.request('/backend/demos')
    }
  })
)

export const openGuides: Operator<RouteContext> = pipe(
  ensureViewAndTypescript(),
  action(async ({ state, effects }) => {
    state.page = Page.GUIDES
    if (!state.guides.length) {
      state.isLoadingGuides = true
      state.guides = await effects.request('/backend/guides')
      state.isLoadingGuides = false
    }
  })
)

export const openVideos: Operator<RouteContext<VideoParams>> = pipe(
  ensureViewAndTypescript(),
  action(async ({ state, effects }) => {
    state.page = Page.VIDEOS
    state.currentVideo = null
    if (!state.videos.length) {
      state.isLoadingVideos = true
      state.videos = await effects.request('/backend/videos')
      state.isLoadingVideos = false
    }
  })
)

export const openVideo: Operator<RouteContext<VideoParams>> = pipe(
  ensureViewAndTypescript(),
  openVideos,
  action(({ state }, routeContext) => {
    state.currentVideo = routeContext.params.title
  })
)

export const openGuide: Operator<RouteContext<GuideParams>> = pipe(
  ensureViewAndTypescript(),
  action(async ({ state }, routeContext) => {
    state.page = Page.GUIDE
    state.currentGuide = routeContext.params
  })
)

export const openApi: Operator<RouteContext<VideoParams>> = pipe(
  ensureViewAndTypescript(),
  action(async ({ state, effects }, routeContext) => {
    state.page = Page.API
    state.currentApi = routeContext.params.title
    if (!state.apis.length) {
      state.isLoadingApis = true
      state.apis = await effects.request('/backend/apis')
      state.isLoadingApis = false
    }
  })
)

export const selectTheme: Action<string> = ({ effects }, selection) => {
  const selectionArray = selection.split('_')
  const view = selectionArray[0]
  const typescript = String(Boolean(selectionArray[1]))

  effects.router.redirectWithQuery(effects.router.getPath(), {
    view,
    typescript,
  })
}

export const closeSearch: Action = ({ state }) => {
  state.showSearchResult = false
  state.query = ''
}

export const changeQuery: Operator<React.ChangeEvent<HTMLInputElement>> = pipe(
  action(({ state }, event) => {
    const query = event.currentTarget.value

    state.query = query
    state.showSearchResult = query.length > 2
    state.isLoadingSearchResult = query.length > 2
  }),
  filter(({ state }) => state.query.length >= 3),
  debounce(200),
  action(async ({ state, effects }) => {
    state.searchResult = await effects.request(
      '/backend/search?query=' + state.query
    )
    state.isLoadingSearchResult = false
  })
)

export const viewHelpGotIt: Action = ({ state }) => {
  state.showViewHelp = false
}
