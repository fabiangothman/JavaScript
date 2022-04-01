import React from 'react'
import cx from 'classnames'
import OptimizedImage from 'baseComponents/OptimizedImage'
import Header from 'baseComponents/Header'
import Text from 'baseComponents/Text'
import styles from './TeamMember.module.scss'

const TeamMember = ({image, imageWidth, imageHeight, name, caption, description, className}) => {
  
  return (
    <div className={cx(styles.person, className)}>
      <div className={styles.imageWrapper}>
        <OptimizedImage
          fluid
          height={imageHeight}
          image={`team/${image}`}
          width={imageWidth}
        />
      </div>
      <Header tag="h4" className={styles.caption}>{caption}</Header>
      <Header tag="h3" className={styles.name}>{name}</Header>
      <Text className={styles.description}>{description}</Text>
    </div>
  )
}

export default TeamMember
