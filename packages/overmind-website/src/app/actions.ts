import { Action, Operator, debounce, pipe, map } from 'overmind'
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
    state.guides = await request('/backend/guides')
  }
}

export const openVideos: Action<RouteContext> = async ({ state, request }) => {
  state.page = Page.VIDEOS
  if (!state.videos.length) {
    state.videos = await request('/backend/videos')
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
    state.apis = await request('/backend/apis')
  }
}

export const selectTheme: Action<string> = ({
  value: theme,
  state,
  css,
  storage,
}) => {
  state.theme = theme
  css.changePrimary(theme)
  storage.set('theme', theme)
}

export const toggleTypescript: Action = ({ state }) => {
  state.typescript = !state.typescript
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
