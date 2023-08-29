import { ICommonFindByIdRequest, ICommonFindRequest } from '../../../types'

export interface IFindPlaylistsPayload<T> extends ICommonFindRequest<T> {}

export interface IFindPlaylistByIdPayload<T>
  extends ICommonFindByIdRequest<T> {}
