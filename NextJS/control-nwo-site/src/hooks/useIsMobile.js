import React, { useState, useEffect, useRef, useContext } from 'react'
import { ScrollProviderContext } from 'baseComponents/ScrollProvider'

function useIsMobile(callback) {
  const savedCallback = useRef()
  const scrollProvider = useContext(ScrollProviderContext)

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  const resize = (ev) => {
    //savedCallback.current(ev.viewportWidth < 992);
    savedCallback.current(window.innerWidth < 992);
  }

  useEffect(() => {
    scrollProvider.addResizeEventListener(resize)

    return () => {
      scrollProvider.removeResizeEventListener(resize)
    }
  }, [])
}

export default useIsMobile