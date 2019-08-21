import {
  Page,
  Video,
  Guide,
  Api,
  GuideParams,
  Demo,
  SearchResult,
} from './types'
import { Derive } from 'overmind'

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
  showViewHelp: boolean
  versions: {
    [name: string]: string
  }
  foo: Derive<State, string>
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
  showViewHelp: false,
  versions: {},
  foo: () => 'bar',
}

export default state
