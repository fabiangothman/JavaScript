import cx from 'classnames';
import Link from 'next/link';
import PropTypes from 'prop-types';
import * as styles from './Button.module.scss';

export default function Button({ children, href, className, ...props }) {
  if (href) {
    return (
      <Link href={href}>
        <a {...props} className={cx(styles.component, className)}>
          {children}
        </a>
      </Link>
    );
  }
  return (
    <button
      type="button"
      {...props}
      className={cx(styles.component, className)}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  className: '',
  href: '',
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  className: PropTypes.string,
};
