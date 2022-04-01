/* eslint-disable react/no-array-index-key */
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './MoreIsMore.module.scss';
import RichText, { RichTextTypes } from '~baseComponents/RichText';
import LoopTexts from '~baseComponents/LoopTexts';

const MoreIsMore = ({ content, wordsToReplace }) => {
  const gridOption = {
    0: styles.rowWrapperAtStart,
    1: styles.rowWrapperAtCenter,
    2: styles.rowWrapperAtEnd,
  };

  const removeEmptyParagraph = (element) => {
    return element.content.filter(
      (el) => el?.nodeType !== 'paragraph' || !!el?.content[0].value,
    );
  };

  return (
    <div className={styles.wrapper}>
      {removeEmptyParagraph(content).map((el, index) => {
        const shouldReplaceContent = el.nodeType === 'paragraph';
        return (
          <div
            key={index}
            className={cx(styles.rowWrapper, gridOption[index || 0])}
          >
            {shouldReplaceContent ? (
              <LoopTexts
                tag="h3"
                pre="More"
                texts={wordsToReplace}
                pos="."
                customClass={styles.text}
                interval={1500}
              />
            ) : (
              <RichText h3Style={styles.text} content={el} />
            )}
          </div>
        );
      })}
    </div>
  );
};

MoreIsMore.propTypes = {
  content: RichTextTypes.isRequired,
  wordsToReplace: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MoreIsMore;
