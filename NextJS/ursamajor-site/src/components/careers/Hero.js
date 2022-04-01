import Gradient from 'baseComponents/Gradient'
import HeroBackgroundImage from 'baseComponents/HeroBackgroundImage'
import { IconOpeningQuotes, IconClosingQuotes, IconBear } from 'baseComponents/Icons'
import cx from 'classnames'
import React from 'react'

import styles from './styles/Hero.module.scss'

const Hero = ({ title, subtitle, backgroundMobileImage, background }) => {
  return (
    <div className={cx(styles.hero, 'linearGradient')}>
      <div className="image-container">
        <HeroBackgroundImage
          backgroundMobileImage={backgroundMobileImage}
          background={background}
        />
      </div>
      <div className="content-container">
        <div className="large-container-with-left-pad">
          <h3 className={styles.title}>
            <div className={styles.titleLimited}>{title}</div>
            <div className={styles.subtitle}>
              <div className={styles.openingQuotes}>
                <IconOpeningQuotes />
              </div>
              <div className={styles.subtitleLimited}>{subtitle}</div>
              <div className={styles.closingQuotes}>
                <IconClosingQuotes />
              </div>
            </div>
          </h3>
          <div className={styles.mobileIconBear}>
            <IconBear width="36" height="24" fill={'#fff'} />
          </div>
        </div>
      </div>
      <Gradient />
    </div>
  )
}

export default Hero
