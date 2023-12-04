import { ITrack } from '@/services/data-service'
import { ISearchResult } from '@/store/search'

export type TTrackType = 'playlist' | 'search'

export interface ITracksList {
  tracks: ITrack[]
  type?: TTrackType
  cacheTrack?: boolean
  onTrackClick?: (searchResult: ISearchResult) => void
}
