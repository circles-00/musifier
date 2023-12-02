import { Track } from '@/domains/tracks'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { FC } from 'react'
import { ISearchTrack } from './types'

export const SearchTrack: FC<ISearchTrack> = ({ onDelete, ...trackProps }) => (
  <div className="flex w-full items-center justify-around gap-2">
    <Track {...trackProps} />
    <button onClick={onDelete}>
      <XMarkIcon className="h-8 w-8 text-white" />
    </button>
  </div>
)
