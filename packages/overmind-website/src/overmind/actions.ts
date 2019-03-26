import { Action, pipe, debounce, Operator } from 'overmind'
import { RouteContext, GuideParams, VideoParams } from './types'
import * as o from './operators'

export const openHome: Operator<RouteContext> = pipe(
  o.ensureViewAndTypescript(),
  o.loadHome()
)

export const openGuides: Operator<RouteContext> = pipe(
  o.ensureViewAndTypescript(),
  o.loadGuides()
)

export const openVideos: Operator<RouteContext<VideoParams>> = pipe(
  o.ensureViewAndTypescript(),
  o.loadVideos()
)

export const openVideo: Operator<RouteContext<VideoParams>> = pipe(
  o.ensureViewAndTypescript(),
  o.loadVideos(),
  o.setVideo()
)

export const openGuide: Operator<RouteContext<GuideParams>> = pipe(
  o.ensureViewAndTypescript(),
  o.setGuide()
)

export const openApi: Operator<RouteContext<VideoParams>> = pipe(
  o.ensureViewAndTypescript(),
  o.loadApi()
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
  o.setQuery(),
  o.isValidQuery(),
  debounce(200),
  o.getSearchResult()
)

export const viewHelpGotIt: Action = ({ state }) => {
  state.showViewHelp = false
}
