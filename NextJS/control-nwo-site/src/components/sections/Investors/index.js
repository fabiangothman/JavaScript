import React from 'react'
import cx from 'classnames'
import { Grid, Row, Col } from 'grid'
import SectionWrapper from 'baseComponents/SectionWrapper'
import Header from 'baseComponents/Header'
import OptimizedImage from 'baseComponents/OptimizedImage'
import Text from 'baseComponents/Text'
import styles from './Investors.module.scss'

const Investors = () => {

  return (
      <SectionWrapper className={styles.investors}>
        <Grid>
          <Row>
            <Col xs={12} lg={6} className={cx('last-xs', 'first-lg', styles.description)}>
              <Header tag="h3" gradient className={styles.header}>Our Investors</Header>
              <Text className={styles.description}>
                Since it's inception, NWO is backed by a diverse set of investors across North America, Asia and Europe.
              </Text>
            </Col>
            <Col xs={12} lg={6} className={cx('first-xs', 'last-lg', styles.logos)}>

              <div className={styles.logo}>
                <div className={styles.logoImage}>
                  <OptimizedImage
                    fluid
                    height={150}
                    image="investors/hyperplane.png"
                    width={621}
                  />
                </div>
              </div>
              <div className={styles.logo}>
                <div className={styles.logoImage}>
                  <OptimizedImage
                    fluid
                    height={240}
                    image="investors/colle.png"
                    width={348}
                  />
                </div>
              </div>
              <div className={styles.logo}>
                <div className={styles.logoImage}>
                  <OptimizedImage
                    className={styles.logoImg}
                    fluid
                    height={87}
                    image="investors/superangel.png"
                    width={558}
                  />
                </div>
              </div>
              <div className={styles.logo}>
                <div className={styles.logoImage}>
                  <OptimizedImage
                    fluid
                    height={165}
                    image="investors/adit.png"
                    width={489}
                  />
                </div>
              </div>
              <div className={styles.logo}>
                <div className={styles.logoImage}>
                  <OptimizedImage
                    fluid
                    height={165}
                    image="investors/sapio.png"
                    width={489}
                  />
                </div>
              </div>

            </Col>
          </Row>
        </Grid>
      </SectionWrapper>
  )
}

export default Investors
