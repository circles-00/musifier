import { twMerge } from 'tw-merge'
import clsx from 'clsx'

export const mergeClassNames = (...classNames: string[]) =>
  twMerge(clsx(...classNames))
