import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './DropdownOption.module.scss';

const DropdownOption = ({
  label,
  value,
  onChange,
  multiSelect,
  requestClose,
  selected,
}) => {
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control,jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
    <label
      className={cx(styles.wrapper, {
        [styles.multiSelect]: multiSelect,
        [styles.singleSelect]: !multiSelect,
      })}
      onClick={(ev) => {
        ev.stopPropagation();
        if (!multiSelect) {
          requestClose();
        }
      }}
    >
      <input
        type={multiSelect ? 'checkbox' : 'radio'}
        checked={selected}
        onChange={() => onChange(value)}
      />
      <span className={styles.label}>{label}</span>
    </label>
  );
};

DropdownOption.defaultProps = {
  multiSelect: false,
};

DropdownOption.propTypes = {
  label: PropTypes.string.isRequired,
  multiSelect: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  requestClose: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
};

export default DropdownOption;
