import Gradient from 'baseComponents/Gradient'
import { IconBear } from 'baseComponents/Icons'
import { ImageWrapper } from 'baseComponents/ImageWrapper'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import ReactPlayer from 'react-player/lazy'

import { Grid, Col, Row } from '../../grid'
import styles from './Hero.module.scss'

const Hero = (props) => {
  const { background, mobileBackground, title, subtitle, largeSub } = props

  return (
    <Grid fluid className={styles.wrapper}>
      <Row>
        <Col className="no-pad" xs={12} lg={12}>
          <div className={styles.heroContainer}>
            <div className={styles.imageContainer}>
              {background.contentType.includes('video') ? (
                <>
                  <div className="hero-desktop-image">
                    <ReactPlayer
                      playing={true}
                      muted={true}
                      autoPlay={true}
                      loop={true}
                      url={background.url}
                      playsinline
                    />
                  </div>
                  <div className="hero-mobile-image">
                    <ReactPlayer
                      playing={true}
                      muted={true}
                      autoPlay={true}
                      loop={true}
                      url={mobileBackground.url}
                      playsinline
                    />
                  </div>
                </>
              ) : (
                <ImageWrapper src={background.url} alt={background.title} layout="fill" />
              )}
            </div>
            <div className="large-container-with-left-pad">
              <div className={styles.textContainer}>
                <h1 className={cx(styles.title, { [styles.smallTitle]: largeSub })}>{title}</h1>
                {largeSub ? (
                  <h2 className={cx(styles.title, { [styles.smallTitle]: largeSub })}>
                    {subtitle}
                  </h2>
                ) : (
                  <p>{subtitle}</p>
                )}
              </div>
              <div className="mobileIconBear">
                <IconBear width="36" height="24" fill={'#fff'} />
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Gradient />
    </Grid>
  )
}

Hero.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  background: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    contentType: PropTypes.string
  })
}

export default Hero
