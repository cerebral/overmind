import {
  Action,
  AsyncAction,
  Operator,
  debounce,
  filter,
  mutate,
  pipe,
} from 'overmind'

import { GuideParams, Page, RouteContext, VideoParams } from './types'

const withRoute: <T, U>(
  action: Action<RouteContext<T>, U>
) => Action<RouteContext<T>, U> = (action) => (context, routeContext) => {
  const { state, effects } = context

  if (
    state.typescript !== JSON.parse(routeContext.query.typescript) ||
    state.theme !== routeContext.query.view
  ) {
    state.typescript = routeContext.query.typescript === 'true'
    state.theme = routeContext.query.view

    effects.storage.set('theme', state.theme)
    effects.storage.set('typescript', state.typescript)
    effects.css.changePrimary(state.theme)
  }

  return action(context, routeContext)
}

export const openHome: AsyncAction<RouteContext> = withRoute(
  async ({ state, effects }) => {
    state.page = Page.HOME
    if (!state.demos.length) {
      state.demos = await effects.request('/backend/demos')
    }
  }
)

export const openIntroduction: AsyncAction<RouteContext> = withRoute(
  async ({ state }) => {
    state.page = Page.INTRODUCTION
  }
)

export const openGuides: AsyncAction<RouteContext> = withRoute(
  async ({ state, effects }) => {
    state.page = Page.GUIDES
    if (!state.guides.length) {
      state.isLoadingGuides = true
      state.guides = await effects.request('/backend/guides')
      state.isLoadingGuides = false
    }
  }
)

export const openVideos: AsyncAction<RouteContext> = withRoute(
  async ({ state, effects }) => {
    state.page = Page.VIDEOS
    state.currentVideo = null
    if (!state.videos.length) {
      state.isLoadingVideos = true
      state.videos = await effects.request('/backend/videos')
      state.isLoadingVideos = false
    }
  }
)

export const openVideo: Action<RouteContext<VideoParams>> = (
  { state, actions },
  routeContext
) => {
  actions.openVideos(routeContext)
  state.currentVideo = routeContext.params.title
}

export const openGuide: Action<RouteContext<GuideParams>> = withRoute(
  ({ state }, routeContext) => {
    state.page = Page.GUIDE
    state.currentGuide = routeContext.params
  }
)

export const openApi: AsyncAction<RouteContext<VideoParams>> = withRoute(
  async ({ state }, routeContext) => {
    state.page = Page.API
    state.currentApi = routeContext.params.title
  }
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

export const changeQuery: Operator<string> = pipe(
  mutate(({ state }, query) => {
    state.query = query
    state.showSearchResult = query.length > 2
    state.isLoadingSearchResult = query.length > 2
  }),
  filter((_, query) => query.length >= 3),
  debounce(200),
  mutate(async ({ state, effects }, query) => {
    state.searchResult = await effects.request('/backend/search?query=' + query)
    state.isLoadingSearchResult = false
  })
)

export const viewHelpGotIt: Action = ({ state }) => {
  state.showViewHelp = false
}
