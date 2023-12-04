import { useMusicPlayerCurrentTrackId } from '@/hooks'
import { DataService } from '@/services'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid'
import { useMusicPlayerContext } from '../../hooks'
import { LinearProgressBar } from '@/components'
import { useMemo } from 'react'
import { convertMsToS, stringMaxChars } from '@/utils'
import { hiddenScreens } from './utils'
import { useLocation } from 'react-router-dom'

export const MiniMusicPlayer = () => {
  const location = useLocation()

  const currentTrackId = useMusicPlayerCurrentTrackId()
  const { data } = useQuery({
    queryFn: () => DataService.getOneTrack(currentTrackId as number),
    queryKey: DataService.getOneTrack.queryKey(currentTrackId as number),
    enabled: !!currentTrackId,
  })

  const {
    isPlaying,
    onToggle: onToggleMusicPlayer,
    currentTime,
    toggleMiniPlayer,
  } = useMusicPlayerContext()

  const progress = useMemo(() => {
    const trackDurationInSeconds = convertMsToS(data?.duration ?? 0)
    const progressPercentage = (currentTime / trackDurationInSeconds) * 100

    return progressPercentage
  }, [currentTime, data?.duration])

  if (!data || hiddenScreens.includes(location.pathname)) {
    return null
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      className="fixed bottom-16 left-4 z-10 w-11/12 bg-red-600 opacity-95"
      onClick={toggleMiniPlayer}
    >
      <div className="flex items-center justify-between px-2 pb-1 pt-2">
        <div className="flex gap-4">
          <Image
            src={data?.image ?? ''}
            alt={data?.name ?? ''}
            width={40}
            height={40}
          />
          <div className="flex flex-col items-start">
            <p className="">{stringMaxChars(data?.name, 25)}</p>
            <p className="text-sm text-gray-200">
              {stringMaxChars(
                data?.artists?.map(({ name }) => name)?.join(', '),
                30,
              )}
            </p>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onToggleMusicPlayer()
          }}
          className="mr-4"
        >
          {isPlaying ? (
            <PauseIcon className="h-10 w-10" />
          ) : (
            <PlayIcon className="h-10 w-10" />
          )}
        </button>
      </div>
      <LinearProgressBar progress={progress} />
    </div>
  )
}
