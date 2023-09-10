import { structureFilterParams } from '@/utils'
import axios from 'axios'
import { ICommonResponse, IPagination } from '../types'
import { createApiHandler } from '../utils'
import { ICategory } from './types'

export const getCategoriesWithPlaylists = createApiHandler(
  async (params?: IPagination) => {
    const { data } = await axios.get<ICommonResponse<ICategory[]>>(
      '/server/categories',
      {
        params: {
          'relations[playlists]': true,
          ...structureFilterParams(params),
        },
      },
    )

    return data
  },
  (params?: IPagination) => ['get_categories_with_playlists', params],
)
