import React from 'react';
import cx from 'classnames';
import { Grid, Row, Col } from 'components/grid';
import EventCard from 'baseComponents/EventCard';
//  Styles
import styles from './EventsList.module.scss';

const EventsList = ({
  className,
  eventsList = [],
  ...props
}) => {
  // console.log(`EventsList eventsList: `, eventsList);
  // return null;

  // Order list by lastest post date
  eventsList.sort((a, b) => b.date - a.date);

  return (
    <div
      {...props}
      className={cx(styles.component, className)}
    >
      <Grid>
        <Row className={styles.list}>
          {eventsList.map((event, index) => (
            <Col
              key={index}
              xs={12}
              lgOffset={2}
              lg={8}
            >
              <EventCard className={styles.event} {...event} />
            </Col>
          ))}
        </Row>
      </Grid>
    </div>
  );
}

export default EventsList;
