import { FC, ReactNode } from 'react'
import { Card } from '@components'
import styles from './styles.module.scss'

export const CardLayout: FC<ReactNode> = (props) => {
  return (
    <div className={styles.cardLayout}>
      <Card>
        {props.children}
      </Card>
    </div>
  )
}
