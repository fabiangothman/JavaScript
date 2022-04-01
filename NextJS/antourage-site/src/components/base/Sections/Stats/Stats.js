import React from 'react';
import { StatsPropTypes, StatsDefaultProps } from './PropTypes';
import styles from './Stats.module.scss';

function Stats({ items, title }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        {title ? <h2 className={styles.title}>{title}</h2> : null}
        <div className={styles.stats}>
          {items
            ? items.map((item, index) => (
                <div className={styles.stat} key={`stat_${index}`}>
                  <div className={styles.numberContainer}>
                    <div className={styles.number}>
                      {item.value} <sup>{item.symbol}</sup>
                    </div>
                  </div>
                  <div className={styles.textContainer}>
                    <div className={styles.item}>
                      <p className={styles.itemTitle}>{item.title}</p>
                    </div>
                    <div className={styles.item}>
                      <p className={styles.itemDescription}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}

Stats.propTypes = StatsPropTypes.isRequired;
Stats.defaultProps = StatsDefaultProps;

export default Stats;
