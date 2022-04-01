import cx from 'classnames';
import Link from 'next/link';
import PropTypes from 'prop-types';
import * as styles from './Button.module.scss';

export default function Button({
  children,
  href,
  type,
  className,
  baseColors,
  ...props
}) {
  // console.log(`Button href: `, href);
  // return null;
  if (type.toLowerCase() === 'button' || type.toLowerCase() === 'submit') {
    /* eslint-disable react/button-has-type */
    return (
      <button
        type={type}
        className={cx(
          className,
          styles.component,
          styles[baseColors.toUpperCase()],
        )}
        {...props}
      >
        {children}
      </button>
    );
    /* eslint-enable react/button-has-type */
  }
  return (
    <Link href={href}>
      <a
        className={cx(
          styles.component,
          className,
          styles[baseColors.toUpperCase()],
        )}
        {...props}
      >
        {children}
      </a>
    </Link>
  );
}

Button.defaultProps = {
  className: '',
  href: '#',
  type: '',
  baseColors: 'WhiteBlack',
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  baseColors: PropTypes.string,
};
