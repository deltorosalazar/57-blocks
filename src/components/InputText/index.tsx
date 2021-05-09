import { FC, RefObject, InputHTMLAttributes, ReactNode } from 'react'
import styles from './styles.module.scss'
import cx from 'classnames'

type InputTextProps = ReactNode & InputHTMLAttributes<HTMLInputElement> & {
  error?: {
    message: string
  }
  label?: string,
  inputRef?: RefObject<HTMLInputElement> | ((instance: HTMLInputElement | null) => void) | null
}

export const InputText: FC<InputTextProps> = (props) => {
  const {
    error,
    id,
    name,
    label,
    placeholder,
    type = 'text',
  } = props

  return (
    <div
      className={cx(styles.inputText, props.className, {
        [styles.onError]: !!error
      })}
    >
      {label && (
        <label className={styles.label} htmlFor={id}>{label}</label>
      )}
      <input
        className={styles.input}
        id={id}
        name={name}
        placeholder={placeholder}
        type={type}
        ref={props.inputRef}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
      {error && (
        <span className={styles.error}>
          {error.message}
        </span>
      )}
    </div>
  )
}