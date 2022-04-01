import cx from 'classnames'
import Image from 'next/image'
import PropTypes from 'prop-types'
import React, { useState } from 'react'

import { Col, Row } from '../grid'
import styles from './styles/WorkSection.module.scss'

const WorkSection = ({ title, firstSentence, secondSentence, workerCategories }) => {
  // console.log(`WorkSection workerCategories: `, workerCategories);
  // return null;
  const [highlighted, setHighlighted] = useState(0)

  const handleChangeHighlighted = (index) => {
    setHighlighted(index)
  }

  return (
    <div className={styles.sectionContainer}>
      <div className={styles.viewPortCont}>
        <div className={styles.container}>
          <div className={styles.header}>
            <Row>
              <Col xs={6} lgOffset={2} lg={5}>
                <div className={styles.title}>{title}</div>
              </Col>
              <Col xs={6} lg={5}>
                <div className={styles.borderTopCont}>
                  <div className={styles.borderTop} />
                </div>
              </Col>
            </Row>
          </div>
          <div className={styles.dinamyContent}>
            <Row>
              <Col xs={12} lgOffset={2} lg={5}>
                <div className={styles.image}>
                  <Image
                    alt={workerCategories[highlighted].image.alt}
                    src={workerCategories[highlighted].image.url}
                    objectFit="cover"
                    layout="fill"
                  />
                  <div className={styles.overlay} />
                  <div className={styles.asterisk}>
                    <span>*</span>
                  </div>
                  {workerCategories[highlighted].listOfMembers.length > 0 ? (
                    <div className={styles.info}>
                      <div className={styles.memTitle}>
                        <span>PICTURED</span>
                      </div>
                      {workerCategories[highlighted].listOfMembers.map((member, index) => (
                        <div key={index} className={styles.member}>
                          <span>{member.toUpperCase()}</span>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              </Col>
              <Col xs={12} lg={5}>
                <div className={styles.list}>
                  {workerCategories.map((category, index) => (
                    <div
                      key={index}
                      className={cx(styles.category, highlighted === index ? styles.selected : '')}
                    >
                      <span
                        className={cx(
                          styles.nameAsterisk,
                          highlighted === index ? styles.visible : styles.hidden
                        )}
                      >
                        *{' '}
                      </span>
                      <span
                        onClick={() => handleChangeHighlighted(index)}
                        onMouseEnter={() => handleChangeHighlighted(index)}
                        className={styles.name}
                      >
                        {`${category.title.toUpperCase()}`}
                      </span>
                    </div>
                  ))}
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <div className={styles.contBackground}>
          <Row>
            <Col xs={10} lgOffset={2} lg={10}>
              <div className={styles.background}>
                <Image
                  alt="We are ursa major"
                  src="/images/we_are_ursa_major_text.png"
                  width={1046}
                  height={982}
                  layout="fixed"
                  className={styles.bgImage}
                />
              </div>
            </Col>
          </Row>
        </div>
        <div className={styles.bgImageMobile}>
          <Image
            alt={workerCategories[highlighted].image.alt}
            src={workerCategories[highlighted].image.url}
            objectFit="cover"
            layout="fill"
          />
          <div className={styles.overlay} />
        </div>
      </div>
      <Row>
        <Col xs={12} lgOffset={2} lg={5}>
          <div className={styles.sentence}>
            <span>{`${firstSentence.toUpperCase()}`}</span>
            <span> — </span>
            <span className={styles.white}>{`${secondSentence.toUpperCase()}`}</span>
          </div>
        </Col>
        <Col xs={12} lgOffset={2} lg={10}>
          <div className={styles.bottomLine} />
        </Col>
      </Row>
    </div>
  )
}

WorkSection.propTypes = {
  title: PropTypes.string.isRequired,
  firstSentence: PropTypes.string.isRequired,
  secondSentence: PropTypes.string.isRequired,
  workerCategories: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.object,
      title: PropTypes.string.isRequired,
      listOfMembers: PropTypes.arrayOf(PropTypes.string).isRequired
    })
  ).isRequired
}

export default WorkSection
