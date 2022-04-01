import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './CustomInput.module.scss';
import { WhiteArrowIcon } from '~baseComponents/Icons';

const CustomInput = ({
  type,
  placeholder,
  showArrow,
  customStyle,
  isTextarea,
  ...rest
}) => {
  return (
    <div className={styles.inputWrapper}>
      {isTextarea ? (
        <>
          <textarea
            {...rest}
            className={cx(styles.subscribeInput, customStyle)}
            placeholder={placeholder}
          />
        </>
      ) : (
        <>
          <input
            {...rest}
            type={type}
            placeholder={placeholder}
            className={cx(styles.subscribeInput, customStyle)}
          />
          {showArrow && <WhiteArrowIcon />}
        </>
      )}
    </div>
  );
};

CustomInput.defaultProps = {
  showArrow: false,
  customStyle: '',
  isTextarea: false,
};

CustomInput.propTypes = {
  type: PropTypes.oneOf([
    'text',
    'email',
    'checkbox',
    'color',
    'date',
    'time',
    'file',
    'password',
  ]).isRequired,
  placeholder: PropTypes.string.isRequired,
  showArrow: PropTypes.bool,
  customStyle: PropTypes.string,
  isTextarea: PropTypes.bool,
};

export default CustomInput;
