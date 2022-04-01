import cx from 'classnames';
import Link from 'next/link';
import PropTypes from 'prop-types';
import * as styles from './CircleButton.module.scss';

export default function CircleButton({
  children,
  href,
  className,
  baseColors,
  ...props
}) {
  // console.log(`Button href: `, href);
  // sreturn null;
  if (href) {
    return (
      <Link href={href}>
        <a
          className={cx(
            className,
            styles.component,
            styles[baseColors.toUpperCase()],
          )}
        >
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

CircleButton.defaultProps = {
  className: '',
  href: '',
  baseColors: 'WhiteBlack',
};

CircleButton.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  className: PropTypes.string,
  baseColors: PropTypes.string,
};
