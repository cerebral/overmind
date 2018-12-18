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
  test: Derive<State, Guide[]>
}

const state: State = {
  page: null,
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
  test: (state) => state.guides.filter((guide) => guide.type === 'beginner'),
}

export default state
