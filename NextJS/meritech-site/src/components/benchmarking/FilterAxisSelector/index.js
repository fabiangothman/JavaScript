import PropTypes from 'prop-types';
import { Col, Row } from '~grid';
import AxisSelector from '~benchmarkingComponents/AxisSelector';
import FilterWrapper from '~benchmarkingComponents/FilterWrapper';

const FilterAxisSelector = ({
  separator,
  label,
  value,
  xOptions,
  yOptions,
  onChange,
  sortOptions,
}) => {
  const handleChangeX = (newValue) => {
    const fullVal = {
      x: newValue,
      y: value.y,
    };

    onChange(fullVal);
  };

  const handleChangeY = (newValue) => {
    const fullVal = {
      x: value.x,
      y: newValue,
    };

    onChange(fullVal);
  };
  return (
    <FilterWrapper label={label} separator={separator}>
      <Row>
        <Col xs={6}>
          <AxisSelector
            sortOptions={sortOptions}
            axis="y"
            value={value.y}
            options={yOptions}
            onChange={handleChangeY}
          />
        </Col>
        <Col xs={6}>
          <AxisSelector
            sortOptions={sortOptions}
            axis="x"
            value={value.x}
            options={xOptions}
            onChange={handleChangeX}
          />
        </Col>
      </Row>
    </FilterWrapper>
  );
};

FilterAxisSelector.defaultProps = {
  label: null,
  separator: false,
};

FilterAxisSelector.propTypes = {
  label: PropTypes.string,
  xOptions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  yOptions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  value: PropTypes.shape().isRequired,
  onChange: PropTypes.func.isRequired,
  separator: PropTypes.bool,
  sortOptions: PropTypes.string.isRequired,
};

export default FilterAxisSelector;
