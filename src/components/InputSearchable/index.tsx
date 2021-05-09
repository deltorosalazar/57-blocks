import { FC, ReactNode } from 'react'
import styles from './styles.module.scss'
import cx from 'classnames'

type InputSearchableProps = ReactNode & {
  placeholder?: string
}

export const InputSearchable: FC<InputSearchableProps> = (props) => {
  const { className, placeholder } = props

  return (
    <div className={cx(styles.inputSearchable, className)}>
      <input
        className={styles.input}
        placeholder={placeholder}
        type="text"
      />
    </div>
  )
}
