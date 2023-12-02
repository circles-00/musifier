import { IArtist, IPlalylist, ITrack } from '@/services/data-service'
import { TSearchTypes } from '@/services/data-service/search/types'

export interface ISearchResult {
  type: TSearchTypes
  content: ITrack | IArtist | IPlalylist
}

export interface ISearchActions {
  setSearchResults: (results: ISearchResult[]) => void
}

export interface ISearchState {
  searchActions: ISearchActions
  searchResults: ISearchResult[]
}

export type TSearchSlice = ISearchState
