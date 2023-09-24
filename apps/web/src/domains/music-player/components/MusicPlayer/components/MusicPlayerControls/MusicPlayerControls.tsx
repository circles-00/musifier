import { Slider } from '@/components'
import { useMusicPlayerContext } from '@/domains/music-player'
import { useMusicPlayerCurrentTrackId } from '@/hooks'
import { DataService } from '@/services'
import { convertMsToS, getMinutesSecondsFromMs } from '@/utils'
import {
  BackwardIcon,
  ForwardIcon,
  PauseCircleIcon,
  PlayCircleIcon,
} from '@heroicons/react/24/solid'
import { useQuery } from '@tanstack/react-query'

export const MusicPlayerControls = () => {
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
    seekTo,
  } = useMusicPlayerContext()

  return (
    <>
      <div className="flex flex-col gap-3">
        <Slider
          defaultValue={[0]}
          value={[currentTime]}
          max={convertMsToS(data?.duration ?? 0)}
          step={1}
          onValueChange={(value) => seekTo(value[0])}
        />
        <div className="flex justify-between">
          <p>{getMinutesSecondsFromMs(currentTime * 1000)}</p>
          <p>{getMinutesSecondsFromMs(data?.duration ?? 0)}</p>
        </div>
      </div>

      <div className="flex gap-4 justify-center">
        {/* TODO: Change icons, they look terrible */}
        <button>
          <BackwardIcon className="w-20 h-20" />
        </button>
        <button onClick={onToggleMusicPlayer}>
          {isPlaying ? (
            <PauseCircleIcon className="w-20 h-20" />
          ) : (
            <PlayCircleIcon className="w-20 h-20" />
          )}
        </button>
        <button>
          <ForwardIcon className="w-20 h-20" />
        </button>
      </div>
    </>
  )
}
