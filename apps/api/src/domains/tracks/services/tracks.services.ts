import { inject } from '@loopback/core'
import { Repository, typeorm } from '@loopback/typeorm'
import { Track } from '../../../entities'
import {
  DatabaseUtilsService,
  DATABASE_UTILS_SERVICE,
} from '../../database-utils'
import { IFindTrackByIdPayload, IFindTracksPayload } from '../types'

export class TracksService {
  constructor(
    @typeorm.repository(Track)
    private readonly tracksRepository: Repository<Track>,
    @inject(DATABASE_UTILS_SERVICE)
    private readonly databaseUtilsService: DatabaseUtilsService,
  ) {}

  async findTracks({ filters, relations }: IFindTracksPayload<Track>) {
    return this.databaseUtilsService.paginateAndSort<Track>({
      repository: this.tracksRepository,
      relations,
      ...filters,
    })
  }

  async findTrackById({ id, relations }: IFindTrackByIdPayload<Track>) {
    return this.databaseUtilsService.findOneWithRelations<Track>({
      repository: this.tracksRepository,
      relations,
      where: { id },
    })
  }
}
