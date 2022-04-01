import { format } from 'date-fns';
import PropTypes from 'prop-types';
import FootnotesText from '~benchmarkingComponents/FootnotesText';
import styles from './Footnotes.module.scss';
import { RichTextTypes } from '~baseComponents/RichText';

const Footnotes = ({ title = 'Footnotes', mainNotes, extraNotes, date }) => {
  if (!mainNotes && !extraNotes) {
    return null;
  }
  function replaceTags(text) {
    if (!date) {
      return text;
    }
    if (text?.content) {
      text.content.forEach((par) => {
        if (par.content) {
          par.content.forEach((parText) => {
            if (parText && parText.value) {
              // eslint-disable-next-line no-param-reassign
              parText.value = parText.value.replace(
                /{DATE}/g,
                format(new Date(date), 'd-MMM-yy'),
              );
            }
          });
        }
      });
    }
    return text;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{title}</div>
      <div className={styles.footnotes}>
        <FootnotesText>{replaceTags(mainNotes)}</FootnotesText>
        <div className={styles.extraNotes}>
          <FootnotesText>{replaceTags(extraNotes)}</FootnotesText>
        </div>
      </div>
    </div>
  );
};

Footnotes.defaultProps = {
  title: 'Footnotes',
  mainNotes: null,
  extraNotes: null,
};

Footnotes.propTypes = {
  title: PropTypes.string,
  mainNotes: RichTextTypes,
  extraNotes: RichTextTypes,
  date: PropTypes.string.isRequired,
};

export default Footnotes;
