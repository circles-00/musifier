import { MusicPlayerRenderer } from '@/domains/music-player'
import { AppLayout } from '@/layout'
import { RootProvider } from '@/providers'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Search from './search'
import Home from './index'
import Playlist from './playlist'

const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/playlist',
    element: <Playlist />,
  },
  {
    path: '/search',
    element: <Search />,
  },
]

export default function App({ pageProps }: AppProps) {
  return (
    <RootProvider>
      <MemoryRouter initialEntries={['/']}>
        <AppLayout>
          <MusicPlayerRenderer>
            <Routes>
              {routes.map((route) => (
                <Route key={route.path} {...route} {...pageProps} />
              ))}
            </Routes>
          </MusicPlayerRenderer>
        </AppLayout>
      </MemoryRouter>
    </RootProvider>
  )
}
