import { useMusicPlayerCurrentTrackId } from '@/hooks'
import { DataService } from '@/services'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid'
import { useMusicPlayerContext } from '../../hooks'
import { LinearProgressBar } from '@/components'
import { useMemo } from 'react'
import { convertMsToS } from '@/utils'

export const MiniMusicPlayer = () => {
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
  } = useMusicPlayerContext()

  const progress = useMemo(() => {
    const trackDurationInSeconds = convertMsToS(data?.duration ?? 0)
    const progressPercentage = (currentTime / trackDurationInSeconds) * 100

    return progressPercentage
  }, [currentTime, data?.duration])

  if (!data) {
    return null
  }

  return (
    <div className="w-full fixed bottom-3 left-4 z-10 bg-red-600">
      <div className="flex w-11/12 justify-between p-2 items-center">
        <div className="flex gap-4 ">
          <Image
            src={data?.image ?? ''}
            alt={data?.name ?? ''}
            width={40}
            height={40}
          />
          <div className="flex flex-col">
            <p className="">{data?.name}</p>
            <p className="text-gray-200 text-sm">
              {data?.artists?.map(({ name }) => name)?.join(', ')}
            </p>
          </div>
        </div>
        <button onClick={onToggleMusicPlayer} className="mr-4">
          {isPlaying ? (
            <PauseIcon className="w-10 h-10" />
          ) : (
            <PlayIcon className="w-10 h-10" />
          )}
        </button>
      </div>
      <LinearProgressBar progress={progress} />
    </div>
  )
}
