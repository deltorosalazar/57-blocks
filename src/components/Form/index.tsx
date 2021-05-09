import {
  Children,
  cloneElement,
  FormHTMLAttributes,
  FC,
  isValidElement,
  ReactNode
} from 'react'
import styles from './styles.module.scss'

type FormProps = ReactNode & FormHTMLAttributes<HTMLFormElement>

export const Form: FC<FormProps> = (props) => {
  const { children, onSubmit } = props

  return (
    <form
      className={styles.form}
      onSubmit={onSubmit}
    >
      {
        Children.map(children, (child: ReactNode) => {
          if (isValidElement(child)) {
            return cloneElement(child, { className: styles.field });
          }

          return child;
        })
      }
    </form>
  )
}
