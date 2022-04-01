import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import cx from 'classnames'
import { Grid, Row, Col } from 'grid'
import Logo from 'baseComponents/Logo'
import Menu from '../Menu'
import useIsMobile from 'hooks/useIsMobile'
import ScrollLink from 'baseComponents/ScrollLink'
import Hamburger from 'baseComponents/Hamburger'
import Button from 'baseComponents/Button'
import MENU_MAIN from 'consts/MENU_MAIN'
import styles from './Header.module.scss'
import axios from 'axios'

const Header = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useIsMobile(updateIsMobile)

  function updateIsMobile(isMobile) {
    setIsMobile(isMobile)
  }

  const handleHamburgerClick = (ev) => {
    ev.preventDefault()
    toggleOpen()
  }

  const toggleOpen = (toggle) => {
    const newVal = typeof toggle === 'undefined' ? !menuOpen : toggle

    setMenuOpen(newVal)

    const changed = menuOpen !== toggle
    if (changed) {
      window.scrollTo(0, 0)
    }

    if (!isMobile) {
      window.document.body.classList.remove('no-scroll')
      return
    }

    if (newVal) {
      window.document.body.classList.add('no-scroll')
    } else {
      window.document.body.classList.remove('no-scroll')
    }
  }

  useEffect(() => {
    toggleOpen(false)
  }, [isMobile])

  useEffect(() => {
    async function checkUser() {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
          withCredentials: true,
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0',
          }
        })
        if (response?.data?.profile) {
          window.location.href = process.env.NEXT_PUBLIC_APP_URL
        }
      } catch (error) {
        // ignore error
      }
    }

    checkUser()
  }, [])

  return (
    <Grid className={styles.header}>
      <Row>
        <Col tagName="nav" xs={12}>
          <ul className={cx(styles.nav)}>
            <li className={styles.logoWrapper}>
              <Link href="/">
                <a className={styles.logoLink}>
                  <Logo image={'logo.png'} width={525} height={162} alt="nwo"/>
                </a>
              </Link>
            </li>
            <li className={cx(styles.menuWrapper, {[styles.menuOpen]: menuOpen})}>
              <div className={cx({[styles.menuOpenWrapper]: menuOpen})} onClick={handleHamburgerClick}>
                <Menu className={styles.menu} items={MENU_MAIN} onCLickLink={() => toggleOpen(false)}>
                  <li className={styles.loginButton}>
                    <Button color="blue" outlined rounded icon="dot" href={process.env.NEXT_PUBLIC_APP_URL}
                            onClick={(ev) => {
                              ev.stopPropagation();
                            }}>Enterprise Login</Button>
                  </li>
                  <li className={styles.requestButton}>
                    <ScrollLink href="/#request-demo" passHref>
                      <Button tag="a" color="blue" outlined rounded icon="dot" onClick={() => {
                        toggleOpen(false)
                      }}>Request demo</Button>
                    </ScrollLink>
                  </li>
                </Menu>
              </div>
            </li>
            {isMobile &&
            <li className={styles.hamburgerWrapper}><Hamburger onClick={handleHamburgerClick} open={menuOpen}/></li>}
          </ul>
        </Col>
      </Row>
    </Grid>
  )
}

export default Header
