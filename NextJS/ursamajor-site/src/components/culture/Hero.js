import Gradient from 'baseComponents/Gradient'
import HeroBackgroundImage from 'baseComponents/HeroBackgroundImage'
import { IconBear } from 'baseComponents/Icons'
import { Col, Row } from 'components/grid'
import PropTypes from 'prop-types'
import React from 'react'
import ReactPlayer from 'react-player/lazy'

import styles from './styles/Hero.module.scss'

const Hero = (props) => {
  const { background, title, backgroundMobileImage, subtitle } = props
  return (
    <Row>
      <Col className="no-pad" xs={12}>
        <div className={styles.heroContainer}>
          <div className={styles.imageContainer}>
            {background.contentType.includes('video') ? (
              <ReactPlayer
                playing={true}
                muted={true}
                autoPlay={true}
                loop={true}
                url={background.url}
                playsinline
              />
            ) : (
              <HeroBackgroundImage
                backgroundMobileImage={backgroundMobileImage}
                background={background}
              />
            )}
          </div>
          <div className={styles.textContainerr}>
            <div className="large-container-with-left-pad">
              <Row>
                <Col className="no-pad" xs={12}>
                  <h2 className={styles.title}>{title}</h2>
                  <p className={styles.text}>{subtitle}</p>
                  <div className={styles.mobileIconBear}>
                    <IconBear width="36" height="24" fill={'#fff'} />
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </Col>
      <Gradient />
    </Row>
  )
}

Hero.defaultProps = {
  subtitle: ''
}

Hero.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  background: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    contentType: PropTypes.string
  })
}

export default Hero
