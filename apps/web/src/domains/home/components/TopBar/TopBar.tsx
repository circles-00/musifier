import { FillImage } from '@/components'
import { getTimeOfDay } from '@/utils'
import { getFirstLetterCapitalized } from '@/utils/get-first-letter-capitalized'
import { FC, useMemo } from 'react'
import { ITopBar } from './types'

export const TopBar: FC<ITopBar> = ({ avatar, name }) => {
  const timeOfDayMessage = useMemo(() => `Good ${getTimeOfDay()}`, [])

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">{timeOfDayMessage}</h1>
      <div className="flex justify-center items-center bg-gray-500 rounded-full w-12 h-12 relative">
        {avatar && (
          <FillImage src={avatar} alt="avatar" className="rounded-full" />
        )}
        <p className="text-2xl">{getFirstLetterCapitalized(name)}</p>
      </div>
    </div>
  )
}
