import PropTypes from 'prop-types';
import Link from 'next/link';
import cx from 'classnames';
import styles from './AnchorWithRedBars.module.scss';
import { DoubleVerticalRedBar } from '~baseComponents/Icons';

const AnchorWithRedBars = ({ className, anchorLink, text, isExternal }) => {
  const renderLink = ({ label, ...rest }) => {
    return (
      <a className={styles.link} {...rest}>
        <DoubleVerticalRedBar />
        <span>{label}</span>
        <DoubleVerticalRedBar />
      </a>
    );
  };
  return (
    <div className={cx(styles.buttonWrapper, className)}>
      {isExternal && (
        <>
          {renderLink({
            label: text,
            href: anchorLink,
            target: '_blank',
            rel: 'noreferrer',
          })}
        </>
      )}
      {!isExternal && (
        <Link href={anchorLink}>{renderLink({ label: text })}</Link>
      )}
    </div>
  );
};

AnchorWithRedBars.defaultProps = {
  isExternal: false,
  className: null,
};

AnchorWithRedBars.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
  anchorLink: PropTypes.string.isRequired,
  isExternal: PropTypes.bool,
};

export default AnchorWithRedBars;
