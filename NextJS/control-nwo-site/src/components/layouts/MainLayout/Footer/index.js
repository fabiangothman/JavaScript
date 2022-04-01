import React from 'react'
import Link from 'next/link'
import { Grid, Row, Col } from 'grid'
import Text from 'baseComponents/Text'
import Logo  from 'baseComponents/Logo'
import Menu from '../Menu'
import MENU_FOOTER from 'consts/MENU_FOOTER'

import styles from './Footer.module.scss'

const Footer = () => (
  <footer>
    <Grid className={styles.wide}>
      <Row className={styles.content}>
        <Col lg={8}>
          <div className={styles.logo}>
            <Link href="/" passHref>
              <a>
                <Logo image={'logo-invert.png'} width={531} height={162} alt="nwo"/>
              </a>
            </Link>
          </div>
        </Col>
        <Col lg={4}>
          <Menu items={MENU_FOOTER} className={styles.menu}/>
        </Col>
      </Row>
      <Row>
        <Col className={styles.credits}>
          <Text className={styles.creditsText}>2021 © nwo.ai.</Text>
        </Col>
      </Row>
    </Grid>
  </footer>
)

export default Footer
