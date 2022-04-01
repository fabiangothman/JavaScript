import React, { useRef } from 'react'
import cx from 'classnames'
import { Row, Col } from 'grid'
import InViewport from 'baseComponents/InViewport'
import Animation from 'baseComponents/Animation'
import styles from './ReversibleRow.module.scss'

const ReversibleRow = ({inverted = false, animation, className, children}) => {
  const ref = useRef()
  const videoRef = useRef(null);

  const onInView = () => {
    videoRef.current.play()
  }

  const onOutOfView = () => {
    videoRef.current.pause()
  }

  return (
    <InViewport track={ref} fullView={true} onInView={onInView} onOutOfView={onOutOfView}>
      <Row reverse={inverted} className={className} ref={ref}>
        <Col xs={12} lg={6} className={cx(styles.box, styles.boxAnimation)} >
          <Animation
            ref={videoRef}
            className={styles.animation}
            imageClassName={styles.animationImage}
            src={animation}
          />
        </Col>
        <Col xs={12} lg={6} className={cx(styles.box, styles.boxText)}>
          {children}
        </Col>
      </Row>    
    </InViewport>
  )
}

export default ReversibleRow
