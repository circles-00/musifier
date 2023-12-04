import { useCacheSearchResults } from '@/domains/search'
import { ISearchResult } from '@/store/search'
import { useCallback } from 'react'
import { ITracksList } from './types'

import dynamic from 'next/dynamic'
const TrackComponent = dynamic(
  () => import('./components/TrackComponent').then((mod) => mod.TrackComponent),
  { ssr: false },
)

export const TracksList = ({
  tracks,
  type = 'playlist',
  cacheTrack = false,
  onTrackClick,
}: ITracksList) => {
  const { onAddSearchResult, onRemoveSearchResult } = useCacheSearchResults()

  const onClick = useCallback(
    (searchResult: ISearchResult) => {
      onTrackClick?.(searchResult)

      if (!cacheTrack) {
        return
      }

      onAddSearchResult(searchResult)
    },
    [cacheTrack, onAddSearchResult, onTrackClick],
  )

  const onDelete = useCallback(
    (idx: number) => {
      if (type !== 'search') {
        return
      }

      onRemoveSearchResult(idx)
    },
    [onRemoveSearchResult, type],
  )

  return (
    <div className="mt-5 flex flex-col gap-4">
      {tracks?.map(
        ({ id: trackId, name: title, image, artists, ...track }, idx) => (
          <TrackComponent
            type={type}
            onClick={() =>
              onClick({
                type: 'track',
                content: {
                  id: trackId,
                  name: title,
                  image,
                  artists,
                  ...track,
                },
              })
            }
            onDelete={() => onDelete(idx)}
            key={trackId}
            id={trackId}
            title={title}
            image={image}
            artist={artists?.map(({ name }) => name)?.join(', ')}
          />
        ),
      )}
    </div>
  )
}
