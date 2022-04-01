import React from 'react';
import PropTypes from 'prop-types';
import styles from './Objectives.module.scss';

function Objectives({ title, items }) {
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        {title ? <h2 className={styles.title}>{title}</h2> : null}
        {items && items.length ? (
          <div className={styles.objectivesContainer}>
            {items.map((item, index) => (
              <div className={styles.containerText} key={`objective_${index}`}>
                <div className={styles.number}>{index + 1}</div>
                <p className={styles.text}>{item.text}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export const ObjectivesDefaultProps = {
  title: null,
  items: null,
};

export const ObjectivesPropTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
    }),
  ),
};

Objectives.propTypes = ObjectivesPropTypes;
Objectives.defaultProps = ObjectivesDefaultProps;

export default Objectives;
