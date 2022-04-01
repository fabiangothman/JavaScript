import React from 'react'
import Text from 'baseComponents/Text'
import styles from './CookieWarning.module.scss'

export default ({ onClose }) => {
  return (
    <div className={styles.wrapper}>
      <Text>
        We use cookies to understand how to improve your experience on this website.
        Please read our privacy policy to which you consent by using our website.
      </Text>
      <a className={styles.close} href="#close" onClick={onClose}>&times;</a>
    </div>
  )
}