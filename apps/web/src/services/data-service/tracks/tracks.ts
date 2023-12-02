import axios from 'axios'
import { createApiHandler } from '../utils'
import { ITrack } from './types'

export const getOneTrack = createApiHandler(
  async (id: number) => {
    const { data } = await axios.get<ITrack>(`/server/tracks/${id}`, {
      params: {
        'relations[artists]': true,
      },
    })

    return data
  },
  (id: number) => ['get_one_track', id],
)

export const streamTrack = createApiHandler(
  async (id: number) => {
    const { data } = await axios.get<ITrack>(`/server/stream/${id}`, {})

    return data
  },
  (id: number) => ['stream_track', id],
)

export const removeTrackFromCache = createApiHandler(
  async (id: number) => {
    const { data } = await axios.delete(`/server/stream?id=${id}`)

    return data
  },
  ['remove_track_from_cache'],
)
