import { inject } from '@loopback/core'
import { Repository, typeorm } from '@loopback/typeorm'
import { Category, Playlist, Track } from '../../../entities'
import {
  ISpotifyCategory,
  ISpotifyPlaylist,
  ISpotifyTrack,
  SpotifyService,
  SPOTIFY_SERVICE,
} from '../../spotify'

export class SyncService {
  constructor(
    @inject(SPOTIFY_SERVICE) private readonly spotifyService: SpotifyService,
    @typeorm.repository(Category)
    private categoryRepository: Repository<Category>,
    @typeorm.repository(Playlist)
    private playlistRepository: Repository<Playlist>,
    @typeorm.repository(Track)
    private trackRepository: Repository<Track>,
  ) {}

  async sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  async rateLimitAvoidWrapper<T>(fn: () => T) {
    const data = await fn()
    await this.sleep(2000)

    return data
  }

  async constructTracks(tracks: ISpotifyTrack[]) {
    const tracksToSave = []
    for (const track of tracks) {
      const trackFromDb = await this.trackRepository.findOne({
        where: {
          externalId: track.externalId,
        },
      })
      tracksToSave.push({
        ...(!!trackFromDb && { id: trackFromDb?.id }),
        ...track,
      })
    }

    return tracksToSave
  }

  async constructPlaylists(playlists: ISpotifyPlaylist[]) {
    const playlistsToSave = []
    for (const playlist of playlists) {
      const playlistFromDb = await this.playlistRepository.findOne({
        where: {
          externalId: playlist.externalId,
        },
      })

      const tracks = await this.rateLimitAvoidWrapper(() =>
        this.spotifyService.getPlaylistTracks(playlist.externalId),
      )

      const tracksToSave = await this.constructTracks(tracks)
      playlistsToSave.push({
        ...(!!playlistFromDb && { id: playlistFromDb?.id }),
        tracksList: tracksToSave,
        ...playlist,
      })
    }

    return playlistsToSave
  }

  async constructCategories(category: ISpotifyCategory) {
    const categoryFromDb = await this.categoryRepository.findOne({
      where: {
        externalId: category.externalId,
      },
    })

    const playlists = await this.spotifyService.getCategoryPlaylists(
      category.externalId,
    )

    const playlistsToSave = await this.constructPlaylists(playlists)

    return {
      ...(!!categoryFromDb && { id: categoryFromDb?.id }),
      playlists: playlistsToSave,
      ...category,
    }
  }

  async syncData() {
    const categories = await this.spotifyService.getCategories()
    for (const category of categories) {
      const categoryToSave = await this.constructCategories(category)
      await this.categoryRepository.save(categoryToSave)
    }
  }

  async syncTracks(tracks: ISpotifyTrack[]) {
    const tracksToSave = await this.constructTracks(tracks)

    return await Promise.all(
      tracksToSave.map(async (track) => {
        const trackFromDb = await this.trackRepository.findOne({
          where: {
            externalId: track.externalId,
          },
          relations: ['artists', 'album'],
        })

        if (!trackFromDb) {
          return await this.trackRepository.save(track)
        }

        // TODO: Add more fields if needed
        trackFromDb.image = track.image

        return await this.trackRepository.save(trackFromDb)
      }),
    )
  }
}
