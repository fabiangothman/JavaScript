import React from 'react'
import cx from 'classnames'
import styles from './Form.module.scss'

const Form = ({ className, children, ...rest }) => {
  const style = cx(styles.wrapper, className)
  if (!children || children.length === 0) {
    return null
  }
  return (
    <form className={style} {...rest}>
      {children}
    </form>
  )
}

export default Form
