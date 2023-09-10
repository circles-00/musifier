import { IPagination } from '@/services/data-service'

export const structureFilterParams = (params?: IPagination) => {
  const filterObject = {}

  if (params?.pageParam) {
    Object.assign(filterObject, { 'filter[page]': params.pageParam })
  }

  if (params?.pageSize) {
    Object.assign(filterObject, { 'filter[pageSize]': params.pageSize })
  }

  return filterObject
}
