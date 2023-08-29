import { BindingKey } from '@loopback/core'
import { DatabaseUtilsService } from './services'

export const DATABASE_UTILS_SERVICE = BindingKey.create<DatabaseUtilsService>(
  'services.database.utils',
)
