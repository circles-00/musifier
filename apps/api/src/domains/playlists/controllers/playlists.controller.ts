import { inject } from '@loopback/core'
import { api, get, param } from '@loopback/rest'
import { Playlist } from '../../../entities'
import { IRequestFilter, TFindRelations } from '../../../types'
import { PLAYLISTS_SERVICE } from '../keys'
import { PlaylistsService } from '../services'

@api({ basePath: '/playlists' })
export class PlaylistsController {
  constructor(
    @inject(PLAYLISTS_SERVICE)
    private readonly playlistsService: PlaylistsService,
  ) {}

  @get('/')
  async findPlaylists(
    @param.query.object('filter') filters: IRequestFilter,
    @param.query.object('relations') relations: TFindRelations<Playlist>,
  ) {
    return this.playlistsService.findPlaylists({ filters, relations })
  }

  @get('/{id}')
  async findPlaylistById(
    @param.path.number('id') id: number,
    @param.query.object('relations') relations: TFindRelations<Playlist>,
  ) {
    return this.playlistsService.findPlaylistById({ id, relations })
  }
}
