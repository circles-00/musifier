import { useSearchActions, useSearchResults } from '@/hooks'
import { ISearchResult } from '@/store/search'
import { useCallback } from 'react'

export const useCacheSearchResults = () => {
  const searchResults = useSearchResults()
  const { setSearchResults } = useSearchActions()

  const MAX_SEARCH_RESULTS = 10

  const onAddSearchResult = useCallback(
    (searchResult: ISearchResult) => {
      const searchResultsCopy = [...searchResults]
      const isSearchResultAlreadyCached = searchResultsCopy.some(
        (cachedSearchResult) =>
          cachedSearchResult.content.id === searchResult.content.id,
      )

      if (isSearchResultAlreadyCached) {
        return
      }

      searchResultsCopy.unshift(searchResult)

      if (searchResultsCopy.length > MAX_SEARCH_RESULTS) {
        searchResultsCopy.pop()
      }

      setSearchResults(searchResultsCopy)
    },
    [searchResults, setSearchResults],
  )

  const onRemoveSearchResult = useCallback(
    (index: number) => {
      const searchResultsCopy = [...searchResults]
      searchResultsCopy.splice(index, 1)

      setSearchResults(searchResultsCopy)
    },
    [searchResults, setSearchResults],
  )

  return {
    onAddSearchResult,
    onRemoveSearchResult,
    searchResults,
  }
}
