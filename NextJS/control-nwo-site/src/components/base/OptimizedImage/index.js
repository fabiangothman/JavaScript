import React from 'react'
import Image from '../Image'
import FluidContainer from '../FluidContainer'

function OptimizedImage ({ className, imageClassName, image, alt = '', fluid, width, height }) {

  const defImg = require(`../../../assets/images/${image}`)

  return (
    <FluidContainer className={className} width={width} height={height}>
      <Image
        imageClassName={imageClassName}
        alt={alt}
        image={defImg}
        fluid={fluid}
      />
    </FluidContainer>
  )
}

export default OptimizedImage
