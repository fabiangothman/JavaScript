import React from 'react'
import cx from 'classnames'
import styles from './Text.module.scss'

const Text = ({ children, className }) => {
  const style = cx(styles.description, className)
  if (!children || children.length === 0) {
    return null
  }
  return (
    <div className={style}>{children}</div>
  )
}

export default Text
