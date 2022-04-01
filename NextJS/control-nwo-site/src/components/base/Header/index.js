import React from 'react'
import cx from 'classnames'
import styles from './Header.module.scss'

const Header = ({ children, className, tag, gradient = false, slug }) => {
  const style = cx(styles.header, {[styles.gradient]: gradient}, className)
  const Tag = tag || 'h1'
  
  if (!children || children.length === 0) {
    return null
  }
  
  return (
    <Tag className={style} id={slug ? `${slug}` : null}>{children}</Tag>
  )
}

export default Header
