export interface IPagination {
  pageParam?: number
  pageSize?: number
}

export interface IMetadata {
  previousPage: number | null
  currentPage: number
  nextPage: number
  pages: number
  records: number
}

export interface ICommonResponse<T> {
  data: T
  metaData: IMetadata
}
