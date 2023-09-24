import { StateCreator } from 'zustand'
import { TState } from '../types'
import { TMusicPlayerSlice } from './types'

export const createMusicPlayerSlice: StateCreator<
  TState,
  [['zustand/persist', unknown], ['zustand/immer', never]],
  [],
  TMusicPlayerSlice
> = (set) => ({
  seekTime: 0,
  isMiniPlayerVisible: false,
  musicPlayerActions: {
    setCurrentTrackId: (trackId: number) =>
      set((state) => {
        state.currentTrackId = trackId
      }),
    setSeekTime: (seekTime: number) =>
      set((state) => {
        state.seekTime = seekTime
      }),
    setIsMiniPlayerVisible: (isVisible: boolean) =>
      set((state) => {
        state.isMiniPlayerVisible = isVisible
      }),
  },
})
