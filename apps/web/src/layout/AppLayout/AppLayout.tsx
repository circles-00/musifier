import { FC } from 'react'
import { IAppLayout } from './types'

export const AppLayout: FC<IAppLayout> = ({ children }) => (
  <div className="px-5 py-7 text-white h-screen no-scrollbar">{children}</div>
)
