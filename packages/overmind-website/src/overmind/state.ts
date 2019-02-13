import {
  Page,
  Video,
  Guide,
  Api,
  GuideParams,
  Demo,
  SearchResult,
} from './types'

type State = {
  page: Page
  currentGuide: GuideParams
  currentVideo: string
  currentApi: string
  videos: Video[]
  guides: Guide[]
  demos: Demo[]
  apis: Api[]
  isLoading: boolean
  theme: string
  typescript: boolean
  query: string
  isLoadingSearchResult: boolean
  searchResult: SearchResult[]
  showSearchResult: boolean
  isLoadingGuides: boolean
  isLoadingApis: boolean
  isLoadingVideos: boolean
  isPreRelease: boolean
  showViewHelp: boolean
}

const state: State = {
  page: Page.HOME,
  currentGuide: null,
  currentVideo: null,
  currentApi: null,
  videos: [],
  guides: [],
  demos: [],
  apis: [],
  isLoading: true,
  theme: null,
  typescript: false,
  query: '',
  isLoadingSearchResult: false,
  searchResult: [],
  showSearchResult: false,
  isLoadingGuides: false,
  isLoadingApis: false,
  isLoadingVideos: false,
  isPreRelease: false,
  showViewHelp: false,
}

export default state
