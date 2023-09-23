import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { TState } from './types'
import { createMusicPlayerSlice } from './music-player'

export const useStore = create<TState>()(
  persist(
    immer((...a) => ({
      ...createMusicPlayerSlice(...a),
    })),
    {
      storage: createJSONStorage(() => sessionStorage),
      name: 'store',
      partialize: (state: TState) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => !key.includes('Actions')),
        ),
    },
  ),
)
