import React, { useState } from 'react'
import cx from 'classnames'

import styles from './Hamburger.module.scss'

const Hamburger = ({onClick, open}) => (
  <div className={cx(styles.hamburgerItem, {[styles.open]: open} )}>
    <a href="#show-menu" onClick={onClick}>
      <span className={styles.bar1} />
      <span className={styles.bar2} />
      <span className={styles.bar3} />
    </a>
  </div>
)

export default Hamburger