import { Derive } from 'overmind'

import {
  Api,
  Demo,
  Guide,
  GuideParams,
  Page,
  SearchResult,
  Video,
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
  showViewHelp: boolean
  versions: {
    [name: string]: string
  }
  user: User
}

class User {
  name = 'Bob'
  toJSON() {
    return {
      name: 'ARNE',
    }
  }
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
  user: new User(),
}

export default state
