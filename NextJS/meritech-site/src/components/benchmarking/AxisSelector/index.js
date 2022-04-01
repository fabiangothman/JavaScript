import cx from 'classnames';
import PropTypes from 'prop-types';
import Dropdown from '~benchmarkingComponents/Dropdown';
import AxisFigure from '~benchmarkingComponents/AxisFigure';
import styles from './AxisSelector.module.scss';

const AxisSelector = ({
  axis,
  className,
  options,
  value,
  onChange,
  sortOptions,
}) => {
  return (
    <div className={cx(styles.wrapper, className)}>
      <div className={styles.title}>{axis} Axis</div>
      <AxisFigure className={styles.axisFigure} axis={axis} />
      <Dropdown
        sortOptions={sortOptions}
        className={styles.dropdown}
        options={options}
        value={value}
        onChange={onChange}
        reducedHeight
        right={axis === 'y'}
      />
    </div>
  );
};

AxisSelector.defaultProps = {
  className: null,
  sortOptions: false,
};

AxisSelector.propTypes = {
  axis: PropTypes.string.isRequired,
  className: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  sortOptions: PropTypes.string,
};

export default AxisSelector;
