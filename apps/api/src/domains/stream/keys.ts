import { BindingKey } from '@loopback/core'
import { StreamService } from './services'

export const STREAM_SERVICE = BindingKey.create<StreamService>('stream.service')
