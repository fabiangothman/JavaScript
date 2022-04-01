import { ImageWrapper } from 'baseComponents/ImageWrapper'
import cx from 'classnames'
import React from 'react'

import styles from './HeroBackgroundImage.module.scss'

const HeroBackgroundImage = ({ background, backgroundMobileImage }) => {
  return (
    <>
      <span className={cx({ [styles.heroDesktopImage]: backgroundMobileImage })}>
        <ImageWrapper src={background.url} alt={background.title} layout="fill" />
      </span>
      {backgroundMobileImage && (
        <span className={styles.heroMobileImage}>
          <ImageWrapper
            src={backgroundMobileImage.url}
            alt={backgroundMobileImage.title}
            layout="fill"
          />
        </span>
      )}
    </>
  )
}

export default HeroBackgroundImage
