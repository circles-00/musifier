import { DataService } from '@/services'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo } from 'react'
import { PlaylistHeader } from '@/domains/playlist'
import { TracksList } from '@/domains/tracks/components/TracksList/TracksList'
import { useLocation, useNavigate } from 'react-router-dom'

const PlaylistPage = () => {
  const location = useLocation()
  const id = location.state?.id
  const parsedId = Number.parseInt(id as string)

  const navigate = useNavigate()
  const { data } = useQuery({
    queryFn: () => DataService.getOnePlaylist(parsedId),
    queryKey: DataService.getOnePlaylist.queryKey(parsedId),
    enabled: !!id,
  })

  useEffect(() => {
    // TODO: Probably route back to 404 page
    if (!id) {
      navigate(-1)
    }
  }, [id, navigate])

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
      <TracksList tracks={data?.tracksList ?? []} />
    </div>
  )
}

export default PlaylistPage
