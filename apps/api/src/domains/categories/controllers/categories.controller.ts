import { inject } from '@loopback/core'
import { api, get } from '@loopback/rest'
import { SyncService } from '../../sync'
import { SYNC_SERVICE } from '../../sync/keys'

@api({ basePath: '/api/categories' })
export class CategoriesController {
  constructor(
    @inject(SYNC_SERVICE) private readonly syncService: SyncService,
  ) {}

  @get('/')
  async findCategories() {
    //TODO: Implement this method
    return this.syncService.syncData()
  }
}
