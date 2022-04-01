// import PropTypes from 'prop-types';

import RichText, { RichTextTypes } from '~baseComponents/RichText';
import * as styles from './HomeContent.module.scss';

export default function HomeContent({ content }) {
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

HomeContent.propTypes = {
  content: RichTextTypes.isRequired,
};
