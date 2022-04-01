import React, {forwardRef} from 'react'
import cx from 'classnames'
import styles from './VideoBackground.module.scss'

const VideoBackground = ({ children, className }) => {
  const style = cx(styles.container,  className)

  return (
    <div className={style}>
      {children}
      <video
        className={styles.video} 
        autoPlay
        loop
        muted
        playsInline
        key={`video-hack`}
      >
        <source src={`/animations/hack.mp4`} type="video/mp4" />
      </video>
    </div>
  )
}

export default VideoBackground
