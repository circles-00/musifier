import { AppLayout } from '@/layout'
import { RootProvider } from '@/providers'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppLayout>
      <RootProvider>
        <Component {...pageProps} />
      </RootProvider>
    </AppLayout>
  )
}
