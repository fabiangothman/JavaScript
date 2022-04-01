import PropTypes from 'prop-types';
import { TwitterShareButton, LinkedinShareButton } from 'react-share';
import { Share, Twitter, Linkedin } from 'components/icons';
import Button from '~baseComponents/Button';
import * as styles from './BlogPostShareBar.module.scss';

export default function BlogPostShareBar({ author, title }) {
  if (!author) {
    return null;
  }
  const [firstName, ...lastName] = author.split(' ');
  const url = window?.location?.href;
  const canShare = navigator?.share;

  const onShareHandler = (e) => {
    e.preventDefault();
    navigator
      .share({
        title,
        url,
      })
      // eslint-disable-next-line no-console
      .catch(console.error);
  };

  return (
    <div className={styles.shareBar}>
      <p className={styles.author}>
        By {firstName} {lastName}
        {/* {!!lastName.length && <strong>{lastName.join(' ')}</strong>} */}
      </p>
      <div className={styles.share}>
        <p className={styles.categories}>Share</p>
        {canShare ? (
          <Button
            className={styles.shareButton}
            href="#"
            onClick={onShareHandler}
          >
            <Share />
          </Button>
        ) : (
          <div>
            <TwitterShareButton url={url} className={styles.shareButton}>
              <Button href="#" onClick={(e) => e.preventDefault()}>
                <Twitter />
              </Button>
            </TwitterShareButton>
            <LinkedinShareButton url={url} className={styles.shareButton}>
              <Button href="#" onClick={(e) => e.preventDefault()}>
                <Linkedin />
              </Button>
            </LinkedinShareButton>
          </div>
        )}
      </div>
    </div>
  );
}

BlogPostShareBar.propTypes = {
  author: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
