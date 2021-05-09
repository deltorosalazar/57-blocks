import { FC, MouseEventHandler, ReactNode } from 'react'
import styles from './styles.module.scss'

type ButtonProps = ReactNode & {
  disabled?: boolean
  label: string,
  type?: 'button' | 'submit'
  onClick: MouseEventHandler
}

export const Button: FC<ButtonProps> = (props) => {
  const {
    disabled,
    label,
    onClick,
    type = 'button'
  } = props

  return (
    <button
      className={styles.button}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {label}
    </button>
  )
}
