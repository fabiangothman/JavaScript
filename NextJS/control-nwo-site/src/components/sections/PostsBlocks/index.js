import React from 'react';
import cx from 'classnames';
import { Grid, Row, Col } from 'components/grid';
import PostCard from 'baseComponents/PostCard';
//  Styles
import styles from './PostsBlocks.module.scss';

const PostsBlocks = ({
  className,
  listText = "",
  posts = [],
  ...props
}) => {
  // console.log(`PostsBlocks title: `, title);
  // return null;

  // Order list by lastest post date
  posts.sort((a, b) => b.date - a.date);

  return (
    <div
      {...props}
      className={cx(styles.component, className)}
    >
      <Grid>
        <Row className={styles.postsBlocks}>
          {posts.map((post, index) => (
            <Col
              key={index}
              xs={12}
              lgOffset={index%2 === 0 ? 2 : 0}
              lg={4}
            >
              <PostCard
                className={styles.post}
                {...post}
                showInLine={false}
              />
            </Col>
          ))}
        </Row>
      </Grid>
    </div>
  );
}

export default PostsBlocks;
