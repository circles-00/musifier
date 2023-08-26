import { BindingKey } from '@loopback/core'
import { SpotifyService } from './services'

export const SPOTIFY_SERVICE =
  BindingKey.create<SpotifyService>('service.spotify')
