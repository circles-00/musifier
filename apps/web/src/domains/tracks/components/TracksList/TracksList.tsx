import { FC } from 'react'
import { Track } from '../Track'
import { ITracksList } from './types'

export const TracksList: FC<ITracksList> = ({ tracks }) => (
  <div className="mt-5 flex flex-col gap-4">
    {tracks?.map(({ id: trackId, name: title, image, artists }) => (
      <Track
        key={trackId}
        id={trackId}
        title={title}
        image={image}
        artist={artists?.map(({ name }) => name)?.join(', ')}
      />
    ))}
  </div>
)
