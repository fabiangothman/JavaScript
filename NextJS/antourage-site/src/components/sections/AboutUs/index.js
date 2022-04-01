import PropTypes from 'prop-types';
import RichText, { RichTextTypes } from '~baseComponents/RichText';
import { Col, Grid, Row } from '~grid';

const AboutUs = ({ title, description }) => {
  return (
    <Grid>
      <Row>
        <Col xl={12}>
          <h2>{title}</h2>
          <RichText content={description} />
        </Col>
      </Row>
    </Grid>
  );
};

export default AboutUs;

AboutUs.propTypes = {
  title: PropTypes.string.isRequired,
  description: RichTextTypes.isRequired,
};
