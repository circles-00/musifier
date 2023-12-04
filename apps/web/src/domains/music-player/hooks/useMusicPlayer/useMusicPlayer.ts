import {
  useAudioContext,
  useIsBrowser,
  useMusicPlayerActions,
  useMusicPlayerCurrentTrackId,
  useMusicPlayerSeekTime,
} from '@/hooks'
import { DataService } from '@/services'
import { useMutation } from '@tanstack/react-query'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useMusicPlayerQueue } from './useMusicPlayerQueue'
import { useNavigationMusicPlayer } from './useNavigationMusicPlayer'

export const useMusicPlayer = () => {
  const [currentTime, setCurrentTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMiniPlayerVisible, setIsMiniPlayerVisible] = useState(true)

  const [errorRetries, setErrorRetries] = useState(0)

  const seekTime = useMusicPlayerSeekTime()
  const currentTrackId = useMusicPlayerCurrentTrackId()

  const { setSeekTime, setCurrentTrackId } = useMusicPlayerActions()
  const isBrowser = useIsBrowser()
  const src = useMemo(
    () => `/server/stream/${currentTrackId}`,
    [currentTrackId],
  )

  const { getNextTrack, getPreviousTrack, ...queueMethods } =
    useMusicPlayerQueue()

  const {
    mutate: removeTrackFromCache,
    reset: resetRemoveTrackFromCacheMutation,
  } = useMutation({
    mutationFn: DataService.removeTrackFromCache,
    mutationKey: DataService.removeTrackFromCache.queryKey,
  })

  const audioElement = useMemo(() => {
    if (!isBrowser) {
      return null
    }

    return new Audio()
  }, [isBrowser])

  const { audioContext } = useAudioContext()
  // More info: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API#controlling_sound
  const onPlay = useCallback(() => {
    if (audioContext?.state === 'suspended') {
      audioContext?.resume()
    }

    setIsPlaying(true)
    audioElement
      ?.play()
      .then(() => setErrorRetries(0))
      .catch(() => {
        if (!currentTrackId) {
          return
        }

        // Note: This is not tested
        if (errorRetries < 3) {
          setErrorRetries((retries) => retries + 1)
          return
        }

        // Note: This removes the track from the cache if it fails to play,
        // which means the file is corrupted, so with this we can remove it from the cache and try again
        removeTrackFromCache(currentTrackId)
        resetRemoveTrackFromCacheMutation()
      })
  }, [
    audioContext,
    audioElement,
    currentTrackId,
    errorRetries,
    removeTrackFromCache,
    resetRemoveTrackFromCacheMutation,
  ])

  const onPause = useCallback(() => {
    if (audioContext?.state === 'suspended') {
      audioContext?.resume()
    }

    setIsPlaying(false)
    audioElement?.pause()
  }, [audioContext, audioElement, setIsPlaying])

  const resetTrackTime = useCallback(() => {
    if (!audioElement) {
      return
    }

    setSeekTime(0)
    setCurrentTime(0)
    audioElement.currentTime = 0
  }, [audioElement, setSeekTime])

  const loadNewTrack = useCallback(
    (id: number) => {
      resetTrackTime()
      onPlay()

      setCurrentTrackId(id)
    },
    [onPlay, resetTrackTime, setCurrentTrackId],
  )

  const onPreviousTrack = useCallback(() => {
    const previousTrackId = getPreviousTrack()

    if (!previousTrackId) {
      return
    }

    loadNewTrack(previousTrackId)

    // TODO: Implement this
  }, [getPreviousTrack, loadNewTrack])

  const onNextTrack = useCallback(() => {
    const nextTrackId = getNextTrack()

    if (!nextTrackId) {
      return
    }

    loadNewTrack(nextTrackId)
  }, [getNextTrack, loadNewTrack])

  const onToggle = useCallback(() => {
    if (isPlaying) {
      onPause()
      return
    }

    onPlay()
  }, [isPlaying, onPlay, onPause])

  const seekTo = useCallback(
    (seconds: number) => {
      if (!audioElement) {
        return
      }

      audioElement.currentTime = seconds
    },
    [audioElement],
  )

  const toggleMiniPlayer = useCallback(() => {
    setIsMiniPlayerVisible((isVisible) => !isVisible)
  }, [setIsMiniPlayerVisible])

  // Initialize audio element with track source
  useEffect(() => {
    if (!src || !audioElement) {
      return
    }

    const onEnded = () => {
      onPause()
      resetTrackTime()

      // TODO: This will need to be changed when we implement shuffle & repeat
      onNextTrack()
    }

    audioElement.src = src
    audioElement.currentTime = seekTime
    audioElement.ontimeupdate = () => {
      setCurrentTime(audioElement.currentTime)
    }

    // This is to prevent the media playing from being blocked by the browser
    // Also, play the audio as soon as the audio element is ready
    // @ts-expect-error Not sure why typescript doesn't know about this
    if (navigator.userActivation.isActive) {
      audioElement.addEventListener('loadeddata', onPlay)
    }

    audioElement.addEventListener('ended', onEnded)

    return () => {
      audioElement.removeEventListener('loadeddata', onPlay)
      audioElement.removeEventListener('ended', onEnded)
    }
  }, [
    audioElement,
    onNextTrack,
    onPause,
    onPlay,
    resetTrackTime,
    seekTime,
    setSeekTime,
    src,
  ])

  // Setup audio context
  // More info: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API
  useEffect(() => {
    if (!audioContext || !audioElement) {
      return
    }

    const track = audioContext?.createMediaElementSource(audioElement)
    track?.connect(audioContext?.destination)
  }, [audioContext, audioElement])

  // This is to prevent the music from playing when the user closes the tab
  useEffect(() => {
    const onUnload = () => {
      setIsPlaying(false)
      setSeekTime(audioElement?.currentTime ?? 0)
    }

    window.addEventListener('beforeunload', onUnload)

    return () => {
      window.removeEventListener('beforeunload', onUnload)
    }
  }, [audioElement?.currentTime, setIsPlaying, setSeekTime])

  useNavigationMusicPlayer({ onPlay, onPause, seekTo, onPreviousTrack })

  return {
    onPlay,
    onPause,
    isPlaying,
    onToggle,
    loadNewTrack,
    currentTime,
    seekTo,
    isMiniPlayerVisible,
    setIsMiniPlayerVisible,
    toggleMiniPlayer,
    onPreviousTrack,
    onNextTrack,
    ...queueMethods,
  }
}
