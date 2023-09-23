import { stringMaxChars } from '@/utils'
import Image from 'next/image'
import { FC } from 'react'
import { ITrack } from './types'

export const Track: FC<ITrack> = ({ image, title, artist }) => (
  <div className="flex gap-5">
    <Image
      src={image}
      alt={title}
      width={55}
      height={55}
      priority
      className="rounded-sm"
    />
    <div className="flex flex-col gap-1">
      <h1>{stringMaxChars(title)}</h1>
      <p className="text-sm text-gray-300">{artist}</p>
    </div>
  </div>
)
