import { ChangeEventHandler, FC, ReactNode } from 'react'
import styles from './styles.module.scss'
import cx from 'classnames'

type InputSearchableProps = ReactNode & {
  placeholder?: string
  onChange?: ChangeEventHandler
}

export const InputSearchable: FC<InputSearchableProps> = (props) => {
  const { className, onChange, placeholder } = props

  return (
    <div className={cx(styles.inputSearchable, className)}>
      <input
        className={styles.input}
        onChange={onChange}
        placeholder={placeholder}
        type="text"
      />
    </div>
  )
}
