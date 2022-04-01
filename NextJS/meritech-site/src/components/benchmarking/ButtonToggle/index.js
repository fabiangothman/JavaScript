import cx from 'classnames';
import { useEffect, useState } from 'react';
import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';
import styles from './ButtonToggle.module.scss';
import Button from '~benchmarkingComponents/ButtonToggle/Button';

const ButtonToggle = ({
  className,
  options,
  autoAll,
  allLabel = 'All',
  fallbackValue = null,
  multiSelect = false,
  value = null,
  onChange,
}) => {
  const [bufferedValue, setBufferedValue] = useState(
    multiSelect ? value || [] : value || null,
  );

  useEffect(() => {
    if (!isEqual(bufferedValue, value)) {
      setBufferedValue(value);
    }
  }, [onChange, bufferedValue, value]);

  const updateBufferedValue = (newBufferedValue) => {
    if (!isEqual(newBufferedValue, value)) {
      onChange(newBufferedValue);
    }
  };

  const areAllSelected = () => {
    if (multiSelect) {
      return bufferedValue.length === 0;
    }

    return bufferedValue === null;
  };

  const toggleValue = (updateValue) => {
    if (!multiSelect) {
      updateBufferedValue(updateValue);
    } else if (updateValue === null) {
      updateBufferedValue([]);
    } else {
      let newValue = [...bufferedValue];

      const index = newValue.indexOf(updateValue);
      if (index > -1) {
        newValue.splice(index, 1);
        if (newValue.length === 0 && fallbackValue?.length) {
          newValue = fallbackValue;
        }
      } else {
        newValue.push(updateValue);
      }

      if (newValue.length === options.length && autoAll) {
        newValue = [];
      }

      updateBufferedValue(newValue);
    }
  };

  const isSelected = (checkValue) => {
    if (!multiSelect) {
      return checkValue === bufferedValue;
    }
    if (areAllSelected()) {
      return false;
    }

    const index = bufferedValue.indexOf(checkValue);

    return index > -1;
  };

  return (
    <div className={cx(styles.wrapper, className)}>
      {allLabel && (
        <Button
          label={allLabel}
          value={null}
          selected={areAllSelected()}
          onClick={toggleValue}
        />
      )}
      {options.map((option) => {
        return (
          <Button
            key={`options-button-${option.value}`}
            label={option.label}
            value={option.value}
            onClick={toggleValue}
            selected={isSelected(option.value)}
          />
        );
      })}
    </div>
  );
};

ButtonToggle.defaultProps = {
  className: null,
  allLabel: 'All',
  multiSelect: false,
  value: null,
  autoAll: true,
  fallbackValue: null,
};

ButtonToggle.propTypes = {
  multiSelect: PropTypes.bool,
  autoAll: PropTypes.bool,
  className: PropTypes.string,
  allLabel: PropTypes.string,
  fallbackValue: PropTypes.oneOfType(
    [PropTypes.arrayOf(PropTypes.string)],
    PropTypes.string,
  ),
  options: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    ),
  ]),
  onChange: PropTypes.func.isRequired,
};

export default ButtonToggle;
