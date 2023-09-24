import { useMusicPlayerCurrentTrackId } from '@/hooks'
import { DataService } from '@/services'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useMusicPlayerContext } from '../../hooks'
import { MusicPlayerControls } from './components/MusicPlayerControls/MusicPlayerControls'

export const MusicPlayer = () => {
  const currentTrackId = useMusicPlayerCurrentTrackId()
  const { data } = useQuery({
    queryFn: () => DataService.getOneTrack(currentTrackId as number),
    queryKey: DataService.getOneTrack.queryKey(currentTrackId as number),
    enabled: !!currentTrackId,
  })

  const { toggleMiniPlayer } = useMusicPlayerContext()

  return (
    <div className="flex flex-col">
      <button className="flex w-fit" onClick={toggleMiniPlayer}>
        <ChevronDownIcon className="w-10 h-10" />
      </button>
      <div className="flex justify-center mt-10">
        <Image
          src={data?.image ?? ''}
          alt={data?.name ?? ''}
          width={350}
          height={350}
        />
      </div>
      <div className="mt-28 ml-4 w-11/12 flex flex-col gap-5 justify-center">
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
