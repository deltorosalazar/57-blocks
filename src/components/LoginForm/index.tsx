import React, { FC, ReactNode, useContext, useState } from 'react'
import LoginFormView from './LoginFormView'
import { FieldValues, useForm } from 'react-hook-form'
import { ComponentState } from '@enums'
import { AuthContext } from '@contexts'

type LoginFormProps = ReactNode

export const LoginForm: FC<LoginFormProps> = (props) => {
  const authContext = useContext(AuthContext)
  const { register, handleSubmit, formState: { errors } } = useForm()

  const [status, setStatus] = useState(ComponentState.Idle)

  const onSubmit = async (values: FieldValues) => {
    setStatus(ComponentState.Pending)

    setTimeout(async () => {
      await authContext.logIn(values.username, values.password)

      setStatus(ComponentState.Idle)
    }, 2000)
  }

  return (
    <LoginFormView
      errors={errors}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      status={status}
      {...props}
    />
  )
}
