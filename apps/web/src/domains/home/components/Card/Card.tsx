import { FC } from 'react'
import { ICard } from './types'
import { FillImage } from '@/components/common'
import { stringMaxChars, stripHtmlTags } from '@/utils'

export const Card: FC<ICard> = ({ image, title, caption }) => (
  <div className="flex flex-col gap-4">
    <div className="w-44 h-44 relative">
      <FillImage src={image} alt={title} />
    </div>
    <div className="flex flex-col gap-1">
      <p className="text-clip text-md text-start text-gray-300">{title}</p>
      <p className="text-clip text-sm text-start text-gray-400">
        {stringMaxChars(stripHtmlTags(caption), 50)}
      </p>
    </div>
  </div>
)
