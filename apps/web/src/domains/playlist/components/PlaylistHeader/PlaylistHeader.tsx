import { FC } from 'react'
import { IPlaylistHeader } from './types'
import { LABELS } from './utils'
import { isEmpty } from 'lodash'
import { Image } from '@/components'

export const PlaylistHeader: FC<IPlaylistHeader> = ({
  featuredArtists,
  image,
  numberOfSongs,
}) => (
  <div className="flex flex-col gap-4">
    <div className="mt-3 flex flex-col items-center gap-4">
      {!isEmpty(image) && (
        <Image src={image ?? ''} width={270} height={270} alt={''} priority />
      )}
      {featuredArtists && (
        <p className="self-start text-start text-gray-300">
          {`${featuredArtists} ${LABELS.andMore}`}
        </p>
      )}
    </div>
    {numberOfSongs && (
      <p className="text-sm text-gray-300">{`${numberOfSongs} ${LABELS.songs}`}</p>
    )}
  </div>
)
