import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';

const Button = ({ label, value, onClick, selected }) => {
  return (
    <button
      type="button"
      onClick={() => onClick(value)}
      className={cx(styles.wrapper, { [styles.selected]: selected })}
    >
      {label}
    </button>
  );
};

Button.defaultProps = {
  value: null,
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
};

export default Button;
