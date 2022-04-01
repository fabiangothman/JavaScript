import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import animateScrollTo from 'animated-scroll-to'

const ScrollLink = ({ href, children }) => {
  let as = href
  let url = href

  const linkClicked =  (e) => {
    e.preventDefault()

    if (location.pathname.replace(/\/$/, "") === href.split('#')[0]) {
      const element = document.getElementById(`${href.split('#')[1]}`)
      window.scrollTo(scrollX, scrollY);
    if (!element) return animateScrollTo(0, {maxDuration: 1000})
      return animateScrollTo(element, {maxDuration: 1000})
    } else {
      Router.push(href, as).then(() => {
        const element = document.getElementById(`${href.split('#')[1]}`)
        window.scrollTo(scrollX, scrollY);
        if (!element) return window.scrollTo(0, 0)
        return animateScrollTo(element, {maxDuration: 1000})
        })
    }
  }

  const childClone = React.cloneElement(children, {
    onClick: (ev) => {
      if(children.props.target === " _blank") linkClicked(ev);
      if (children.props.onClick) children.props.onClick();
    }
  })

  return (
    <Link href={url} as={as}>
      {childClone}
    </Link>
  )
}

export default ScrollLink
