import RichText, { RichTextTypes } from '~baseComponents/RichText';
import styles from './CustomQuote.module.scss';
import { DoubleVerticalRedBarQuoteMark } from '~baseComponents/Icons';

const CustomQuote = ({ el }) => {
  return (
    <div className={styles.quote}>
      <div className={styles.wrapper}>
        <DoubleVerticalRedBarQuoteMark />
        <RichText blockquoteStyle={styles.text} content={el} />
      </div>
    </div>
  );
};

export default CustomQuote;

CustomQuote.propTypes = RichTextTypes.isRequired;
