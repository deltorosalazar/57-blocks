import {
  DeepMap,
  FieldError,
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form'

export type FormProps = {
  errors: DeepMap<FieldValues, FieldError>
  handleSubmit: UseFormHandleSubmit<FieldValues>
  onSubmit: (values: FieldValues) => void
  register: any
}
