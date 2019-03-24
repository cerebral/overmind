import { Operator, mutate, filter } from 'overmind'
import { RouteContext, Page, GuideParams } from './types'

export const ensureViewAndTypescript: <
  T extends RouteContext<any>
>() => Operator<T> = () =>
  mutate(function ensureViewAndTypescript({ state, effects }, routeContext) {
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
  })

export const loadHome: <T>() => Operator<T> = () =>
  mutate(async function loadHome({ state, effects }) {
    state.page = Page.HOME
    if (!state.demos.length) {
      state.demos = await effects.request('/backend/demos')
    }
  })

export const loadGuides: <T>() => Operator<T> = () =>
  mutate(async function loadGuides({ state, effects }) {
    state.page = Page.GUIDES
    if (!state.guides.length) {
      state.isLoadingGuides = true
      state.guides = await effects.request('/backend/guides')
      state.isLoadingGuides = false
    }
  })

export const loadVideos: <T>() => Operator<T> = () =>
  mutate(async function loadVideos({ state, effects }) {
    state.page = Page.VIDEOS
    state.currentVideo = null
    if (!state.videos.length) {
      state.isLoadingVideos = true
      state.videos = await effects.request('/backend/videos')
      state.isLoadingVideos = false
    }
  })

export const setVideo: <
  T extends RouteContext<{ title: string }>
>() => Operator<T> = () =>
  mutate(function setVideo({ state }, routeContext) {
    state.currentVideo = routeContext.params.title
  })

export const setGuide: <T extends RouteContext<GuideParams>>() => Operator<
  T
> = () =>
  mutate(async function setGuide({ state }, routeContext) {
    state.page = Page.GUIDE
    state.currentGuide = routeContext.params
  })

export const loadApi: <T extends RouteContext<{ title: string }>>() => Operator<
  T
> = () =>
  mutate(async function loadApi({ state, effects }, routeContext) {
    state.page = Page.API
    state.currentApi = routeContext.params.title
    if (!state.apis.length) {
      state.isLoadingApis = true
      state.apis = await effects.request('/backend/apis')
      state.isLoadingApis = false
    }
  })

export const setQuery: () => Operator<string> = () =>
  mutate(function setQuery({ state }, query) {
    state.query = query
    state.showSearchResult = query.length > 2
    state.isLoadingSearchResult = query.length > 2
  })

export const isValidQuery: () => Operator<string> = () =>
  filter(({ state }) => state.query.length >= 3)

export const getSearchResult: <T>() => Operator<T> = () =>
  mutate(async ({ state, effects }) => {
    state.searchResult = await effects.request(
      '/backend/search?query=' + state.query
    )
    state.isLoadingSearchResult = false
  })
