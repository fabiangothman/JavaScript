import PropTypes from 'prop-types';
import FilterLabel from '~benchmarkingComponents/FilterLabel';
import styles from './FilterWrapper.module.scss';

const FilterWrapper = ({ separator = false, label, children }) => {
  return (
    <section className={styles.wrapper}>
      <FilterLabel label={label} />
      {children}
      {separator && <div className={styles.separator} />}
    </section>
  );
};

FilterWrapper.defaultProps = {
  separator: false,
  label: null,
};

FilterWrapper.propTypes = {
  separator: PropTypes.bool,
  label: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default FilterWrapper;
