import React, { FC, ReactNode } from 'react'
import { Button, Form, InputText } from '@components'
import { ComponentState } from '@enums'
import { FormProps } from '@types'

type LoginFormProps = ReactNode & FormProps & {
  status?: ComponentState
}

const LoginFormView: FC<LoginFormProps> = (props) => {
  const {
    errors,
    handleSubmit,
    onSubmit,
    register,
    status
  } = props

  const username = register('username', {
    required: 'Please fill this field',
  })
  const password = register('password', { required: 'Please fill this field' })

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InputText
        error={errors['username']}
        id='username'
        name='username'
        label='Username'
        inputRef={username.ref}
        onChange={username.onChange}
        onBlur={username.onBlur}
      />
      <InputText
        error={errors['password']}
        id='password'
        inputRef={password.ref}
        label='Password'
        name='password'
        onChange={password.onChange}
        onBlur={password.onBlur}
        type='password'
      />

      {status === ComponentState.Pending ? (
        <p>Loading...</p>
      ) : (
        <Button
          label='Log in'
          type='submit'
        />
      )}
    </Form>
  )
}

export default LoginFormView
