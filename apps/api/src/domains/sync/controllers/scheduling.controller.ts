import { inject } from '@loopback/core'
import { api, get } from '@loopback/rest'
import { SYNC_SERVICE } from '../keys'
import { SyncService } from '../services'

@api({ basePath: '/scheduling' })
export class SchedulingController {
  constructor(@inject(SYNC_SERVICE) private syncService: SyncService) {}

  @get('/sync', {
    responses: {},
    'x-visibility': 'undocumented',
  })
  async sync() {
    this.syncService.syncData()
    return 'success'
  }
}
