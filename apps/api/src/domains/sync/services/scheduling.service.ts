import { BindingScope, createBindingFromClass, inject } from '@loopback/core'
import { cronJob, CronJob } from '@loopback/cron'
import { SYNC_SERVICE } from '../keys'
import { SyncService } from './sync.service'

@cronJob()
export class SchedulingService extends CronJob {
  constructor(@inject(SYNC_SERVICE) private syncService: SyncService) {
    super({
      name: 'sync-scheduling',
      onTick: async () => {
        console.log('Syncing data...')
        await this.syncService.syncData()
      },
      cronTime: '38 2 * * *', // TODO: Change after testing
      start: true,
    })
  }
}

export const schedulingServiceBinding = createBindingFromClass(
  SchedulingService,
).inScope(BindingScope.SINGLETON)
