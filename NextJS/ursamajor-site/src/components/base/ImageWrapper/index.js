import Image from 'next/image'
import PropTypes from 'prop-types'
import React from 'react'

const ImageWrapper = (props) => {
  const { src, alt, height, width, layout, objectFit, lazyBoundary = '800px' } = props
  return (
    <Image
      src={src}
      alt={alt}
      layout={layout || ''}
      height={height || null}
      width={width || null}
      objectFit={objectFit || ''}
      lazyBoundary={lazyBoundary}
    />
  )
}

ImageWrapper.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
  layout: PropTypes.string,
  objectFit: PropTypes.string,
  lazyBoundary: PropTypes.string
}

export { ImageWrapper }
