import { useStore } from '@/store'

export const useMusicPlayerCurrentTrackId = () =>
  useStore((state) => state.currentTrackId)

export const useMusicPlayerSeekTime = () => useStore((state) => state.seekTime)

export const useIsMiniPlayerVisible = () =>
  useStore((state) => state.isMiniPlayerVisible)

export const useMusicPlayerActions = () =>
  useStore((state) => state.musicPlayerActions)
