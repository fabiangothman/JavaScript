import React from 'react';
import RichText, { RichTextTypes } from '~baseComponents/RichText';
import { Grid, Row, Col } from '~grid';
import styles from './NotFound.module.scss';

function NotFound({ ...props }) {
  return (
    <Grid className={styles.component}>
      <Row>
        <Col xs={12} lgOffset={3}>
          <RichText content={props.content} />
        </Col>
      </Row>
    </Grid>
  );
}

export default NotFound;

NotFound.propTypes = {
  content: RichTextTypes.isRequired,
};
