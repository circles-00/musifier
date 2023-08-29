import {
  FindOptionsRelations,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from '@loopback/typeorm'

export const orderByAllowedValues = ['asc', 'desc'] as const
export type TOrderBy = (typeof orderByAllowedValues)[number]

export interface IPaginateAndSortArgs<T extends ObjectLiteral> {
  repository: Repository<T>
  page?: number
  pageSize?: number
  order?: TOrderBy
  orderBy?: string
  where?: FindOptionsWhere<T>
  relations?: FindOptionsRelations<T>
}

export interface IFindOneWithRelationsArgs<T extends ObjectLiteral> {
  repository: Repository<T>
  where?: FindOptionsWhere<T>
  relations?: FindOptionsRelations<T>
}
