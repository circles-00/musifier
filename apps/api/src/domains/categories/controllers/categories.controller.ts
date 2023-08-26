import { api, get } from '@loopback/rest'
import { Repository, typeorm } from '@loopback/typeorm'
import { Category } from '../../../entities'

@api({ basePath: '/api/categories' })
export class CategoriesController {
  @typeorm.repository(Category)
  private categoryRepository: Repository<Category>

  @get('/')
  async findCategories() {
    return this.categoryRepository.find()
  }
}
