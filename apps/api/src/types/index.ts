import { FindOptionsRelations } from '@loopback/typeorm'

export interface IRequestFilter {
  pageSize: number
  page: number
}

export interface ICommonFindRequest<T> {
  filters: IRequestFilter
  relations?: TFindRelations<T>
}

export interface ICommonFindByIdRequest<T> {
  id: number
  relations?: TFindRelations<T>
}

export type TFindRelations<T> = FindOptionsRelations<T>
