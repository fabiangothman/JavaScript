import React, { useRef } from 'react'
import InViewport from '../InViewport'

function SectionWrapper ({ children, className, slug, onInViewport }) {
  const ref = useRef()

  function onInView () {
    if(onInViewport) onInViewport()
  }

  return (
    <InViewport track={ref} onInView={onInView} fullView={false}>
      <section ref={ref} className={className} id={slug ? `${slug}` : null}>
        {children}
      </section>
    </InViewport>
  )
}

export default SectionWrapper
