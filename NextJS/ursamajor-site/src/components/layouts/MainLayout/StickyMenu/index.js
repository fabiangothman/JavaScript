import cx from 'classnames'
import MENU_MAIN from 'consts/MENU_MAIN'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

import useIsMobile from '../../../../hooks/useIsMobile'
import { IconBear, IconSmallLogo } from '../../../base/Icons'
import styles from './StickyMenu.module.scss'

const StickyMenu = ({ isError }) => {
  const [isMobile, setIsMobile] = useState(false)
  const router = useRouter()
  const { asPath } = router

  const updateIsMobile = (isMobile) => {
    setIsMobile(isMobile)
  }

  useIsMobile(updateIsMobile)

  return (
    <div className={cx(styles.wrapper, styles.menu, isMobile ? styles.hidden : '')}>
      <div className={cx(styles.logoIcon)}>
        <div className={styles.smallLogo}>
          <Link title="Home" href="/">
            <a>
              <IconSmallLogo fill="#000" />
            </a>
          </Link>
        </div>
      </div>
      <nav>
        <ul>
          {MENU_MAIN.map((item, index) => {
            const isActive = !isError && asPath === item.url ? styles.active : ''
            return (
              <li key={`header-entry-${index}`}>
                <Link href={item.url}>
                  <a
                    className={cx(styles.link, isActive)}
                    target={item.label === 'Store' ? '_blank' : ''}
                  >
                    {item.label}
                  </a>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      <div className={styles.bearIcon}>
        <div className={styles.bearContainer}>
          <IconBear fill="#FFF" />
        </div>
      </div>
    </div>
  )
}

export default StickyMenu
