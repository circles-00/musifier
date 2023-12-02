import { SearchTrack } from '@/domains/search'
import { FC, useMemo } from 'react'
import { Track } from '../../../Track'
import { ITrackComponent } from './types'

export const TrackComponent: FC<ITrackComponent> = ({ type, ...props }) => {
  const Component = useMemo(() => {
    switch (type) {
      case 'playlist':
        return Track

      case 'search':
        return SearchTrack

      default:
        return Track
    }
  }, [type])

  return <Component {...props} />
}
