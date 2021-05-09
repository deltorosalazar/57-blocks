import { FC, MouseEventHandler, ReactNode } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import styles from './styles.module.scss'
import cx from 'classnames'

type BottomNavbarProps = ReactNode & {
  items: Array<{
    label: string,
    href?: string,
    onClick?: MouseEventHandler
  }>
}

export const BottomNavbar: FC<BottomNavbarProps> = (props) => {
  const { items = [] } = props

  return (
    <div className={styles.bottomNavbar}>
      {items.map((item, index) => {
        return (
          <NavItem item={item} key={index} />
        )
      })}
    </div>
  )
}

const NavItem = ({ item }) => {
  const { asPath } = useRouter()

  const isItemActive = (href: string): boolean => {
    return asPath.includes(href)
  }

  const BaseElement = ({ item }) => {
    return (
      <div
        className={cx(styles.tab, {
          [styles.active]: isItemActive(item.href)
        })}
        onClick={(e) => item.onClick && item.onClick(e)}
      >
        {item.label}
      </div>
    )
  }

  if (item.href) {
    return (
      <NextLink href={item.href}>
        <a className={styles.link}>
          <BaseElement item={item} />
        </a>
      </NextLink >
    )
  }

  return <BaseElement item={item} />
}
