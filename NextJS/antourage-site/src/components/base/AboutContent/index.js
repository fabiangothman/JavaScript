// import PropTypes from 'prop-types';

import RichText, { RichTextTypes } from '~baseComponents/RichText';
import * as styles from './AboutContent.module.scss';

export default function AboutContent({ content }) {
  if (!content) {
    return null;
  }
  return (
    <div className={styles.component}>
      <div className="container">
        <div className={styles.content}>
          <RichText
            headingStyle={styles.title}
            pStyle={styles.text}
            content={content}
          />
        </div>
      </div>
    </div>
  );
}

AboutContent.propTypes = {
  content: RichTextTypes.isRequired,
};
