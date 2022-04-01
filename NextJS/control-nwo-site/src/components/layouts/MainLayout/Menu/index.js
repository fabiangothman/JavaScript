import React from 'react'
import cx from 'classnames'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from './Menu.module.scss'
import ScrollLink from 'baseComponents/ScrollLink'

const renderMenuItem = (menuItem, index, onCLickLink) => {
  const router = useRouter()
  const { pathname } = router
  
  return (
    <li key={`menu-entry-${index}`}>
      <ScrollLink href={menuItem.url} passHref>
      {/* <Link href={menuItem.url}> */}
        <a className={cx(styles.link, { 'active' : pathname === menuItem.url} )} onClick={onCLickLink}>
          {menuItem.label}
        </a>
      {/* </Link> */}
      </ScrollLink>
    </li>
  )
}

const Menu = ({ items, className, children }) => {
  return (
    <ul className={cx(styles.menu, className)}>
      {items.map((menuItem, index) => renderMenuItem(menuItem, index))}
      {children}
    </ul>
  )
}

export default Menu
