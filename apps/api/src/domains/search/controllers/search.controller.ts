import { inject } from '@loopback/core'
import { api, get, param } from '@loopback/rest'
import { SEARCH_SERVICE } from '../keys'
import { SearchService } from '../services'
import { TSearchTypes } from '../types'

@api({ basePath: 'search' })
export class SearchController {
  constructor(
    @inject(SEARCH_SERVICE)
    private readonly searchService: SearchService,
  ) {}

  @get('/')
  async search(
    @param.query.string('query') query: string,
    @param.query.string('type') type: TSearchTypes,
  ) {
    return this.searchService.search(query, type)
  }
}
