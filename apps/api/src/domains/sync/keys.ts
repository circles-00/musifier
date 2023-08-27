import { BindingKey } from '@loopback/core'
import { SyncService } from './services'

export const SYNC_SERVICE = BindingKey.create<SyncService>('service.sync')
