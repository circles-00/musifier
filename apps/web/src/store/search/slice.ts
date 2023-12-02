import { StateCreator } from 'zustand'
import { TState } from '../types'
import { TSearchSlice } from './types'

export const createSearchSlice: StateCreator<
  TState,
  [['zustand/persist', unknown], ['zustand/immer', never]],
  [],
  TSearchSlice
> = (set) => ({
  searchActions: {
    setSearchResults: (results) => {
      set((state) => {
        state.searchResults = results
      })
    },
  },
  searchResults: [],
})
