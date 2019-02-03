export type Query = {
  view: string
  typescript: string
}

export type RouteContext<T = object> = {
  params: T
  query: Query
  path: string
}

export enum GuideType {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  PRO = 'pro',
}

export type GuideParams = {
  type: GuideType
  title: string
}

export type VideoParams = {
  title?: string
}

export type ApiParams = {
  title: string
}

export enum Page {
  HOME = 'HOME',
  GUIDES = 'GUIDES',
  GUIDE = 'GUIDE',
  VIDEOS = 'VIDEOS',
  API = 'API',
}

export type Video = {
  title: string
  type: string
  fileName: string
  url: string
  shortName: string
}

export type Guide = {
  title: string
  type: string
  fileName: string
}

export type Demo = {
  title: string
  sandboxes: {
    [view: string]: string
  }
}

export type Api = {
  title: string
  fileName: string
}

export type SearchResult = {
  type: string
  title: string
  count: number
  path: string
  fileName: string
}
