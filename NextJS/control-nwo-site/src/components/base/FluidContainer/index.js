import React from 'react'
import cx from 'classnames'
import styles from './FluidContainer.module.scss'

const FluidContainer = ({ width, height, ratio, children, className }) => {
  const paddingRatio = (width && height) ? height / width : ratio

  const style = cx(styles.wrapper, className)

  return (
    <div className={style} style={{ paddingTop: `${Math.round(paddingRatio * 10000) / 100}%` }}>
      <div className={styles.inside}>{children}</div>
    </div>
  )
}

export default FluidContainer
