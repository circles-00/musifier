import { BindingKey } from '@loopback/core'
import { CategoriesService } from './services'

export const CATEGORIES_SERVICE = BindingKey.create<CategoriesService>(
  'services.categories',
)
