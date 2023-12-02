import { useMusicPlayerCurrentTrackId } from '@/hooks'
import { DataService } from '@/services'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useMusicPlayerContext } from '../../hooks'
import { MusicPlayerControls } from './components/MusicPlayerControls/MusicPlayerControls'

export const MusicPlayer = () => {
  const router = useRouter()

  const currentTrackId = useMusicPlayerCurrentTrackId()
  const { data } = useQuery({
    queryFn: () => DataService.getOneTrack(currentTrackId as number),
    queryKey: DataService.getOneTrack.queryKey(currentTrackId as number),
    enabled: !!currentTrackId,
  })

  const { toggleMiniPlayer } = useMusicPlayerContext()

  useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      toggleMiniPlayer()
    })
  }, [router.events, toggleMiniPlayer])

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
