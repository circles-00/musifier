import { useMusicPlayerContext } from '@/domains/music-player'
import { stringMaxChars } from '@/utils'
import { isEmpty } from 'lodash'
import { FC, useCallback } from 'react'
import { ITrack } from './types'
import { Image } from '@/components'

export const Track: FC<ITrack> = ({ image, title, artist, id, onClick }) => {
  const { loadNewTrack } = useMusicPlayerContext()

  const loadTrackToMusicPlayer = useCallback(() => {
    loadNewTrack(id)
    onClick?.()
  }, [id, loadNewTrack, onClick])

  return (
    <button
      className="flex w-full gap-5 text-start"
      onClick={loadTrackToMusicPlayer}
    >
      {!isEmpty(image) && (
        <Image
          src={image ?? ''}
          alt={title}
          width={55}
          height={55}
          priority
          className="rounded-sm"
        />
      )}
      <div className="flex flex-col gap-1">
        <h1>{stringMaxChars(title)}</h1>
        <p className="text-sm text-gray-300">{artist}</p>
      </div>
    </button>
  )
}
