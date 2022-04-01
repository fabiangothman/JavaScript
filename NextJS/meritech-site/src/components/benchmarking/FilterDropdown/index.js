import PropTypes from 'prop-types';
import FilterWrapper from '~benchmarkingComponents/FilterWrapper';
import { Col, Row } from '~grid';
import Dropdown from '~benchmarkingComponents/Dropdown';

const FilterDropdown = ({
  separator,
  label,
  value,
  multiSelect,
  options,
  emptyLabel,
  onChange,
}) => {
  return (
    <FilterWrapper label={label} separator={separator}>
      <Row>
        <Col xs={12}>
          <Dropdown
            value={value}
            multiSelect={multiSelect}
            options={options}
            emptyLabel={emptyLabel}
            onChange={onChange}
          />
        </Col>
      </Row>
    </FilterWrapper>
  );
};

FilterDropdown.defaultProps = {
  label: null,
  separator: false,
  multiSelect: false,
  emptyLabel: 'None',
};

FilterDropdown.propTypes = {
  label: PropTypes.string,
  multiSelect: PropTypes.bool,
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
  separator: PropTypes.bool,
};

export default FilterDropdown;
