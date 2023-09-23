import { useStore } from '@/store'

export const useMusicPlayerCurrentTrackId = () =>
  useStore((state) => state.currentTrackId)

export const useMusicPlayerSeekTime = () => useStore((state) => state.seekTime)

export const useMusicPlayerIsPlaying = () =>
  useStore((state) => state.isPlaying)

export const useMusicPlayerActions = () =>
  useStore((state) => state.musicPlayerActions)
