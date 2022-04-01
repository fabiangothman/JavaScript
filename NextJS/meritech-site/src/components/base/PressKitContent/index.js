import PropTypes from 'prop-types';
import { Folder, RoundedArrow } from 'components/icons';
import Button from '~baseComponents/Button';
import RichText, { RichTextTypes } from '~baseComponents/RichText';
import * as styles from './PressKitContent.module.scss';

export default function PressKitContent({ content, downloadLink }) {
  return (
    <div className={styles.component}>
      <div className="container">
        <div className={styles.content}>
          <RichText
            headingStyle={styles.title}
            pStyle={styles.text}
            content={content}
          />
          <div className={styles.download}>
            <Folder />
            <div className={styles.downloadContent}>
              <div>
                <p className={styles.downloadText}>Download Kit</p>
              </div>
              <Button
                href={downloadLink}
                taarget="_blank"
                rel="noreferrer noopener"
                className={styles.downloadButton}
              >
                <RoundedArrow />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

PressKitContent.propTypes = {
  content: RichTextTypes.isRequired,
  downloadLink: PropTypes.string.isRequired,
};
