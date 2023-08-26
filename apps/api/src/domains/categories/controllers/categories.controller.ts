import { inject } from '@loopback/core'
import { api, get } from '@loopback/rest'
import { Repository, typeorm } from '@loopback/typeorm'
import { Category } from '../../../entities'
import { SpotifyService, SPOTIFY_SERVICE } from '../../spotify'

@api({ basePath: '/api/categories' })
export class CategoriesController {
  @typeorm.repository(Category)
  private categoryRepository: Repository<Category>

  constructor(
    @inject(SPOTIFY_SERVICE) private readonly spotifyService: SpotifyService,
  ) {}

  @get('/')
  async findCategories() {
    //TODO: Implement this method
    return this.spotifyService.getCategories()
  }
}
