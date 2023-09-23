import axios from 'axios'
import { createApiHandler } from '../utils'
import { IPlalylist } from './types'

export const getOnePlaylist = createApiHandler(
  async (id: number) => {
    const { data } = await axios.get<IPlalylist>(`/server/playlists/${id}`, {
      params: {
        'relations[tracksList][artists]': true,
      },
    })

    return data
  },
  (id: number) => ['get_one_playlist', id],
)
