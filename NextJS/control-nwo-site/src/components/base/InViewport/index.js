import React from 'react'
import { ScrollProviderContext } from '../ScrollProvider'

class InViewport extends React.PureComponent {
  static contextType = ScrollProviderContext

  componentDidMount () {
    this.isInView = false
    this.context.addScrollEventListener(this.onScroll)
    this.context.addResizeEventListener(this.onResize)
  }

  componentWillUnmount () {
    this.context.removeScrollEventListener(this.onScroll)
    this.context.removeResizeEventListener(this.onResize)
  }

  onScroll = (scroll) => {
    const middle = scroll.scrollTop + scroll.viewportHeight / 2
    const fullView = this.props.fullView ? scroll.viewportHeight / 2 : 0
    const totalMargin = fullView + (this.props.margin || 0)

    const isInViewPort = middle + totalMargin >= this.boxTop && middle - totalMargin <= this.boxBottom

    if (isInViewPort && this.isInView === false) {
      this.isInView = true
      this.onInView()
    } else if (!isInViewPort && this.isInView === true) {
      this.onOutOfView()
      this.isInView = false
    }
  }

  onInView = () => {
    if (this.props.onInView) {
      this.props.onInView()
    }
  }

  onOutOfView = () => {
    if (this.props.onOutOfView) {
      this.props.onOutOfView()
    }
  }

  onResize = (event) => {
    this.updateValues(event.scrollTop)
    this.onScroll(event)
  }

  updateValues = (scrollTop) => {
    const trackEl = this.props.track.current
    const rect = trackEl.getBoundingClientRect()

    this.boxTop = rect.top + scrollTop
    this.boxBottom = this.boxTop + rect.height
  }

  render () {
    return (
      <>{this.props.children}</>
    )
  }
}

InViewport.defaultProps = {
  fullView: true
}


export default InViewport
