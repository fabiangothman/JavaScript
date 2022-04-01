import cx from 'classnames'
import Link from 'next/link'
import PropTypes from 'prop-types'
import React from 'react'

import styles from './Buton.module.scss'

const LinkButton = (props) => {
  const { isExternal = false, href, title, styleType = 'primary', className, text } = props
  return isExternal ? (
    <a
      title={title}
      className={cx(styles.button, styles[styleType], className)}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {text}
    </a>
  ) : (
    <Link title={title} href={href}>
      <a title={title} className={cx(styles.button, styles[styleType], className)}>
        {text}
      </a>
    </Link>
  )
}

LinkButton.propTypes = {
  isExternal: PropTypes.bool,
  href: PropTypes.string.isRequired,
  title: PropTypes.string,
  styleType: PropTypes.string,
  className: PropTypes.string,
  text: PropTypes.string.isRequired
}

export { LinkButton }
