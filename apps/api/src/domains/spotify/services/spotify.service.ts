import { stringify } from 'querystring'
import { env } from '../../../utils'
import axios, { type AxiosError } from 'axios'
import {
  IRawSpotifyCategory,
  IRawSpotifyPlaylist,
  IRawSpotifyTrackItem,
  ISpotifyCategory,
  ISpotifyPlaylist,
  ISpotifyTrack,
} from './types'

export class SpotifyService {
  accessToken: string

  constructor() {
    this.storeAccessToken()
  }

  async getAccessToken() {
    const token = this.encodeStringToBase64(
      `${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`,
    )
    const response = await axios.post(
      `${env.SPOTIFY_AUTH_BASE_URL}`,
      stringify({ grant_type: 'client_credentials' }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: token,
        },
      },
    )

    return response.data.access_token
  }

  async storeAccessToken() {
    const accessToken = await this.getAccessToken()

    this.accessToken = accessToken
  }

  encodeStringToBase64(credentials: string) {
    if (Buffer.from(credentials).byteLength !== credentials.length)
      throw new Error('Bad credentials!')
    return `Basic ${Buffer.from(credentials).toString('base64')}`
  }

  async errorWrapper<T>(fn: () => Promise<T>): Promise<T> {
    try {
      return await fn()
    } catch (error) {
      const axiosError = error as AxiosError

      if (axiosError.response?.status === 404) {
        return [] as T
      }

      if (
        axiosError.response?.status === 401 ||
        axiosError.response?.status === 403
      ) {
        await this.storeAccessToken()
        return fn()
      }

      throw error
    }
  }

  async getCategories(): Promise<ISpotifyCategory[]> {
    return this.errorWrapper(async () => {
      const { data } = await axios.get(
        'https://api.spotify.com/v1/browse/categories',
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        },
      )
      const rawCategories: IRawSpotifyCategory[] = data.categories.items

      return rawCategories.map(({ icons, id, name }) => ({
        externalId: id,
        icon: icons?.[0]?.url,
        name,
      }))
    })
  }

  async getCategoryPlaylists(categoryId: string): Promise<ISpotifyPlaylist[]> {
    return this.errorWrapper(async () => {
      const { data } = await axios.get(
        `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists`,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        },
      )

      const rawPlaylist: IRawSpotifyPlaylist[] = data.playlists.items

      return rawPlaylist.map(
        ({ images, tracks, name, description, href, id, primary_color }) => ({
          image: images?.[0]?.url,
          tracks: tracks.total,
          name,
          description,
          href,
          externalId: id,
          primaryColor: primary_color,
        }),
      )
    })
  }

  async getPlaylistTracks(playlistId: string): Promise<ISpotifyTrack[]> {
    return this.errorWrapper(async () => {
      const { data } = await axios.get(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        },
      )

      const rawTracks: IRawSpotifyTrackItem[] = (
        data.items as IRawSpotifyTrackItem[]
      ).filter(({ track }) => !!track?.album?.id && !!track?.album?.name)

      return rawTracks.map(({ primary_color, track }) => ({
        primaryColor: primary_color,
        artists: track?.artists.map(({ id, name }) => ({
          externalId: id,
          name,
        })),
        duration: track?.duration_ms,
        externalId: track?.id,
        name: track?.name,
        album: {
          externalId: track?.album?.id,
          name: track?.album?.name,
          releaseDate: track?.album?.release_date,
          image: track?.album.images?.[0]?.url,
          tracks: track?.album?.total_tracks,
        },
      }))
    })
  }
}
