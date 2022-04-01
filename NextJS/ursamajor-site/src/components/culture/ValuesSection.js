import Image from 'next/image'
import PropTypes from 'prop-types'
import React from 'react'

import RichText from '../base/RichText'
import { Col, Row } from '../grid'
import styles from './styles/ValuesSection.module.scss'

const ValuesSection = ({ valuesTitle, valuesText, valuesImage, values }) => {
  // console.log(`ValuesSection values: `, values);
  // return null;

  return (
    <div className={styles.sectionContainer}>
      <Row>
        <Col lgOffset={2} lg={4}>
          <div className={styles.title}>
            <span>{valuesTitle.toUpperCase()}</span>
          </div>
        </Col>
        <Col lgOffset={1} lg={5}>
          <div className={styles.topLine} />
        </Col>
      </Row>
      <Row>
        <Col lgOffset={2} lg={4}>
          <RichText wrapperName={styles.text} content={valuesText} />
        </Col>
        <Col lgOffset={1} lg={5}>
          <div className={styles.image}>
            <Image alt={valuesImage.alt} src={valuesImage.url} objectFit="cover" layout="fill" />
          </div>
        </Col>
      </Row>
      {values.map((value, index) => (
        <div key={index} className={styles.value}>
          <Row>
            <Col lgOffset={2} lg={10}>
              <div className={styles.valueTopLine} />
            </Col>
            <Col lgOffset={2} lg={5}>
              <div className={styles.valueHeader}>
                <div className={styles.valueName}>
                  <span>{value.name.toUpperCase()}</span>
                </div>
                <div className={styles.valueImage}>
                  <Image
                    alt={value.logo.alt}
                    src={value.logo.url}
                    objectFit="contain"
                    layout="fill"
                  />
                </div>
              </div>
              <div className={styles.valueBottomLine} />
              <div className={styles.valueNumber}>
                <span>
                  {(index + 1).toLocaleString('en-US', {
                    minimumIntegerDigits: 2,
                    useGrouping: false
                  })}
                </span>
              </div>
            </Col>
            <Col lg={5}>
              <div className={styles.valueDetails}>
                {value.detailsList.map((detail, index) => (
                  <div key={index} className={styles.detail}>
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </div>
      ))}
    </div>
  )
}

ValuesSection.propTypes = {
  valuesTitle: PropTypes.string.isRequired,
  valuesText: PropTypes.object.isRequired,
  valuesImage: PropTypes.object.isRequired,
  values: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      logo: PropTypes.object.isRequired,
      detailsList: PropTypes.arrayOf(PropTypes.string).isRequired
    })
  ).isRequired
}

export default ValuesSection
