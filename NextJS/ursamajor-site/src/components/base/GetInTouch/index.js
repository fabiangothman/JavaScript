import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import { Col, Row } from '../../grid'
import styles from './GetInTouch.module.scss'

const GetInTouch = (props) => {
  const { headline, text, email } = props
  return (
    <div className={styles.getInTouch}>
      <Row centerXl className={styles.row}>
        <Col className={cx('no-pad', styles.col)} xs={12} lg={10}>
          <div className={styles.headline}>{headline}</div>
          <div className={styles.copy}>{text}</div>
          <div className={styles.email}>
            <a href={`mailto:${email}`}>{email}</a>
          </div>
        </Col>
      </Row>
    </div>
  )
}

GetInTouch.propTypes = {
  headline: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired
}

export default GetInTouch
