import { DataService } from '@/services'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import { PlaylistHeader, Track } from '@/domains/playlist'

const PlaylistPage = () => {
  const router = useRouter()
  const { id } = router.query
  const parsedId = Number.parseInt(id as string)

  const { data } = useQuery({
    queryFn: () => DataService.getOnePlaylist(parsedId),
    queryKey: DataService.getOnePlaylist.queryKey(parsedId),
    enabled: !!id,
  })

  useEffect(() => {
    // TODO: Probably route back to 404 page
    if (router.isReady && !id) {
      router.back()
    }
  }, [id, router])

  const featuredArtists = useMemo(
    () =>
      data?.tracksList
        ?.slice(0, 3)
        ?.map(({ artists }) => artists?.map(({ name }) => name)?.join(', '))
        ?.join(', '),
    [data?.tracksList],
  )

  return (
    <div className="pb-5">
      <PlaylistHeader
        numberOfSongs={data?.tracksList?.length}
        featuredArtists={featuredArtists}
        image={data?.image}
      />
      <div className="mt-5 flex flex-col gap-4">
        {data?.tracksList?.map(
          ({ id: trackId, name: title, image, artists }) => (
            <Track
              key={trackId}
              id={trackId}
              title={title}
              image={image}
              artist={artists?.map(({ name }) => name)?.join(', ')}
            />
          ),
        )}
      </div>
    </div>
  )
}

export default PlaylistPage
