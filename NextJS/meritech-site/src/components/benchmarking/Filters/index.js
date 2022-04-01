import cx from 'classnames';
import { useEffect, useState } from 'react';
import find from 'lodash/find';
import PropTypes from 'prop-types';
import isUndefined from 'lodash/isUndefined';
import styles from './Filters.module.scss';
import useIsMobile from '~hooks/useIsMobile';
import { FiltersCloseIcon, FiltersIcon } from '../../icons';
import FilterAxisSelector from '~benchmarkingComponents/FilterAxisSelector';
import FilterDropdown from '~benchmarkingComponents/FilterDropdown';
import FilterButtonToggle from '~benchmarkingComponents/FilterButtonToggle';

const STORAGE_KEY = 'MERITECH_BENCHMARKING';

const components = {
  buttonToggle: FilterButtonToggle,
  axisSelector: FilterAxisSelector,
  dropdown: FilterDropdown,
};

const Filters = ({ filters, setFilters, filterDefinitions }) => {
  const [isOpen, setOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const filterUpdates = { ...filters };
    // apply defaults
    filterDefinitions.forEach((filterDef) => {
      if (filterDef.defaultValue) {
        filterUpdates[filterDef.key] = filterDef.defaultValue;
      }
    });

    // load stored values
    const storage = JSON.parse(
      window.localStorage.getItem(STORAGE_KEY) || '{}',
    );
    const storageKeys = Object.keys(storage);

    storageKeys.forEach((storageKey) => {
      const foundFilter = find(filterDefinitions, { storageKey });
      if (foundFilter) {
        const storedValue = storage[storageKey];

        // validate value
        let isValid = false;
        if (foundFilter.type === 'axisSelector') {
          let allValid = true;
          const foundXOption = find(foundFilter.xOptions, {
            value: storedValue.x,
          });
          if (!foundXOption) {
            allValid = false;
          }
          const foundYOption = find(foundFilter.yOptions, {
            value: storedValue.y,
          });
          if (!foundYOption) {
            allValid = false;
          }
          isValid = allValid;
        } else if (foundFilter.multiSelect && Array.isArray(storedValue)) {
          let allValid = true;
          storedValue.forEach((singleValue) => {
            const foundOption = find(foundFilter.options, {
              value: singleValue,
            });
            if (!foundOption) {
              allValid = false;
            }
          });
          isValid = allValid;
        } else {
          const foundOption = find(foundFilter.options, { value: storedValue });
          if (foundOption || storedValue === null) {
            isValid = true;
          }
        }
        if (isValid) {
          filterUpdates[foundFilter.key] = storedValue;
        }
      }
    });
    setFilters(filterUpdates);

    // restore variables on mount, so we do not want to check other deps
    // eslint-disable-next-line
  }, [filterDefinitions]);

  const handleOnClick = (ev) => {
    if (!isMobile) {
      ev.preventDefault();
    } else {
      setOpen(!isOpen);
    }
  };

  useEffect(() => {
    setOpen(false);
  }, [isMobile]);

  const renderFilters = () => {
    return filterDefinitions.map(
      ({ type, key, storageKey, defaultValue, ...rest }) => {
        const Tag = components[type];

        const value = isUndefined(filters[key]) ? defaultValue : filters[key];
        const onChange = (newValue) => {
          setFilters({
            ...filters,
            [key]: newValue,
          });

          if (storageKey) {
            const storage = JSON.parse(
              window.localStorage.getItem(STORAGE_KEY) || '{}',
            );
            storage[storageKey] = newValue;
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
          }
        };

        return (
          <Tag
            key={`filter-${key}`}
            value={value}
            onChange={onChange}
            sortOptions={false}
            {...rest}
          />
        );
      },
    );
  };

  return (
    <section
      role="tablist"
      className={cx(styles.wrapper, { [styles.open]: isOpen })}
    >
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <div
        className={styles.titleWrapper}
        onClick={handleOnClick}
        role="tab"
        tabIndex={isMobile ? 0 : -1}
      >
        <div className={styles.title}>Filter</div>
        <div className={styles.iconWrapper}>
          {isOpen && <FiltersCloseIcon />}
          {!isOpen && <FiltersIcon />}
        </div>
      </div>
      <div className={styles.filtersWrapper}>{renderFilters()}</div>
    </section>
  );
};

Filters.propTypes = {
  filters: PropTypes.shape().isRequired,
  setFilters: PropTypes.func.isRequired,
  filterDefinitions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default Filters;
