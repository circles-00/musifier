import { useMusicPlayerContext } from '@/domains/music-player'
import { useReactRouterNavigate } from '@/hooks'
import {
  HomeIcon,
  MagnifyingGlassIcon as SearchIcon,
  MusicalNoteIcon as LibraryIcon,
} from '@heroicons/react/24/solid'
import { uniqueId } from 'lodash'
import { useCallback, useMemo, useTransition } from 'react'
import { useLocation } from 'react-router-dom'

export const BottomNavigation = () => {
  const [, startTransition] = useTransition()
  const navigate = useReactRouterNavigate()
  const location = useLocation()

  const navigationItems = useMemo(
    () => [
      {
        name: 'Home',
        icon: HomeIcon,
        route: '/',
      },
      {
        name: 'Search',
        icon: SearchIcon,
        route: '/search',
      },
      {
        name: 'Library',
        icon: LibraryIcon,
        route: '/library',
      },
    ],
    [],
  )

  const isActiveRoute = useCallback(
    (route: string) => {
      const currentRoute = location.pathname

      if (route === '/') {
        return route === currentRoute
      }

      return currentRoute.includes(route)
    },
    [location.pathname],
  )

  const { isMiniPlayerVisible } = useMusicPlayerContext()

  if (!isMiniPlayerVisible) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 z-10 h-24 w-full bg-black bg-opacity-80">
      <div className="flex h-full items-center justify-evenly">
        {navigationItems.map(({ name, icon: Icon, route }) => (
          <button
            onClick={() => {
              startTransition(() => {
                navigate(route)
              })
            }}
            key={uniqueId()}
          >
            <div className="flex flex-col items-center justify-center gap-1 pt-8">
              <Icon
                className={`h-8 w-8 ${
                  isActiveRoute(route) ? 'fill-sky-500' : ''
                }`}
              />
              <p className="text-xs">{name}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
