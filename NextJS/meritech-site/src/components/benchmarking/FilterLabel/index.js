import PropTypes from 'prop-types';
import styles from './FilterLabel.module.scss';
import { Col, Row } from '~grid';

const FilterLabel = ({ label }) => {
  if (!label) {
    return null;
  }

  return (
    <Row className={styles.wrapper}>
      <Col xs={12}>
        <div className={styles.label}>{label}</div>
      </Col>
    </Row>
  );
};

FilterLabel.defaultProps = {
  label: null,
};

FilterLabel.propTypes = {
  label: PropTypes.string,
};

export default FilterLabel;
