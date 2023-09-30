import { useStore } from '@/store'

export const useMusicPlayerCurrentTrackId = () =>
  useStore((state) => state.currentTrackId)

export const useMusicPlayerSeekTime = () => useStore((state) => state.seekTime)

export const useMusicPlayerActions = () =>
  useStore((state) => state.musicPlayerActions)
