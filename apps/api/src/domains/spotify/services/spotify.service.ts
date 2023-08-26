import { stringify } from 'querystring'
import { env } from '../../../utils'
import axios, { type AxiosError } from 'axios'
import {
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

  async getCategories(): Promise<Omit<ISpotifyCategory, 'icons'>[]> {
    return this.errorWrapper(async () => {
      const { data } = await axios.get(
        'https://api.spotify.com/v1/browse/categories',
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        },
      )
      const rawCategories: Omit<ISpotifyCategory, 'icon'>[] =
        data.categories.items

      return rawCategories.map(({ icons, ...rest }) => ({
        icon: icons?.[0],
        ...rest,
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
          image: images?.[0],
          tracks: tracks.total,
          name,
          description,
          href,
          id,
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

      const rawTracks: IRawSpotifyTrackItem[] = data.items

      return rawTracks.map(({ primary_color, track }) => ({
        primaryColor: primary_color,
        artist: track.artists.map(({ name }) => name).join(', '),
        duration: track.duration_ms,
        id: track.id,
        name: track.name,
        album: {
          id: track.album.id,
          name: track.album.name,
          releaseDate: track.album.release_date,
          image: track.album.images?.[0],
          tracks: track.album.total_tracks,
        },
      }))
    })
  }
}
