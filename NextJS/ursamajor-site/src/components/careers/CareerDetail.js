import { IconLeftArrow } from 'baseComponents/Icons'
import cx from 'classnames'
import Link from 'next/link'
import PropTypes from 'prop-types'
import React from 'react'

import { LinkButton } from '../base/Button'
import { Col, Row } from '../grid'
import styles from './styles/CareerDetail.module.scss'

const CareerDetail = ({ posting }) => {
  const { description, additional, text, lists, categories, applyUrl } = posting
  const { location, department } = categories
  return (
    <div className={styles.sectionContainer}>
      <div className="large-container-with-left-pad">
        <Row className={cx('standard-pad', styles.fullWidth)}>
          <Col className={styles.linkCol} xs={12} lg={12}>
            <Link
              href={{
                pathname: '/careers',
                query: { team: categories.department || categories.team }
              }}
            >
              <a className={styles.goBack}>
                <IconLeftArrow />
                Back
              </a>
            </Link>
            <div>
              <Link
                href={{
                  pathname: '/careers',
                  query: { team: categories.department || categories.team }
                }}
              >
                <a className={styles.backLink}>Careers</a>
              </Link>
              <span>/</span>
              <p className={styles.backLink}>{department || 'Any'}</p>
            </div>
          </Col>
          <Col className={styles.titleCol} xs={12} lg={7}>
            <h1 className={styles.title}>{text}</h1>
            <div className={styles.locationArea}>
              <div className={styles.location}>{location}</div>
              <div className={styles.button}>
                <LinkButton styleType="quarnary" text="Apply Now" href={applyUrl} isExternal />
              </div>
            </div>
            <div className={styles.content}>
              <div
                className={styles.contentStart}
                dangerouslySetInnerHTML={{ __html: description }}
              />
              <div className={styles.contentEnd} dangerouslySetInnerHTML={{ __html: additional }} />

              {lists &&
                lists.map((l, i) => {
                  return (
                    <div key={`list-item-${i}`}>
                      <div className={styles.listHeading}>{l.text}</div>
                      <ul className={styles.list} dangerouslySetInnerHTML={{ __html: l.content }} />
                    </div>
                  )
                })}
              <div className={cx(styles.button)}>
                <LinkButton styleType="quarnary" text="Apply Now" href={applyUrl} isExternal />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

CareerDetail.propTypes = {
  posting: PropTypes.object.isRequired
}

export default CareerDetail
