import React from 'react'
import Text from 'baseComponents/Text'
import Header from 'baseComponents/Header'
import styles from './SliderArticle.module.scss'

const SliderArticle = ({ title, text, caption, index, count}) => {
  
  return (
    <div className={styles.article}>
      <div className={styles.counter}>
        {index}/{count}
      </div>
      <Header tag="h2" className={styles.header}>{title}</Header>
      <Text className={styles.text}>
        {text}
      </Text>
      <Text className={styles.caption}>
        {caption}
      </Text>        
    </div>
  )
}

export default SliderArticle
