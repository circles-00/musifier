import { useMusicPlayerCurrentTrackId } from '@/hooks'
import { DataService } from '@/services'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useMusicPlayerContext } from '../../hooks'
import { MusicPlayerControls } from './components/MusicPlayerControls/MusicPlayerControls'
import { Image } from '@/components'

export const MusicPlayer = () => {
  const location = useLocation()
  const [initialLocation, setInitialLocation] = useState<string | null>(null)

  const currentTrackId = useMusicPlayerCurrentTrackId()
  const { data } = useQuery({
    queryFn: () => DataService.getOneTrack(currentTrackId as number),
    queryKey: DataService.getOneTrack.queryKey(currentTrackId as number),
    enabled: !!currentTrackId,
  })

  const { toggleMiniPlayer, setIsMiniPlayerVisible } = useMusicPlayerContext()

  useEffect(() => {
    if (!initialLocation) {
      setInitialLocation(location.pathname)
      return
    }

    setIsMiniPlayerVisible(true)
  }, [initialLocation, location.pathname, setIsMiniPlayerVisible])

  return (
    <div className="flex flex-col">
      <button className="flex w-fit" onClick={toggleMiniPlayer}>
        <ChevronDownIcon className="h-10 w-10" />
      </button>
      <div className="mt-5 flex justify-center">
        <Image
          src={data?.image ?? ''}
          alt={data?.name ?? ''}
          width={300}
          height={300}
        />
      </div>
      <div className="ml-4 mt-32 flex w-11/12 flex-col justify-center gap-5">
        <div>
          <h1 className="text-xl font-bold">{data?.name}</h1>
          <p className="text-gray-300">
            {data?.artists?.map(({ name }) => name)?.join(', ')}
          </p>
        </div>
        <MusicPlayerControls />
      </div>
    </div>
  )
}
