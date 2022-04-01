import React from 'react'
import Link from 'next/link'
import cx from 'classnames'
import { Grid, Row, Col } from 'grid'
import SectionWrapper from 'baseComponents/SectionWrapper'
import Header from 'baseComponents/Header'
import OptimizedImage from 'baseComponents/OptimizedImage'
import Text from 'baseComponents/Text'
import Button from 'baseComponents/Button'

import styles from './Product.module.scss'

const Product = ({slug}) => {
  
  return (
    <SectionWrapper slug={slug}>
      <Grid fluid className={styles.description}>
        <Row>
          <Col xs={12} lg={6} className={cx('first-xs', 'last-lg', styles.imageContainer)}>
            <OptimizedImage
              fluid
              height={1959}
              image="product.png"
              width={1743}
            />
          </Col>
          <Col xs={12} lg={6} className={cx('first-lg', 'last-xs', styles.textContainer)}>
            <Header tag="h2" className={styles.header}>Product</Header>
            <Text className={styles.text}>
              Our predictive AI platform enables leading Fortune 500 companies and government agencies to anticipate and track global cultural shifts by aggregating, analyzing, and producing actionable reports on human-generated data.
            </Text>
            <Link href="/technology" passHref>
              <Button tag="a" color="blue" outlined rounded>Learn more</Button>
            </Link>
          </Col>
        </Row>    
      </Grid>
    </SectionWrapper>
  )
}

export default Product
