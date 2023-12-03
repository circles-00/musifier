import { MusicPlayerProvider } from '@/domains/music-player/hooks/useMusicPlayer/MusicPlayerProvider'
import { useBlockBackButtonExit, useSyncNavigation } from '@/hooks'
import { FC } from 'react'
import { QueryClientProvider } from '../QueryClientProvider'
import { IRootProvider } from './types'

export const RootProvider: FC<IRootProvider> = ({ children }) => {
  useSyncNavigation()
  useBlockBackButtonExit()

  return (
    <QueryClientProvider>
      <MusicPlayerProvider>{children}</MusicPlayerProvider>
    </QueryClientProvider>
  )
}
