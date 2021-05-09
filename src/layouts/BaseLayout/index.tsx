import { FC, ReactNode, useContext } from 'react'
import { BottomNavbar, Button, InputSearchable } from '@components'
import { AuthContext } from '@contexts'
import styles from './styles.module.scss'
import cx from 'classnames'

type BaseLayoutProps = ReactNode & {
  showSearchBox?: boolean
}

export const BaseLayout: FC<BaseLayoutProps> = (props) => {
  const { children, showSearchBox = true } = props
  const authContext = useContext(AuthContext)

  return (
    <div className={styles.baseLayout}>
      <div className={styles.baseLayoutWrapper}>
        <header className={styles.header}>
          {showSearchBox && <InputSearchable
            className={cx(styles.inputSearchable)}
            placeholder='Type to filter...'
          />}
        </header>
        <main className={styles.main}>
          {children}
        </main>
      </div>
      <BottomNavbar
        items={[
          {
            label: 'Pokemons',
            href: '/pokemons?page=1'
          },
          {
            label: 'Favorites',
            href: '/favorites'
          },
          {
            label: 'Logout',
            onClick: () => {
              authContext.logOut()
            }
          }
        ]}
      />
    </div>
  )
}
