import { BindingKey } from '@loopback/core'
import { PlaylistsService } from './services'

export const PLAYLISTS_SERVICE =
  BindingKey.create<PlaylistsService>('services.playlists')
