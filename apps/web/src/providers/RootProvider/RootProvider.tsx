import { MusicPlayerProvider } from '@/domains/music-player/hooks/useMusicPlayer/MusicPlayerProvider'
import { FC } from 'react'
import { QueryClientProvider } from '../QueryClientProvider'
import { IRootProvider } from './types'

export const RootProvider: FC<IRootProvider> = ({ children }) => (
  <QueryClientProvider>
    <MusicPlayerProvider>{children}</MusicPlayerProvider>
  </QueryClientProvider>
)
