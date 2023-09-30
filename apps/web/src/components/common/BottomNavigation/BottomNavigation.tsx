import {
  HomeIcon,
  MagnifyingGlassIcon as SearchIcon,
  MusicalNoteIcon as LibraryIcon,
} from '@heroicons/react/24/solid'
import { uniqueId } from 'lodash'
import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'

export const BottomNavigation = () => {
  const router = useRouter()

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
      const currentRoute = router.pathname

      return currentRoute.includes(route)
    },
    [router.pathname],
  )

  return (
    <div className="fixed bottom-0 left-0 z-10 h-16 w-full bg-black bg-opacity-80">
      <div className="flex h-full items-center justify-evenly">
        {navigationItems.map(({ name, icon: Icon, route }) => (
          <button onClick={() => router.push(route)} key={uniqueId()}>
            <div className="flex flex-col items-center justify-center gap-1">
              <Icon
                className={`h-6 w-6 ${
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
