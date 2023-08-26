import { type DataSourceOptions } from '@loopback/typeorm'
import { Category } from '../entities'
import { env } from '../utils'

export const PostgresConnection: DataSourceOptions = {
  name: 'default',
  type: 'postgres',
  host: env.DATABASE_HOST,
  username: env.DATABASE_USERNAME,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
  port: env.DATABASE_PORT,
  entities: [Category],
  synchronize: true,
}
