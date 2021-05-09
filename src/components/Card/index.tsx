import { FC, ReactNode } from 'react'
import styles from './styles.module.scss'
import cx from 'classnames'

export const Card: FC<ReactNode> = (props) => {
  const { children, className } = props

  return (
    <div className={cx(styles.card, className)}>
      {children}
    </div>
  )
}
