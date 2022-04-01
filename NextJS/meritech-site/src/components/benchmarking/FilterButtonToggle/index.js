import PropTypes from 'prop-types';
import FilterWrapper from '~benchmarkingComponents/FilterWrapper';
import ButtonToggle from '~benchmarkingComponents/ButtonToggle';
import { Col, Row } from '~grid';

const FilterButtonToggle = ({
  separator,
  label,
  value,
  multiSelect,
  options,
  allLabel,
  autoAll,
  fallbackValue,
  onChange,
}) => {
  return (
    <FilterWrapper label={label} separator={separator}>
      <Row>
        <Col xs={12}>
          <ButtonToggle
            value={value}
            multiSelect={multiSelect}
            options={options}
            fallbackValue={fallbackValue}
            allLabel={allLabel}
            onChange={onChange}
            autoAll={autoAll}
          />
        </Col>
      </Row>
    </FilterWrapper>
  );
};

FilterButtonToggle.defaultProps = {
  label: null,
  separator: false,
  multiSelect: false,
  allLabel: 'All',
  value: null,
  autoAll: true,
  fallbackValue: null,
};

FilterButtonToggle.propTypes = {
  label: PropTypes.string,
  multiSelect: PropTypes.bool,
  autoAll: PropTypes.bool,
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
  separator: PropTypes.bool,
};

export default FilterButtonToggle;
