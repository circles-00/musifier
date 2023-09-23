import {
  useAudioContext,
  useIsBrowser,
  useMusicPlayerActions,
  useMusicPlayerCurrentTrackId,
  useMusicPlayerIsPlaying,
  useMusicPlayerSeekTime,
} from '@/hooks'
import { useCallback, useEffect, useMemo, useState } from 'react'

export const useMusicPlayer = () => {
  const [currentTime, setCurrentTime] = useState(0)

  const isPlaying = useMusicPlayerIsPlaying()
  const seekTime = useMusicPlayerSeekTime()
  const currentTrackId = useMusicPlayerCurrentTrackId()

  const { setIsPlaying, setSeekTime, setCurrentTrackId } =
    useMusicPlayerActions()
  const isBrowser = useIsBrowser()
  const src = useMemo(
    () => `/server/stream/${currentTrackId}`,
    [currentTrackId],
  )

  const audioElement = useMemo(() => {
    if (!isBrowser) {
      return null
    }

    return document.createElement('audio')
  }, [isBrowser])

  const { audioContext } = useAudioContext()
  // More info: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API#controlling_sound
  const onPlay = useCallback(() => {
    if (audioContext?.state === 'suspended') {
      audioContext?.resume()
    }

    setIsPlaying(true)
    audioElement?.play()
  }, [audioContext, audioElement, setIsPlaying])

  const onPause = useCallback(() => {
    if (audioContext?.state === 'suspended') {
      audioContext?.resume()
    }

    setIsPlaying(false)
    audioElement?.pause()
  }, [audioContext, audioElement, setIsPlaying])

  const onToggle = useCallback(() => {
    if (isPlaying) {
      onPause()
      return
    }

    onPlay()
  }, [isPlaying, onPlay, onPause])

  const loadNewTrack = useCallback(
    (id: number) => {
      setCurrentTrackId(id)
      setSeekTime(0)
    },
    [setCurrentTrackId, setSeekTime],
  )

  // Initialize audio element with track source
  useEffect(() => {
    if (!src || !audioElement) {
      return
    }

    const onEnded = () => {
      onPause()
      setSeekTime(0)
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
  }, [audioElement, onPause, onPlay, seekTime, setSeekTime, src])

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

  return { onPlay, onPause, isPlaying, onToggle, loadNewTrack, currentTime }
}
