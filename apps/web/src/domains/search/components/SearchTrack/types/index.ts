import { ITrack } from '@/domains/tracks/components/Track/types'

export interface ISearchTrack extends ITrack {
  onDelete?: () => void
}
