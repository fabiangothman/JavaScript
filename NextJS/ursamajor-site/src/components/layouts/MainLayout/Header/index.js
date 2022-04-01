import IconDisclaimerClose from 'baseComponents/Icons/IconDisclaimerClose'
import cx from 'classnames'
import MENU_MAIN from 'consts/MENU_MAIN'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import PRIVACY from '../../../../consts/PRIVACY'
import useIsMobile from '../../../../hooks/useIsMobile'
import {
  IconSmallLeftArrow,
  IconBear,
  IconClose,
  IconHamburger,
  IconSmallLogo,
  IconLogo
} from '../../../base/Icons'
import { Col, Row } from '../../../grid'
import styles from './Header.module.scss'

const Header = ({ isError, darkMode }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [cookieWarning, setCookieWarning] = useState(false)
  const [menuWithBackground, setMenuWithBackground] = useState(false)
  const router = useRouter()
  const { asPath } = router

  const updateIsMobile = (isMobile) => {
    setIsMobile(isMobile)
  }

  const scrollHandler = () => {
    setMenuWithBackground(window.scrollY > 300)
  }

  useEffect(() => {
    if (!isMobile) {
      return
    }

    window.addEventListener('scroll', scrollHandler)
    return () => window.removeEventListener('scroll', scrollHandler)
  }, [isMobile])

  useEffect(() => {
    const checkCookieWarning = async () => {
      const test = await window.localStorage.getItem('UM_COOKIE_WARNING_DISMISSED')
      setCookieWarning(test !== 'true')
    }

    checkCookieWarning()
  }, [])

  function handleCookieWarningClose(ev) {
    ev.preventDefault()

    setCookieWarning(false)
    window.localStorage.setItem('UM_COOKIE_WARNING_DISMISSED', 'true')
  }

  useIsMobile(updateIsMobile)

  useEffect(() => {
    if (menuOpen && !isMobile) {
      setMenuOpen(false)
    }

    if (menuOpen) {
      window.document.body.classList.add('no-scroll')
      return
    }
    window.document.body.classList.remove('no-scroll')
  }, [menuOpen])

  return (
    <header
      className={cx(styles.header, {
        [styles.fixed]: menuOpen && isMobile,
        [styles.darkMode]: darkMode
      })}
    >
      <div className="large-container-with-left-pad">
        <Row className={styles.row}>
          <Col xs={12} xl={4} className={cx(styles.logoCol, 'no-pad')}>
            <div className={styles.logo}>
              <Link title="Home" href="/">
                <a>
                  <IconLogo fill={darkMode && !menuOpen ? '#3D3D3D' : '#FFF'} />
                </a>
              </Link>
            </div>
          </Col>
          <Col
            xs={12}
            xl={8}
            className={cx(
              'no-pad',
              cx(styles.cookieInfo, { [styles.cookieInfoWithMenuOpened]: menuOpen })
            )}
          >
            {cookieWarning && (
              <div className={styles.cookieDisclaimer}>
                <div className={styles.cookieText}>{PRIVACY.cookieWarning.text}</div>
                {!isMobile ? (
                  <div className={styles.btns}>
                    <span className={styles.learnMore}>
                      <Link href={PRIVACY.privacyLink.url}>
                        <a target="_blank" className={styles.link}>
                          {PRIVACY.cookieWarning.learnMore}
                        </a>
                      </Link>
                    </span>
                    <IconSmallLeftArrow />
                    <span className={styles.dismiss} onClick={(e) => handleCookieWarningClose(e)}>
                      {PRIVACY.cookieWarning.dismiss}
                    </span>
                  </div>
                ) : (
                  <div className={styles.btns}>
                    <span className={styles.learnMore}>
                      <Link href={PRIVACY.privacyLink.url}>
                        <a className={styles.link}>{PRIVACY.cookieWarning.learnMore}</a>
                      </Link>
                      <IconSmallLeftArrow />
                    </span>
                    <span className={styles.dismiss} onClick={(e) => handleCookieWarningClose(e)}>
                      <IconDisclaimerClose />
                    </span>
                  </div>
                )}
              </div>
            )}
          </Col>
          <Col className={cx(styles.btnCol, 'no-pad')}>
            <div
              className={cx(styles.hamburger, {
                [styles.hamburgerWithBackground]: menuWithBackground
              })}
            >
              <button tabIndex={0} onClick={() => setMenuOpen(!menuOpen)} className={styles.btn}>
                {menuOpen ? (
                  <div className={styles.closeIcon}>
                    <IconClose />
                  </div>
                ) : (
                  <div className={styles.hamburgerIcon}>
                    <IconHamburger fill={darkMode ? '#3D3D3D' : '#FFF'} />
                  </div>
                )}
              </button>
            </div>
            <div
              className={cx(styles.smallerLogo, {
                [styles.smallerLogoVisible]: menuWithBackground && !menuOpen
              })}
            >
              <Link href="/" passHref>
                <a>
                  <IconSmallLogo width={40} height={24} />
                </a>
              </Link>
            </div>
          </Col>
        </Row>
        {isMobile && (
          <Row className={styles.removeMargin}>
            <Col xs={12}>
              <div className={cx(styles.menuMobile, menuOpen ? styles.mob : styles.desk)}>
                <nav className={cx(styles.navCol, 'no-pad', !menuOpen ? styles.hidden : '')}>
                  <ul>
                    {MENU_MAIN.map((item, index) => {
                      const isActive = !isError && asPath === item.url ? styles.active : ''
                      return (
                        <li key={`header-entry-${index}`}>
                          <Link href={item.url}>
                            <a className={cx(styles.link, isActive)}>{item.label}</a>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </nav>
                <div className={styles.bearIcon}>
                  <div className={styles.bearContainer}>
                    <IconBear fill="#fc4c21" />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        )}
      </div>
    </header>
  )
}

export default Header
