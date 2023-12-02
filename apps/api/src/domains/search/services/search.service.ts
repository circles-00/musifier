import { inject } from '@loopback/core'
import { SpotifyService, SPOTIFY_SERVICE } from '../../spotify'
import { SyncService, SYNC_SERVICE } from '../../sync'
import { TSearchTypes } from '../types'

export class SearchService {
  constructor(
    @inject(SPOTIFY_SERVICE)
    private readonly spotifyService: SpotifyService,
    @inject(SYNC_SERVICE)
    private readonly syncService: SyncService,
  ) {}

  async search(query: string, type: TSearchTypes) {
    if (!query) {
      return []
    }

    const spotifyTracks = await this.spotifyService.search(query, type)

    return await this.syncService.syncTracks(spotifyTracks)
  }
}
