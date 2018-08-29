import * as React from 'react'
import {
  InputElement,
  SearchResult,
  SearchResultItem,
  Wrapper,
  SearchText,
} from './elements'

function debounce(func, wait, immediate?) {
  var timeout
  return function() {
    var context = this

    var args = arguments
    var later = function() {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    var callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}

type TSearchResult = {
  type: string
  title: string
  count: number
  fileName: string
}

type State = {
  query: string
  isLoading: boolean
  searchResult: TSearchResult[]
  showSearchResult: boolean
}

class Search extends React.Component<{}, State> {
  state = {
    query: '',
    isLoading: false,
    searchResult: [],
    showSearchResult: false,
  }
  componentDidMount() {
    document.addEventListener('click', () => {
      this.setState({
        showSearchResult: false,
      })
    })
  }
  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value
    this.setState({
      query,
      showSearchResult: query.length > 2,
      isLoading: query.length > 2,
    })

    if (query.length < 3) {
      return
    }

    this.search()
  }
  search = debounce(function() {
    this.setState({
      isLoading: true,
    })
    fetch('/backend/search?query=' + this.state.query)
      .then((response) => response.json())
      .then((searchResult) =>
        this.setState({
          searchResult,
          isLoading: false,
        })
      )
  }, 200)
  renderSearchResultItem = (item: TSearchResult) => {
    return (
      <SearchResultItem
        key={item.fileName}
        href={`/${
          item.type === 'guide' ? 'guides' : 'api'
        }/${item.fileName.replace('.md', '')}`}
      >
        <span>{item.type}</span>
        {item.title}
      </SearchResultItem>
    )
  }
  renderSearchResult() {
    if (this.state.isLoading) {
      return <SearchText>Searching...</SearchText>
    }
    if (this.state.searchResult.length === 0) {
      return <SearchText>Sorry, no result :(</SearchText>
    }

    return this.state.searchResult.map(this.renderSearchResultItem)
  }
  onClick = () => {
    if (this.state.searchResult.length) {
      // Let closing click event go through first
      setTimeout(() => {
        this.setState({
          showSearchResult: true,
        })
      }, 0)
    }
  }
  render() {
    return (
      <Wrapper>
        <InputElement
          onClick={this.onClick}
          placeholder="Search..."
          onChange={this.onChange}
          value={this.state.query}
        />
        {this.state.showSearchResult ? (
          <SearchResult>{this.renderSearchResult()}</SearchResult>
        ) : null}
      </Wrapper>
    )
  }
}

export default Search
