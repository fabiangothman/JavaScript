import React from 'react'
import cx from 'classnames'
import styles from './FormFeedback.module.scss'

const FormFeedback = ({ className, errors }) => {
  const style = cx(styles.wrapper, className)
  if (!errors) return null
  
  return (
    <div className={style}>
      <div className={styles.error}>{errors}</div>
    </div>
  )
}

export default FormFeedback
 