import Image from 'next/image'
import PropTypes from 'prop-types'
import React, { useState } from 'react'

import useIsMobile from '../../hooks/useIsMobile'
import { Col, Row } from '../grid'
import QuotesLeftSection from './QuotesLeftSection'
import QuotesRightSection from './QuotesRightSection'
import styles from './styles/QuotesSection.module.scss'

const QuotesSection = ({ quotes }) => {
  // console.log(`QuotesSection teamMembersList: `, teamMembersList);
  // return null;
  const [isMobile, setIsMobile] = useState(false)

  useIsMobile(setIsMobile)

  return (
    <div className={styles.sectionContainer}>
      {quotes.length > 0 && !isMobile
        ? quotes.map((quote, index) => (
          <div key={index} className={styles.quoteMobile}>
            {index % 2 === 0 ? (
              <QuotesLeftSection {...quote} />
            ) : (
              <QuotesRightSection {...quote} />
            )}
          </div>
        ))
        : null}
      {quotes.length > 0 && isMobile
        ? quotes.map((quote, index) => (
          <div key={index} className={styles.quote}>
            <Row>
              <Col xs={6}>
                <div className={styles.iconQuotesCont}>
                  <div className={styles.iconQuotes}>
                    <Image
                      alt="Quote icon"
                      src="/images/quotes.png"
                      objectFit="contain"
                      layout="fill"
                    />
                  </div>
                </div>
              </Col>
              <Col xs={6}>
                <div className={styles.imageCont}>
                  <div className={styles.image}>
                    <Image
                      alt={quote.image.alt}
                      src={quote.image.url}
                      objectFit="cover"
                      layout="fill"
                    />
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <div className={styles.sentence}>
                  <span>{quote.sentence}</span>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <div className={styles.name}>
                  <span>{quote.name.toUpperCase()}</span>
                </div>
                <div className={styles.role}>
                  <span>{quote.role}</span>
                </div>
                <div className={styles.location}>
                  <span>{quote.location.toUpperCase()}</span>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <div className={styles.bottomLine} />
              </Col>
            </Row>
          </div>
        ))
        : null}
    </div>
  )
}

QuotesSection.propTypes = {
  quotes: PropTypes.arrayOf(
    PropTypes.shape({
      sentence: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      image: PropTypes.object
    })
  ).isRequired
}

export default QuotesSection
