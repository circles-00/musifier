import { IInput } from '@/components'
import { FieldValues, Path } from 'react-hook-form'

export interface IFormInput<T extends FieldValues> extends IInput {
  name: Path<T>
}
