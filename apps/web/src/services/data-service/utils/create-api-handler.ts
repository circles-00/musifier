import { TFunction } from './types'

export const createApiHandler = <
  T extends TFunction,
  Q extends TFunction | unknown[],
>(
  handler: T,
  queryKey: Q,
) => Object.assign(handler, { queryKey })
