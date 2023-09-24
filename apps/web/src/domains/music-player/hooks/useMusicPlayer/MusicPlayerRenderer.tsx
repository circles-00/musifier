import { FC, ReactNode } from 'react'
import { MiniMusicPlayer, MusicPlayer } from '../../components'
import { useMusicPlayerContext } from './MusicPlayerProvider'

interface IMusicPlayerRenderer {
  children: ReactNode
}

export const MusicPlayerRenderer: FC<IMusicPlayerRenderer> = ({ children }) => {
  const { isMiniPlayerVisible } = useMusicPlayerContext()

  return isMiniPlayerVisible ? (
    <>
      <MiniMusicPlayer />
      {children}
    </>
  ) : (
    <MusicPlayer />
  )
}
