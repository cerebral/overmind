import {
  Action,
  pipe,
  mutate,
  filter,
  debounce,
  Operator,
  when,
  fork,
  parallel,
  catchError,
  map,
} from 'overmind'
import { Page, RouteContext, GuideParams, VideoParams } from './types'
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

export const test: Operator<string> = pipe(
  mutate(function setArray({ state }) {
    state.test = []
    state.test.push('foo')
  }),
  when(
    function isTrue() {
      return true
    },
    {
      true: pipe(
        map(function truePath({ state }) {
          return 'truePath'
        }),
        map(function truePath2({ state }) {
          return 'truePath2'
        }),
        fork(() => 'foo', {
          foo: pipe(
            map(function fooPath({ state }) {
              return 'fooPath'
            }),
            map(function fooPath2() {
              return 'fooPath2'
            })
          ),
        })
      ),
      false: mutate(function falsePath() {}),
    }
  ),
  filter(() => false),
  parallel(
    pipe(
      map(function pa1({ state }, val) {
        console.log('VAL', val)
        return 'pa1'
      }),
      map(function pa2({ state }) {
        return 'pa2'
      })
    ),
    map(function endStuff({ state }) {
      return 'endStuff'
    })
  ),
  catchError(function catchError() {
    console.log('NOW I RUN CATCH!')
    return 'hihi'
  })
)
