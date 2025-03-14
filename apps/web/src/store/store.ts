import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { TState } from './types'
import { createMusicPlayerSlice } from './music-player'
import { createSearchSlice } from './search'

export const useStore = create<TState>()(
  persist(
    immer((...a) => ({
      ...createMusicPlayerSlice(...a),
      ...createSearchSlice(...a),
    })),
    {
      storage: createJSONStorage(() => localStorage),
      name: 'store',
      partialize: (state: TState) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => !key.includes('Actions')),
        ),
    },
  ),
)
