import { FC, ReactNode } from 'react'
import { MiniMusicPlayer, MusicPlayer } from '../../components'
import { useMusicPlayerContext } from './MusicPlayerProvider'

interface IMusicPlayerRenderer {
  children: ReactNode
}

export const MusicPlayerRenderer: FC<IMusicPlayerRenderer> = ({ children }) => {
  const { isMiniPlayerVisible } = useMusicPlayerContext()

  return (
    <>
      <div className={isMiniPlayerVisible ? 'block' : 'hidden'}>
        <MiniMusicPlayer />
        {children}
      </div>
      <div className={!isMiniPlayerVisible ? 'block' : 'hidden'}>
        <MusicPlayer />
      </div>
    </>
  )
}
