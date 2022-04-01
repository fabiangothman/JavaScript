import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './FootnotesText.module.scss';
import RichText, { RichTextTypes } from '~baseComponents/RichText';

const FootnotesText = ({ className, children }) => {
  if (!children) {
    return null;
  }
  return <RichText pStyle={cx(styles.wrapper, className)} content={children} />;
};

FootnotesText.defaultProps = {
  className: null,
  children: null,
};

FootnotesText.propTypes = {
  className: PropTypes.string,
  children: RichTextTypes,
};

export default FootnotesText;
