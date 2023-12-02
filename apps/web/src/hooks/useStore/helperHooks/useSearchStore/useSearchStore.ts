import { useStore } from '@/store'

export const useSearchResults = () => useStore((state) => state.searchResults)

export const useSearchActions = () => useStore((state) => state.searchActions)
