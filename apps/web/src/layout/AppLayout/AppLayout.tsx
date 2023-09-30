import { BottomNavigation } from '@/components'
import { useMusicPlayerContext } from '@/domains/music-player'
import { FC } from 'react'
import { IAppLayout } from './types'

export const AppLayout: FC<IAppLayout> = ({ children }) => {
  const { isMiniPlayerVisible } = useMusicPlayerContext()

  return (
    <div
      className={`no-scrollbar px-5 ${
        isMiniPlayerVisible ? 'pb-36' : 'pb-20'
      } pt-7 text-white`}
    >
      <BottomNavigation />
      {children}
    </div>
  )
}
