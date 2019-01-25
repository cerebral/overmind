import { Action, fromOperator, pipe, action, filter, debounce } from 'overmind'
import { Page, RouteContext, GuideParams, VideoParams } from './types'

export const openHome: Action<RouteContext> = async ({ state, effects }) => {
  state.page = Page.HOME
  if (!state.demos.length) {
    state.demos = await effects.request('/backend/demos')
  }
}

export const openGuides: Action<RouteContext> = async ({ state, effects }) => {
  state.page = Page.GUIDES
  if (!state.guides.length) {
    state.isLoadingGuides = true
    state.guides = await effects.request('/backend/guides')
    state.isLoadingGuides = false
  }
}

export const openVideos: Action<RouteContext> = async ({ state, effects }) => {
  state.page = Page.VIDEOS
  if (!state.videos.length) {
    state.isLoadingVideos = true
    state.videos = await effects.request('/backend/videos')
    state.isLoadingVideos = false
  }
}

export const openVideo: Action<RouteContext<VideoParams>> = async ({
  value: routeContext,
  state,
}) => {
  state.page = Page.VIDEOS
  state.currentVideo = routeContext.params.title
}

export const openGuide: Action<RouteContext<GuideParams>> = async ({
  value: routeContext,
  state,
}) => {
  state.page = Page.GUIDE
  state.currentGuide = routeContext.params
}

export const openApi: Action<RouteContext<VideoParams>> = async ({
  value: routeContext,
  state,
  effects,
}) => {
  state.page = Page.API
  state.currentApi = routeContext.params.title
  if (!state.apis.length) {
    state.isLoadingApis = true
    state.apis = await effects.request('/backend/apis')
    state.isLoadingApis = false
  }
}

export const selectTheme: Action<string> = ({
  value: selection,
  state,
  effects,
}) => {
  const selectionArray = selection.split('_')
  const theme = selectionArray[0]
  const typescript = Boolean(selectionArray[1])

  state.theme = theme
  state.typescript = typescript

  effects.css.changePrimary(theme)
  effects.storage.set('theme', theme)
  effects.storage.set('typescript', typescript)
}

export const toggleTypescript: Action = ({ state, effects }) => {
  state.typescript = !state.typescript
  effects.storage.set('typescript', state.typescript)
}

export const closeSearch: Action = ({ state }) => {
  state.showSearchResult = false
  state.query = ''
}

export const changeQuery: Action<
  React.ChangeEvent<HTMLInputElement>
> = fromOperator(
  pipe(
    action(({ value: event, state }) => {
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
)

export const viewHelpGotIt: Action = ({ state, effects }) => {
  state.showViewHelp = false
  effects.storage.set('typescript', false)
  effects.storage.set('theme', 'react')
}
