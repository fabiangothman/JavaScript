import React from 'react';
import styles from './WidgetLiveIndicator.scss';

const WidgetLiveIndicator = ({ live }) => {
  if (live) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.live} />
        <div className={styles.titleText}>LIVE</div>
      </div>
    );
  }

  return null;
};

export default WidgetLiveIndicator;
