import { BindingKey } from '@loopback/core'
import { TracksService } from './services'

export const TRACKS_SERVICE =
  BindingKey.create<TracksService>('services.tracks')
