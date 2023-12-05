import { Slider } from '@/components'
import { useMusicPlayerContext } from '@/domains/music-player'
import { useMusicPlayerCurrentTrackId } from '@/hooks'
import { DataService } from '@/services'
import { convertMsToS, getMinutesSecondsFromMs } from '@/utils'
import { useQuery } from '@tanstack/react-query'
import {
  PlayIcon,
  PauseIcon,
  SkipNextIcon,
  SkipPreviousIcon,
} from '@/assets/svgs'
import { useMemo } from 'react'
import { RepeatIcon } from '@/assets/svgs/RepeatIcon'
import { RepeatOnIcon } from '@/assets/svgs/RepeatOnIcon'
import { RepeatOneOnIcon } from '@/assets/svgs/RepeatOneOnIcon'
import { ShuffleIcon } from '@/assets/svgs/ShuffleIcon'

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
    onPreviousTrack,
    onNextTrack,
    playingMode,
    onChangePlayingMode,
  } = useMusicPlayerContext()

  const playingModeIcon = useMemo(() => {
    switch (playingMode) {
      case 'none':
        return <RepeatIcon className="h-8 w-8" />
      case 'repeat':
        return <RepeatOnIcon className="h-8 w-8 fill-sky-500" />
      case 'repeat-one':
        return <RepeatOneOnIcon className="h-8 w-8 fill-sky-500" />
    }
  }, [playingMode])

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

      <div className="flex justify-center gap-4">
        {/* TODO: Change icons, they look terrible */}
        <button>
          <ShuffleIcon className="h-8 w-8" />
        </button>
        <button onClick={onPreviousTrack}>
          <SkipPreviousIcon className="h-16 w-16" />
        </button>
        <button onClick={onToggleMusicPlayer}>
          {isPlaying ? (
            <PauseIcon className="h-20 w-20" />
          ) : (
            <PlayIcon className="h-20 w-20" />
          )}
        </button>
        <button onClick={onNextTrack}>
          <SkipNextIcon className="h-16 w-16" />
        </button>
        <button onClick={onChangePlayingMode}>{playingModeIcon}</button>
      </div>
    </>
  )
}
