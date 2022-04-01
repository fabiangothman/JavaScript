import cx from 'classnames';
import { useEffect, useRef, useState } from 'react';
import find from 'lodash/find';
import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';
import styles from './Dropdown.module.scss';
import { UpArrow } from '../../icons';
import DropdownOption from './DropdownOption';
import useClickOutside from '~hooks/useClickOutside';

const Dropdown = ({
  className,
  multiSelect,
  options,
  emptyLabel = 'None',
  value,
  right = false,
  onChange,
  reducedHeight,
  sortOptions,
}) => {
  const componentRef = useRef();
  const paneRef = useRef();
  const [bufferedValue, setBufferedValue] = useState(
    multiSelect ? value || [] : value || null,
  );
  const [open, setOpen] = useState(false);

  useClickOutside(componentRef, () => setOpen(false));

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

  const handleChange = (updatedValue) => {
    if (multiSelect) {
      const currentValue = bufferedValue || [];
      const newValue = [...currentValue];
      const index = newValue.indexOf(updatedValue);
      if (index > -1) {
        newValue.splice(index, 1);
      } else {
        newValue.push(updatedValue);
      }

      updateBufferedValue(newValue);
    } else {
      updateBufferedValue(updatedValue);
      setOpen(false);
    }
  };

  const isSelected = (checkValue) => {
    if (multiSelect) {
      return bufferedValue.indexOf(checkValue) > -1;
    }
    return checkValue === bufferedValue;
  };

  const getLabel = () => {
    if (multiSelect) {
      if (!bufferedValue || bufferedValue.length === 0) {
        return emptyLabel;
      }

      const selectedItem = bufferedValue.reduce((acc, currentValue) => {
        const found = find(options, { value: currentValue });

        if (found) {
          acc.push(found.label);
        }

        return acc;
      }, []);

      return selectedItem.join(', ');
    }
    const found = find(options, { value: bufferedValue });
    if (found) {
      return found.label;
    }

    return '';
  };

  const handleClear = (ev) => {
    ev.preventDefault();
    updateBufferedValue([]);
    setOpen(false);
  };

  const getSortedOptions = (optionsToSort) => {
    if (sortOptions) {
      return optionsToSort.sort((a, b) => {
        const nameA = a.label.toUpperCase();
        const nameB = b.label.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        return 0;
      });
    }
    return optionsToSort;
  };

  const handleOpen = () => {
    if (!open) {
      paneRef.current.style.display = 'block';
      paneRef.current.style.visibility = 'hidden';
      //   const paneBbox = paneRef.current.getBoundingClientRect();
      window.PR = paneRef.current;
      paneRef.current.style.visibility = '';
      paneRef.current.style.display = '';
      const parentBbox = componentRef.current.getBoundingClientRect();

      const height = parentBbox.height - 1;
      paneRef.current.style.top = `${height}px`;
      paneRef.current.style.bottom = '';
      paneRef.current.style.top = `${height}px`;
      paneRef.current.style.bottom = '';
      //   if (
      //     document.documentElement.clientHeight <
      //     parentBbox.top + paneBbox.height + height
      //   ) {
      //     paneRef.current.style.bottom = `${height}px`;
      //     paneRef.current.style.top = '';
      //   } else {
      //     paneRef.current.style.top = `${height}px`;
      //     paneRef.current.style.bottom = '';
      //   }
    }

    setOpen(!open);
  };

  return (
    <div
      className={cx(styles.wrapper, className, {
        [styles.open]: open,
        [styles.right]: right,
      })}
      ref={componentRef}
    >
      <button
        className={styles.field}
        tabIndex={0}
        type="button"
        onClick={handleOpen}
      >
        <div className={styles.value}>{getLabel()}</div>
        <div className={styles.icon}>
          <UpArrow />
        </div>
      </button>
      <div
        className={cx(styles.pane, { [styles.reducedHeight]: reducedHeight })}
        ref={paneRef}
      >
        {multiSelect && (
          <div className={styles.stats}>
            <span className={styles.statsCounter}>
              {bufferedValue?.length || emptyLabel} Selected
            </span>
            <a
              className={styles.statsClear}
              href="#clear-selection"
              onClick={handleClear}
            >
              Clear
            </a>
          </div>
        )}
        <div className={styles.options}>
          {getSortedOptions(options).map((option) => {
            return (
              <DropdownOption
                key={`dropdown-option-${option.value}`}
                label={option.label}
                value={option.value}
                selected={isSelected(option.value)}
                requestClose={() => setOpen(false)}
                multiSelect={multiSelect}
                onChange={handleChange}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

Dropdown.defaultProps = {
  className: null,
  emptyLabel: 'None',
  multiSelect: false,
  right: false,
  reducedHeight: false,
  sortOptions: true,
};

Dropdown.propTypes = {
  multiSelect: PropTypes.bool,
  right: PropTypes.bool,
  className: PropTypes.string,
  emptyLabel: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    ),
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  reducedHeight: PropTypes.bool,
  sortOptions: PropTypes.string,
};

export default Dropdown;
