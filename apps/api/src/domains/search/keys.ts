import { BindingKey } from '@loopback/core'
import { SearchService } from './services/search.service'

export const SEARCH_SERVICE =
  BindingKey.create<SearchService>('services.search')
