import React from 'react'
import cx from 'classnames'
import OptimizedImage from 'baseComponents/OptimizedImage'
import styles from './Logo.module.scss'

const Logo = ({className, image, width, height, alt}) => (
  <div className={cx(styles.wrapper, className)}>
    <OptimizedImage
          fluid
          alt={alt}
          height={height}
          image={image}
          width={width}
        />
  </div>
)

export default Logo