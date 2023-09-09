import { IPlalylist } from '../../playlists'

export interface ICategory {
  id: number
  createdAt: string
  updatedAt: string
  name: string
  externalId: string
  icon: string
  playlists: IPlalylist[]
}
