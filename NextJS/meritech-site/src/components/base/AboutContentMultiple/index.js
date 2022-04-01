import cx from 'classnames';
import PropTypes from 'prop-types';
import RichText, { RichTextTypes } from '~baseComponents/RichText';
import { Row, Col, Grid } from '~grid';
import * as styles from './AboutContentMultiple.module.scss';

export default function AboutContentMultiple({
  section1Title,
  section1Content,
  section2Title,
  section2Content,
}) {
  return (
    <div className={styles.component}>
      <div className="container">
        <div className={styles.content}>
          <Grid>
            <Row>
              {!!section1Title && (
                <Col xs={12} lg={4}>
                  <div className={styles.title}>
                    <span>{section1Title}</span>
                  </div>
                </Col>
              )}
              {!!section1Content && (
                <Col xs={12} lg={8}>
                  <RichText
                    className={styles.sectionContent}
                    imageStyle={cx(styles.thumbnail, styles.smallContainer)}
                    headingStyle={cx(styles.subtitle, styles.smallContainer)}
                    h2Style={styles.title}
                    pStyle={styles.text}
                    content={section1Content}
                  />
                </Col>
              )}
            </Row>
            <Row>
              {!!section2Title && (
                <Col xs={12} lg={4}>
                  <div className={styles.title}>
                    <span>{section2Title}</span>
                  </div>
                </Col>
              )}
              {!!section2Content && (
                <Col xs={12} lg={8}>
                  <RichText
                    className={styles.sectionContent}
                    imageStyle={cx(styles.thumbnail, styles.smallContainer)}
                    headingStyle={cx(styles.subtitle, styles.smallContainer)}
                    h2Style={styles.title}
                    pStyle={styles.text}
                    content={section2Content}
                  />
                </Col>
              )}
            </Row>
          </Grid>
        </div>
      </div>
    </div>
  );
}

AboutContentMultiple.defaultProps = {
  section2Title: '',
  section2Content: null,
};

AboutContentMultiple.propTypes = {
  section1Title: PropTypes.string.isRequired,
  section1Content: RichTextTypes.isRequired,
  section2Title: PropTypes.string,
  section2Content: RichTextTypes,
};
