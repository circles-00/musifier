import { mergeClassNames } from '@/utils'
import { ForwardedRef, forwardRef } from 'react'
import { IInput } from './types'

const InputComponent = (
  { className = '', iconLeft, iconRight, ...props }: IInput,
  ref: ForwardedRef<HTMLInputElement>,
) => (
  <div className="relative w-full">
    <input
      ref={ref}
      className={mergeClassNames(
        `text-black border border-gray-300 rounded-md ${
          iconLeft ? 'pl-10' : 'pl-2'
        } {iconRight ? 'pr-10': 'pr-2'} py-3 placeholder:font-bold w-full`,
        className,
      )}
      {...props}
    />
    {iconLeft && (
      <div className="absolute inset-y-0 left-0 flex items-center pl-2">
        {iconLeft}
      </div>
    )}
    {iconRight && (
      <div className="absolute inset-y-0 right-0 flex items-center pr-2">
        {iconRight}
      </div>
    )}
  </div>
)

export const Input = forwardRef(InputComponent)
