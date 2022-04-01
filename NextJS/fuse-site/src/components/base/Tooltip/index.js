import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './Tooltip.module.scss';

const Tooltip = ({ text, customClass }) => {
  return (
    <div className={cx(styles.wrapper, customClass)}>
      <span>{text}</span>
    </div>
  );
};

Tooltip.defaultProps = {
  text: '',
  customClass: '',
};

Tooltip.propTypes = {
  text: PropTypes.string,
  customClass: PropTypes.string,
};

export default Tooltip;
