import { useContext, useEffect, useRef } from 'react'

import { ScrollProviderContext } from '../components/base/ScrollProvider'

function useIsMobile(callback) {
  const savedCallback = useRef()
  const scrollProvider = useContext(ScrollProviderContext)

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  const resize = (ev) => {
    savedCallback.current(ev.viewportWidth < 979)
  }

  useEffect(() => {
    scrollProvider.addResizeEventListener(resize)

    return () => {
      scrollProvider.removeResizeEventListener(resize)
    }
  }, [])
}

export default useIsMobile
