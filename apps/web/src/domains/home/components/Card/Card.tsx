import { FC, useCallback } from 'react'
import { ICard } from './types'
import { FillImage } from '@/components/common'
import { stringMaxChars, stripHtmlTags } from '@/utils'
import { useNavigate } from 'react-router-dom'

export const Card: FC<ICard> = ({ image, title, caption, playlistId }) => {
  const navigate = useNavigate()
  const onNavigate = useCallback(() => {
    if (!playlistId) {
      return
    }

    navigate('/playlist', { state: { id: playlistId } })
  }, [navigate, playlistId])

  return (
    <button className="flex flex-col gap-4" onClick={onNavigate}>
      <div className="relative h-44 w-44">
        <FillImage src={image} alt={title} />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-md text-clip text-start text-gray-300">{title}</p>
        <p className="text-clip text-start text-sm text-gray-400">
          {stringMaxChars(stripHtmlTags(caption), 50)}
        </p>
      </div>
    </button>
  )
}
