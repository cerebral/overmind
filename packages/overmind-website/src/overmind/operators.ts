import { action, Operator, pipe } from 'overmind'
import { Page, RouteContext, VideoParams } from './types'

export const openVideos: <T extends RouteContext>() => Operator<T> = () =>
  action(async ({ state, effects }) => {
    state.page = Page.VIDEOS
    state.currentVideo = null
    if (!state.videos.length) {
      state.isLoadingVideos = true
      state.videos = await effects.request('/backend/videos')
      state.isLoadingVideos = false
    }
  })

export const openVideo: Operator<RouteContext<VideoParams>> = pipe(
  openVideos<RouteContext<VideoParams>>(),
  action(({ value: routeContext, state }) => {
    state.currentVideo = routeContext.params.title
  })
)
