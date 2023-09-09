import { FC } from 'react'
import { QueryClientProvider } from '../QueryClientProvider'
import { IRootProvider } from './types'

export const RootProvider: FC<IRootProvider> = ({ children }) => (
  <QueryClientProvider>{children}</QueryClientProvider>
)
