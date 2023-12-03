import { FC } from 'react'
import { IImage } from './types'
import NextImage from 'next/image'

export const Image: FC<IImage> = (props) => (
  <NextImage {...props} className="pointer-events-none" />
)
