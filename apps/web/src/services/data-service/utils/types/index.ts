// NOTE: we need any here for typescript to properly infer types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TFunction<TArgs = any, TResult = any> = (
  ...args: TArgs[]
) => TResult
