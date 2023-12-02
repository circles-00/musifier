import { useMusicPlayerCurrentTrackId } from '@/hooks'
import { DataService } from '@/services'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useMusicPlayer } from './useMusicPlayer'

interface IUserNavigationMusicPlayer
  extends Pick<
    ReturnType<typeof useMusicPlayer>,
    'onPlay' | 'onPause' | 'seekTo' | 'onPreviousTrack'
  > {}

export const useNavigationMusicPlayer = ({
  onPlay,
  onPause,
  seekTo,
  onPreviousTrack,
}: IUserNavigationMusicPlayer) => {
  const currentTrackId = useMusicPlayerCurrentTrackId()
  const { data } = useQuery({
    queryFn: () => DataService.getOneTrack(currentTrackId as number),
    queryKey: DataService.getOneTrack.queryKey(currentTrackId as number),
    enabled: !!currentTrackId,
  })

  useEffect(() => {
    if ('mediaSession' in window.navigator) {
      window.navigator.mediaSession.metadata = new MediaMetadata({
        title: data?.name,
        artist: data?.artists?.map(({ name }) => name)?.join(', '),
        artwork: [
          {
            src: data?.image ?? '',
            sizes: '96x96',
            type: 'image/png',
          },
          {
            src: data?.image ?? '',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: data?.image ?? '',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: data?.image ?? '',
            sizes: '256x256',
            type: 'image/png',
          },
          {
            src: data?.image ?? '',
            sizes: '384x384',
            type: 'image/png',
          },
        ],
      })

      window.navigator.mediaSession.setActionHandler('play', onPlay)
      window.navigator.mediaSession.setActionHandler('pause', onPause)
      window.navigator.mediaSession.setActionHandler('stop', () => null)
      window.navigator.mediaSession.setActionHandler('seekto', (details) => {
        if (!details?.seekTime) {
          return
        }

        seekTo(details?.seekTime)
      })
      window.navigator.mediaSession.setActionHandler(
        'previoustrack',
        onPreviousTrack,
      )
      window.navigator.mediaSession.setActionHandler('nexttrack', () => {})
    }
  }, [
    data?.artists,
    data?.image,
    data?.name,
    onPause,
    onPlay,
    onPreviousTrack,
    seekTo,
  ])
}
