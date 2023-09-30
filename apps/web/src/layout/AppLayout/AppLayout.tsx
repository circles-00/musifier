import { BottomNavigation } from '@/components'
import { useMusicPlayerCurrentTrackId } from '@/hooks'
import { FC } from 'react'
import { IAppLayout } from './types'

export const AppLayout: FC<IAppLayout> = ({ children }) => {
  const currentTrackId = useMusicPlayerCurrentTrackId()

  return (
    <div
      className={`no-scrollbar px-5 ${
        currentTrackId ? 'pb-36' : 'pb-20'
      } pt-7 text-white`}
    >
      <BottomNavigation />
      {children}
    </div>
  )
}
