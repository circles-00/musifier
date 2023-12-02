import { Avatar } from '@/components'
import { getTimeOfDay } from '@/utils'
import { FC, useMemo } from 'react'
import { ITopBar } from './types'

export const TopBar: FC<ITopBar> = ({ avatar, name }) => {
  const timeOfDayMessage = useMemo(() => `Good ${getTimeOfDay()}`, [])

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold">{timeOfDayMessage}</h1>
      <Avatar avatar={avatar} name={name} />
    </div>
  )
}
