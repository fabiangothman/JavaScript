// import PropTypes from 'prop-types';
import RichText, { RichTextTypes } from '~baseComponents/RichText';
import { Row, Col } from '~grid';
import * as styles from './AboutContent.module.scss';

export default function AboutContent({ content, title }) {
  return (
    <div className={styles.component}>
      <div className="container">
        <div className={styles.content}>
          <Row>
            {!!title && (
              <Col xs={12} lg={4}>
                <RichText
                  headingStyle={styles.title}
                  pStyle={styles.text}
                  content={title}
                />
              </Col>
            )}
            {!!content && (
              <Col xs={12} lg={8}>
                <RichText
                  headingStyle={styles.title}
                  pStyle={styles.text}
                  content={content}
                />
              </Col>
            )}
          </Row>
        </div>
      </div>
    </div>
  );
}

AboutContent.propTypes = {
  content: RichTextTypes.isRequired,
  title: RichTextTypes.isRequired,
};
