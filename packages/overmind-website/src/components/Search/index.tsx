import { h, Component, useOvermind } from 'overmind-components'
import * as styles from './styles'
import { SearchResult } from '../../app/types'

export const Search: Component = () => {
  const { state, actions } = useOvermind()

  function onClick() {
    const onClose = () => {
      document.removeEventListener('click', onClose)
      actions.closeSearch()
    }
    document.addEventListener('click', onClose)
  }

  function renderSearchResultItem(item: SearchResult) {
    console.log(item)
    return (
      <a
        className={styles.searchResultItem}
        key={item.fileName}
        href={'/' + item.path}
      >
        <span>{item.type}</span>
        {item.title}
      </a>
    )
  }
  function renderSearchResult() {
    if (state.isLoadingSearchResult) {
      return <div className={styles.searchText}>Searching...</div>
    }
    if (state.searchResult.length === 0) {
      return <div className={styles.searchText}>Sorry, no result :(</div>
    }

    return state.searchResult.map(renderSearchResultItem)
  }

  return (
    <div className={styles.wrapper}>
      <input
        className={styles.inputElement}
        onClick={onClick}
        placeholder="Search..."
        onInput={actions.changeQuery}
        value={state.query}
      />
      {state.showSearchResult ? (
        <div className={styles.searchResult}>{renderSearchResult()}</div>
      ) : null}
    </div>
  )
}

export default Search
