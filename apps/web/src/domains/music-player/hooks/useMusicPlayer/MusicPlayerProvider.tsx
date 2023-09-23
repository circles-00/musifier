import { createContext, FC, ReactNode, useContext } from 'react'
import { useMusicPlayer } from './useMusicPlayer'

interface IMusicPlayerProvider {
  children: ReactNode
}

export const MusicPlayerContext =
  // @ts-expect-error We will fix this later
  createContext<ReturnType<typeof useMusicPlayer>>(null)

export const useMusicPlayerContext = () => useContext(MusicPlayerContext)

export const MusicPlayerProvider: FC<IMusicPlayerProvider> = ({ children }) => {
  const musicPlayer = useMusicPlayer()

  return (
    <MusicPlayerContext.Provider value={musicPlayer}>
      {children}
    </MusicPlayerContext.Provider>
  )
}
