import { Input } from '@/components'
import { FieldValues, useController, useFormContext } from 'react-hook-form'
import { IFormInput } from './types'

export const FormInput = <T extends FieldValues>({
  name,
  ...props
}: IFormInput<T>) => {
  const { control } = useFormContext<T>()
  const { field } = useController({ name, control })

  return <Input {...field} {...props} />
}
