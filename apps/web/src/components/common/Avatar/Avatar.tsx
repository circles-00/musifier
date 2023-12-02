import { getFirstLetterCapitalized } from '@/utils'
import { FC } from 'react'
import { FillImage } from '../FillImage'
import { IAvatar } from './types'

export const Avatar: FC<IAvatar> = ({ avatar, name }) => (
  <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gray-500">
    {avatar && <FillImage src={avatar} alt="avatar" className="rounded-full" />}
    <p className="text-2xl">{getFirstLetterCapitalized(name)}</p>
  </div>
)
