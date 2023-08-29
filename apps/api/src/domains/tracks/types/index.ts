import { ICommonFindByIdRequest, ICommonFindRequest } from '../../../types'

export interface IFindTracksPayload<T> extends ICommonFindRequest<T> {}

export interface IFindTrackByIdPayload<T> extends ICommonFindByIdRequest<T> {}
