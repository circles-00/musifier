import { inject } from '@loopback/core'
import { Repository, typeorm } from '@loopback/typeorm'
import { Playlist } from '../../../entities'
import {
  DatabaseUtilsService,
  DATABASE_UTILS_SERVICE,
} from '../../database-utils'
import { IFindPlaylistByIdPayload, IFindPlaylistsPayload } from '../types'

export class PlaylistsService {
  constructor(
    @typeorm.repository(Playlist)
    private readonly playlistsRepository: Repository<Playlist>,
    @inject(DATABASE_UTILS_SERVICE)
    private readonly databaseUtilsService: DatabaseUtilsService,
  ) {}

  async findPlaylists({ filters, relations }: IFindPlaylistsPayload<Playlist>) {
    return this.databaseUtilsService.paginateAndSort<Playlist>({
      repository: this.playlistsRepository,
      relations,
      ...filters,
    })
  }

  async findPlaylistById({
    id,
    relations,
  }: IFindPlaylistByIdPayload<Playlist>) {
    return this.databaseUtilsService.findOneWithRelations<Playlist>({
      repository: this.playlistsRepository,
      relations,
      where: { id },
    })
  }
}
