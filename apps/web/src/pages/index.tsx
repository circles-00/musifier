import { DataService } from '@/services'
import { useQuery } from '@tanstack/react-query'
import { uniqueId } from 'lodash'

const Home = () => {
  const { data } = useQuery({
    queryFn: () => DataService.getCategoriesWithPlaylists(),
    queryKey: DataService.getCategoriesWithPlaylists.queryKey(),
  })

  return data?.data?.map(({ name }) => (
    <div key={uniqueId()}>
      <h2>{name}</h2>
    </div>
  ))
}

export default Home
