import axios from 'axios'
import { ITrack } from '../tracks'
import { createApiHandler } from '../utils'
import { ISearchParams } from './types'

export const search = createApiHandler(
  async (params: ISearchParams) => {
    const { data } = await axios.get<ITrack[]>('/server/search', { params })

    return data
  },
  (params: ISearchParams) => ['search', params],
)
