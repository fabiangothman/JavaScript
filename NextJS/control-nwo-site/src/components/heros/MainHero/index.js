import React, { useRef, useState } from 'react'
import InViewport from 'baseComponents/InViewport'
import useIsMobile from 'hooks/useIsMobile'
import Header from 'baseComponents/Header'
import Button from 'baseComponents/Button'
import Animation from 'baseComponents/Animation'
import ScrollLink from 'baseComponents/ScrollLink'
import Text from 'baseComponents/Text'
import VideoBackground from 'baseComponents/VideoBackground'
import animateScrollTo from 'animated-scroll-to'

import styles from './MainHero.module.scss'

const MainHero = () => {
  const ref = useRef()
  const videoRef = useRef();
  const [isMobile, setIsMobile] = useState(false)

  const updateIsMobile = (isMobile) => {
    setIsMobile(isMobile)
  }

  useIsMobile(updateIsMobile)

  const onInView = () => {
    videoRef.current.play()
  }

  const onOutOfView = () => {
    videoRef.current.pause()
  }

  const onCTAClick = (e) => {
    e.preventDefault()
    const element = document.getElementById(`request-demo`)
    animateScrollTo(element, {maxDuration: 1000})
  }

  return (
    <InViewport track={ref} fullView={true} onInView={onInView} onOutOfView={onOutOfView}>
      <div className={styles.mainHero} ref={ref}>
        <VideoBackground>
          <div className={styles.content}>
            <Header className={styles.header}>Identify microtrends<br /> before they become<br /> exponential</Header>
            <Text className={styles.description}>Leverage more than 93M Signals to anticipate and track global cultural shifts.</Text>
            <Button color="blue" outlined rounded icon="dot" onClick={onCTAClick}>Request demo</Button>
          </div>
          <div className={styles.backgroundAnimation}>
            <Animation
              className={styles.animation}
              imageClassName={styles.animationImage}
              src={isMobile ? 'main-mobile.mp4' : 'main-desktop.mp4' }
              ref={videoRef}
            />
          </div>
        </VideoBackground>
      </div>
    </InViewport>
  )
}

export default MainHero
