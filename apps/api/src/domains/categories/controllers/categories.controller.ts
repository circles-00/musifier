import { inject } from '@loopback/core'
import { api, get, param } from '@loopback/rest'
import { Category } from '../../../entities'
import { IRequestFilter, TFindRelations } from '../../../types'
import { CATEGORIES_SERVICE } from '../keys'
import { CategoriesService } from '../services'

@api({ basePath: '/categories' })
export class CategoriesController {
  constructor(
    @inject(CATEGORIES_SERVICE)
    private readonly categoriesService: CategoriesService,
  ) {}

  @get('/')
  async findCategories(
    @param.query.object('filter') filters: IRequestFilter,
    @param.query.object('relations') relations?: TFindRelations<Category>,
  ) {
    return this.categoriesService.findCategories({ filters, relations })
  }

  @get('/{id}')
  async findCategoryById(
    @param.path.number('id') id: number,
    @param.query.object('relations') relations?: TFindRelations<Category>,
  ) {
    return this.categoriesService.findCategoryById({ id, relations })
  }
}
