import { FC } from 'react'
import { IFillImage } from './types'
import Image from 'next/image'
import { mergeClassNames } from '@/utils'

export const FillImage: FC<IFillImage> = ({ src, alt, className = '' }) => (
  <Image
    src={src}
    alt={alt}
    fill
    priority
    style={{ objectFit: 'cover' }}
    className={mergeClassNames('pointer-events-none', className)}
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  />
)
