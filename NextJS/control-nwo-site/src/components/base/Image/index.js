import React, { useState, useRef, useEffect } from 'react'
import cx from 'classnames'
import InViewport from '../InViewport'
import styles from './Image.module.scss'

const BREAKPOINTS = {
  xs: undefined,
  sm: '(min-width: 576px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 992px)',
  xl: '(min-width: 1200px)',
}

const Image = ({ className, imageClassName, image, alt, defaultSize, fluid }) => {
  if (!image) {
    return null
  }
  const imageRef = useRef()
  const pictureRef = useRef()
  const [loaded, setLoaded] = useState(false)
  const [visible, setVisible] = useState(false)

  const onLoad = () => {
    setLoaded(true)
  }

  useEffect(() => {
    if (imageRef.current && imageRef.current.complete) {
      setLoaded(true)
    }
  })

  const style = cx(
    styles.image,
    className,
    {
      [styles.fluid]: fluid,
      [styles.loaded]: loaded,
    }
  )

  const renderSources = () => {
    if (!visible) {
      return null
    }

  //   const sources = []
  //   const sizeKeys = Object.keys(image)
  //   for (let i = 0; i < sizeKeys.length; ++i) {
  //     const sizeKey = sizeKeys[i]
  //     const size = image[sizeKey]
  //     if (size.mimeTypes) {
  //       const mimeTypes = Object.keys(size.mimeTypes)
  //       for (let j = 0; j < mimeTypes.length; ++j) {
  //         const mimeType = mimeTypes[j]
  //         const srcSet = size.mimeTypes[mimeType]
  //         sources.push(<source key={`${sizeKey}-${mimeType}`} srcSet={srcSet} media={BREAKPOINTS[sizeKey]} type={mimeType} />)
  //       }
  //     }
  //   }

    return (
      <>
        {/*{sources}*/}
        {/*<img ref={imageRef} className={imageClassName} onLoad={onLoad} src={image[defaultSize].default} alt={alt || ''} />*/}
        <img ref={imageRef} className={imageClassName} onLoad={onLoad} src={image} alt={alt || ''} />
      </>
    )
  }

  return (
    <InViewport track={pictureRef} margin={400} onInView={() => { setVisible(true)}}>
      <picture ref={pictureRef} className={style}>
        {renderSources()}
      </picture>
    </InViewport>
  )
}

export default Image
