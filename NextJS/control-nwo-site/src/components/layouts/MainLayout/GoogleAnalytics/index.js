import React, { useEffect } from 'react'
import ReactGA from 'react-ga'

let ga = null

export default ({ trackingId }) => {
  if (!trackingId) {
    return null
  }

  useEffect(() => {
    if (!ga) {
      ga = true
      ReactGA.initialize(trackingId)
    }
    ReactGA.set({ page: window.location.pathname })
    ReactGA.pageview(window.location.pathname)
  }, [])

  return (
    <></>
  )
}