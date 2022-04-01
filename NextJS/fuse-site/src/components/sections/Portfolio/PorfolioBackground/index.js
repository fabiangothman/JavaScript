import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './PortfolioBackground.module.scss';

const PortfolioBackground = ({ customClass, showOnRightSide }) => {
  return (
    <div
      className={cx(styles.wrapper, customClass, {
        [styles.wrapperRight]: showOnRightSide,
        [styles.wrapperLeft]: !showOnRightSide,
      })}
    />
  );
};

PortfolioBackground.defaultProps = {
  showOnRightSide: false,
  customClass: '',
};

PortfolioBackground.propTypes = {
  customClass: PropTypes.string,
  showOnRightSide: PropTypes.bool,
};

export default PortfolioBackground;
