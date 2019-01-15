import { Action, Operator, debounce, pipe } from 'overmind'
import { Page, RouteContext, GuideParams, VideoParams } from './types'
import * as o from './operators'

export const openHome: Action<RouteContext> = async ({ state, request }) => {
  state.page = Page.HOME
  if (!state.demos.length) {
    state.demos = await request('/backend/demos')
  }
}

export const openGuides: Action<RouteContext> = async ({ state, request }) => {
  state.page = Page.GUIDES
  if (!state.guides.length) {
    state.isLoadingGuides = true
    state.guides = await request('/backend/guides')
    state.isLoadingGuides = false
  }
}

export const openVideos: Action<RouteContext> = async ({ state, request }) => {
  state.page = Page.VIDEOS
  if (!state.videos.length) {
    state.isLoadingVideos = true
    state.videos = await request('/backend/videos')
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
  request,
}) => {
  state.page = Page.API
  state.currentApi = routeContext.params.title
  if (!state.apis.length) {
    state.isLoadingApis = true
    state.apis = await request('/backend/apis')
    state.isLoadingApis = false
  }
}

export const selectTheme: Action<string> = ({
  value: selection,
  state,
  css,
  storage,
}) => {
  const selectionArray = selection.split('_')
  const theme = selectionArray[0]
  const typescript = Boolean(selectionArray[1])

  state.theme = theme
  state.typescript = typescript

  css.changePrimary(theme)
  storage.set('theme', theme)
  storage.set('typescript', typescript)
}

export const toggleTypescript: Action = ({ state, storage }) => {
  state.typescript = !state.typescript
  storage.set('typescript', state.typescript)
}

export const closeSearch: Action = ({ state }) => {
  state.showSearchResult = false
  state.query = ''
}

export const changeQuery: Operator<
  React.ChangeEvent<HTMLInputElement>,
  any
> = pipe(
  o.getTargetValue,
  o.setQuery,
  o.isValidQuery,
  debounce(200),
  o.query
)

export const viewHelpGotIt: Action = ({ state, storage }) => {
  state.showViewHelp = false
  storage.set('typescript', false)
  storage.set('theme', 'react')
}
