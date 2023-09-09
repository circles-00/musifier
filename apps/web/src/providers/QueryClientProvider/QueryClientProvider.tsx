import { QueryClient } from '@tanstack/react-query'
import { type FC, useMemo } from 'react'
import { type IQueryClientProvider } from './types'
import { QueryClientProvider as TanstackQueryClientProvider } from '@tanstack/react-query'

export const QueryClientProvider: FC<IQueryClientProvider> = ({ children }) => {
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            staleTime: 0,
          },
        },
      }),
    [],
  )

  return (
    <TanstackQueryClientProvider client={queryClient}>
      {children}
    </TanstackQueryClientProvider>
  )
}
