import React from 'react';
import cx from 'classnames';
import { Grid, Row, Col } from 'components/grid';
import PostCard from 'baseComponents/PostCard';
//  Styles
import styles from './PostsList.module.scss';

const PostsList = ({
  className,
  listText = "",
  posts = [],
  ...props
}) => {
  // console.log(`PostsList title: `, title);
  // return null;

  // Order list by lastest post date
  posts.sort((a, b) => b.date - a.date);

  return (
    <div
      {...props}
      className={cx(styles.component, className)}
    >
      <Grid>
        <Row>
          <Col xs={12} lgOffset={2} lg={8}>
            <div className={styles.title}>
              <span>{ listText }</span>
            </div>
          </Col>
        </Row>
        <Row className={styles.postsList}>
          {posts.map((post, index) => (
            <Col
              key={index}
              xs={12}
              lgOffset={2}
              lg={8}
            >
              <PostCard
                className={styles.post}
                {...post}
                showInLine={true}
              />
            </Col>
          ))}
        </Row>
      </Grid>
    </div>
  );
}

export default PostsList;
