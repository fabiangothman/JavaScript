import { UpArrow } from 'components/icons';
import Button from '~baseComponents/Button';
import { RichTextTypes } from '~baseComponents/RichText';
import SubscribeForm from '~baseComponents/SubscribeForm';
import * as styles from './BlogPostSidebar.module.scss';

export default function BlogPostSidebar({ message }) {
  return (
    <aside className={styles.component}>
      <div className={styles.backButtonWrapper}>
        <Button className={styles.backButton} href="/research">
          <UpArrow className={styles.backButtonIcon} />
          Back
        </Button>
      </div>
      <SubscribeForm className={styles.subscribe} message={message} />
    </aside>
  );
}

BlogPostSidebar.propTypes = {
  message: RichTextTypes.isRequired,
};
