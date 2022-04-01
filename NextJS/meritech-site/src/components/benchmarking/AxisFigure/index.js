import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './AxisFigure.module.scss';

const AxisFigure = ({ axis, className }) => {
  return (
    <div className={cx(styles.wrapper, className)}>
      <div className={styles.aspectRatioContainer}>
        <div className={styles.inner}>
          <div
            className={cx(styles.axis, styles.axisX, {
              [styles.highlighted]: axis === 'x',
            })}
          />
          <div
            className={cx(styles.axis, styles.axisY, {
              [styles.highlighted]: axis === 'y',
            })}
          />
        </div>
      </div>
    </div>
  );
};

AxisFigure.defaultProps = {
  className: null,
};

AxisFigure.propTypes = {
  axis: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default AxisFigure;
