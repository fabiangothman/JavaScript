import React, {forwardRef} from 'react'
import cx from 'classnames'
import styles from './Animation.module.scss'

const Animation = forwardRef(({ src, className }, ref) => {
  const style = cx(styles.animation,  className)

  return (
    <div className={styles.videoWrapper}>
      <video
        className={style}
        autoPlay
        loop
        muted
        playsInline
        key={`video-${src}`}
        ref={ref}
      >
        <source src={`/animations/${src}`} type="video/mp4" />
      </video>
    </div>
  )
})

export default Animation
