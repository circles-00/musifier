import { inject } from '@loopback/core'
import { Repository, typeorm } from '@loopback/typeorm'
import { Category } from '../../../entities'
import {
  DatabaseUtilsService,
  DATABASE_UTILS_SERVICE,
} from '../../database-utils'
import { IFindCategoriesPayload, IFindCategoryByIdPayload } from '../types'

export class CategoriesService {
  constructor(
    @typeorm.repository(Category)
    private readonly categoriesRepository: Repository<Category>,
    @inject(DATABASE_UTILS_SERVICE)
    private readonly databaseUtilsService: DatabaseUtilsService,
  ) {}

  async findCategories({
    filters,
    relations,
  }: IFindCategoriesPayload<Category>) {
    return this.databaseUtilsService.paginateAndSort<Category>({
      ...filters,
      repository: this.categoriesRepository,
      relations,
    })
  }

  async findCategoryById({
    id,
    relations,
  }: IFindCategoryByIdPayload<Category>) {
    return this.databaseUtilsService.findOneWithRelations<Category>({
      repository: this.categoriesRepository,
      relations,
      where: { id },
    })
  }
}
