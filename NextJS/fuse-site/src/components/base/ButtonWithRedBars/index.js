import PropTypes from 'prop-types';
import styles from './ButtonWithRedBars.module.scss';
import { DoubleVerticalRedBar } from '~baseComponents/Icons';

const ButtonWithRedBars = ({ text }) => {
  return (
    <button type="submit" className={styles.buttonWrapper}>
      <DoubleVerticalRedBar />
      <span>{text}</span>
      <DoubleVerticalRedBar />
    </button>
  );
};

ButtonWithRedBars.propTypes = {
  text: PropTypes.string.isRequired,
};

export default ButtonWithRedBars;
