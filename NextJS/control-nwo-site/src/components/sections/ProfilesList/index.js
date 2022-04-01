import React from 'react';
import cx from 'classnames';
import { Grid, Row, Col } from 'components/grid';
//  Styles
import styles from './ProfilesList.module.scss';
import ProfileCard from 'baseComponents/ProfileCard';
import Header from 'baseComponents/Header';

const ProfilesList = ({
  className,
  title,
  data,
  ...props
}) => {

  return (
    <div
      {...props}
      className={cx(styles.component, className)}
    >
      <Grid>
        <Row>
          <Col xs={12}>
            <div className={styles.title}>
              <Header tag="span" gradient>{ title }</Header>
            </div>
          </Col>
        </Row>
        <Row>
          {data.map((profile, index) => (
            <Col key={index} xs={12} sm={6} md={4} xl={3}>
              <ProfileCard key={index} profile={profile} />
            </Col>
          ))}
        </Row>
      </Grid>
    </div>
  );
}

export default ProfilesList;
