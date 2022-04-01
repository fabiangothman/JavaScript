import PropTypes from 'prop-types';
import RichText from '~baseComponents/RichText';
import styles from './Testimonials.module.scss';
import { Col, Grid, Row } from '~grid';

const Testimonials = ({ content }) => {
  return (
    <div className={styles.testimonials}>
      <Grid className={styles.wrapper}>
        <Row className="no-pad">
          <Col xs={12} lg={10} lgOffset={1} className={styles.list}>
            {content.map((el) => {
              if (!el.title || !el.testimonial) return null;
              return (
                <div key={el.sysId} className={styles.testimonialBlock}>
                  <RichText
                    h6Style={styles.testimonial}
                    pStyle={styles.author}
                    content={el.testimonial}
                  />
                </div>
              );
            })}
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

Testimonials.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      author: PropTypes.string,
      description: PropTypes.string,
      sysId: PropTypes.string,
      title: PropTypes.string,
    }).isRequired,
  ).isRequired,
};

export default Testimonials;
