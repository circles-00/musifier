import { ICommonFindByIdRequest, ICommonFindRequest } from '../../../types'

export interface IFindCategoriesPayload<T> extends ICommonFindRequest<T> {}

export interface IFindCategoryByIdPayload<T>
  extends ICommonFindByIdRequest<T> {}
