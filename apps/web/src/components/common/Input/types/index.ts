import { InputHTMLAttributes } from 'react'

export interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  iconLeft?: JSX.Element
  iconRight?: JSX.Element
}
