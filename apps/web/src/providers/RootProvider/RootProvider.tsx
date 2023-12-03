import { MusicPlayerProvider } from '@/domains/music-player/hooks/useMusicPlayer/MusicPlayerProvider'
import { useSyncNavigation } from '@/hooks'
import { FC } from 'react'
import { QueryClientProvider } from '../QueryClientProvider'
import { IRootProvider } from './types'

export const RootProvider: FC<IRootProvider> = ({ children }) => {
  useSyncNavigation()

  return (
    <QueryClientProvider>
      <MusicPlayerProvider>{children}</MusicPlayerProvider>
    </QueryClientProvider>
  )
}
