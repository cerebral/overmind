import {
  Action,
  pipe,
  action,
  filter,
  debounce,
  Operator,
  tryCatch,
  when,
  fork,
  parallel,
} from 'overmind'
import { Page, RouteContext, GuideParams, VideoParams } from './types'
import { ensureViewAndTypescript } from './operators'

export const openHome: Operator<RouteContext> = pipe(
  ensureViewAndTypescript(),
  action(async function loadHome({ state, effects }) {
    state.page = Page.HOME
    if (!state.demos.length) {
      state.demos = await effects.request('/backend/demos')
    }
  })
)

export const openGuides: Operator<RouteContext> = pipe(
  ensureViewAndTypescript(),
  action(async function loadGuides({ state, effects }) {
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
  action(async function loadVideos({ state, effects }) {
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
  action(function setVideo({ state }, routeContext) {
    state.currentVideo = routeContext.params.title
  })
)

export const openGuide: Operator<RouteContext<GuideParams>> = pipe(
  ensureViewAndTypescript(),
  action(async function setGuide({ state }, routeContext) {
    state.page = Page.GUIDE
    state.currentGuide = routeContext.params
  })
)

export const openApi: Operator<RouteContext<VideoParams>> = pipe(
  ensureViewAndTypescript(),
  action(async function loadApi({ state, effects }, routeContext) {
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

export const changeQuery: Operator<string> = pipe(
  action(({ state }, query) => {
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

export const test: Operator = pipe(
  when(
    function isTrue() {
      return true
    },
    {
      true: pipe(
        action(function truePath({ state }) {
          state.test = 'truePath'
        }),
        action(function truePath2({ state }) {
          state.test = 'truePath2'
        }),
        fork(() => 'foo', {
          foo: action(function fooPath({ state }) {
            state.test = 'fooPath'
          }),
        })
      ),
      false: action(function falsePath() {}),
    }
  ),
  parallel(
    pipe(
      action(function pa1({ state }) {
        state.test = 'endStuff'
        state.test = 'endStuff'
        state.test = 'endStuff'
        state.test = 'endStuff'
      }),
      action(function pa2({ state }) {
        state.test = 'endStuff'
        state.test = 'endStuff'
        state.test = 'endStuff'
        state.test = 'endStuff'
      })
    ),
    action(function endStuff({ state }) {
      state.test = 'endStuff'
      state.test = 'endStuff'
      state.test = 'endStuff'
      state.test = 'endStuff'
    }),
    action(function endStuff({ state }) {
      state.test = 'endStuff'
      state.test = 'endStuff'
      state.test = 'endStuff'
      state.test = 'endStuff'
    }),
    action(function endStuff({ state }) {
      state.test = 'endStuff'
      state.test = 'endStuff'
      state.test = 'endStuff'
      state.test = 'endStuff'
    })
  )
)
