import React, { forwardRef } from 'react'
import { Grid, Row, Col } from 'grid'
import Text from 'baseComponents/Text'
import OptimizedImage from 'baseComponents/OptimizedImage'
import Button from 'baseComponents/Button'
import styles from './Post.module.scss'

const Post = forwardRef(({url, title, image, width, height, index, count}, ref) => {
  
  return (
    <Grid fluid className={styles.post}>
      <Row>
      <Col xs={12} xl={8} lg={7} className={styles.image} >
        <div ref={ref}>
          <OptimizedImage
            fluid
            height={height}
            image={`blog/${image}`}
            width={width}
          />
        </div>
      </Col>

      <Col xs={12} xl={4} lg={5}  className={styles.description}>
        <div className={styles.counter}>
          {index}/{count}
        </div>
        <Text className={styles.title}>
          {title}
        </Text>
        <div className={styles.readMore}>
          <Button tag="a" href={url} icon="arrow-right">Read More</Button>
        </div>
      </Col>
      </Row>
    </Grid>
  )
})

export default Post
