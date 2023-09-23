import { mergeClassNames } from '@/utils'
import { FC } from 'react'
import { ILinearProgressBar } from './types'

export const LinearProgressBar: FC<ILinearProgressBar> = ({
  progress,
  className = '',
}) => {
  const defaultClassName = 'bg-white py-1'

  return (
    <div
      style={{ width: `${progress}%` }}
      className={mergeClassNames(defaultClassName, className)}
    />
  )
}
