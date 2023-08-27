import { BindingScope, createBindingFromClass, inject } from '@loopback/core'
import { cronJob, CronJob } from '@loopback/cron'
import { env } from '../../../utils'
import { SYNC_SERVICE } from '../keys'
import { SyncService } from './sync.service'

@cronJob()
export class SchedulingService extends CronJob {
  constructor(@inject(SYNC_SERVICE) private syncService: SyncService) {
    super({
      name: 'sync-scheduling',
      onTick: async () => {
        await this.syncService.syncData()
      },
      cronTime: env.SYNC_CRON_TIME,
      start: true,
    })
  }
}

export const schedulingServiceBinding = createBindingFromClass(
  SchedulingService,
).inScope(BindingScope.SINGLETON)
