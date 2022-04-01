import React from 'react';
import cx from 'classnames';
import { Grid, Row, Col } from 'components/grid';
import Header from 'baseComponents/Header';
//  Styles
import styles from './PostsHero.module.scss';

const PostsHero = ({
  className,
  title,
  ...props
}) => {
  // console.log(`PostsHero title: `, title);
  // return null;


  return (
    <div
      {...props}
      className={cx(styles.component, className)}
    >
      <Grid>
        <Row>
          <Col xs={12} lgOffset={2} lg={8}>
            <div className={styles.title}>
              <span>{ title }</span>
            </div>
          </Col>
        </Row>
      </Grid>
    </div>
  );
}

export default PostsHero;
