import { FC } from 'react'
import { IAppLayout } from './types'

export const AppLayout: FC<IAppLayout> = ({ children }) => (
  <div className="no-scrollbar px-5 pb-20 pt-7 text-white">{children}</div>
)
