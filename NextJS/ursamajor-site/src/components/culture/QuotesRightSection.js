import { CloseQuote, OpenQuote } from 'baseComponents/Icons'
import Image from 'next/image'
import PropTypes from 'prop-types'
import React from 'react'

import { Col, Row } from '../grid'
import styles from './styles/QuotesRightSection.module.scss'

const QuotesRightSection = ({ sentence, name, role, location, image }) => {
  // console.log(`QuotesRightSection teamMembersList: `, teamMembersList);
  // return null;

  return (
    <div className={styles.sectionContainer}>
      <Row>
        <Col lgOffset={2} lg={3}>
          <div className={styles.imageCont}>
            <div className={styles.image}>
              <Image alt={image.alt} src={image.url} objectFit="cover" layout="fill" />
            </div>
          </div>
        </Col>
        <Col lgOffset={1} lg={6}>
          <Row className={styles.contLeft}>
            <Col lg={12} className={styles.noPad}>
              <div className={styles.iconOpenQuoteCont}>
                <div className={styles.iconOpenQuote}>
                  <OpenQuote width="100%" height="100%" />
                </div>
              </div>
            </Col>
            <Col lg={12} className={styles.noPad}>
              <div className={styles.sentence}>
                <span>“{sentence}”</span>
              </div>
            </Col>
            <Col lg={12} className={styles.noPad}>
              <Row>
                <Col lg={6} className={styles.noPad}>
                  <div className={styles.infoCont}>
                    <div className={styles.info}>
                      <div className={styles.name}>
                        <span>{name.toUpperCase()}</span>
                      </div>
                      <div className={styles.role}>
                        <span>{role}</span>
                      </div>
                      <div className={styles.location}>
                        <span>{location.toUpperCase()}</span>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col lgOffset={4} lg={2}>
                  <div className={styles.iconCloseQuoteCont}>
                    <div className={styles.iconCloseQuote}>
                      <CloseQuote width="100%" height="100%" />
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col lgOffset={2} lg={3}>
          <div className={styles.bottomLine} />
        </Col>
      </Row>
    </div>
  )
}

QuotesRightSection.propTypes = {
  sentence: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired
}

export default QuotesRightSection
