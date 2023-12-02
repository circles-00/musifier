import { ITrack } from '@/services/data-service'

export type TTrackType = 'playlist' | 'search'

export interface ITracksList {
  tracks: ITrack[]
  type?: TTrackType
}
