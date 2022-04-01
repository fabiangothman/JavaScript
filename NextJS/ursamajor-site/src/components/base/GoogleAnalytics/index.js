import React, { useEffect } from 'react'
import ReactGA from 'react-ga'

let ga = null

const GoogleAnalytics = ({ trackingId }) => {
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

  return <></>
}

export default GoogleAnalytics
