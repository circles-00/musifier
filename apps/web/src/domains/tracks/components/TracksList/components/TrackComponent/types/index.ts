import { ISearchTrack } from '@/domains/search/components/SearchTrack/types'
import { ITrack } from '@/domains/tracks/components/Track/types'
import { ITracksList } from '../../../types'

export interface ITrackComponent
  extends ITrack,
    ISearchTrack,
    Pick<ITracksList, 'type'> {}
