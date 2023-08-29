import { inject } from '@loopback/core'
import { api, get, param } from '@loopback/rest'
import { Track } from '../../../entities'
import { IRequestFilter, TFindRelations } from '../../../types'
import { TRACKS_SERVICE } from '../keys'
import { TracksService } from '../services'

@api({ basePath: '/tracks' })
export class TracksController {
  constructor(
    @inject(TRACKS_SERVICE)
    private readonly tracksService: TracksService,
  ) {}

  @get('/')
  async findTracks(
    @param.query.object('filter') filters: IRequestFilter,
    @param.query.object('relations') relations: TFindRelations<Track>,
  ) {
    return this.tracksService.findTracks({ filters, relations })
  }

  @get('/{id}')
  async findTrackById(
    @param.path.number('id') id: number,
    @param.query.object('relations') relations: TFindRelations<Track>,
  ) {
    return this.tracksService.findTrackById({ id, relations })
  }
}
