import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const LoopTexts = ({ tag, pre, texts, pos, interval, customClass }) => {
  const [counter, setCounter] = useState(0);
  const [currentText, setCurrentText] = useState(
    `${pre} ${texts[counter]}${pos}`,
  );

  const Tag = tag;
  useEffect(() => {
    const loop = setInterval(() => {
      const nextCounterValue = counter === texts.length - 1 ? 0 : counter + 1;
      setCurrentText(`${pre} ${texts[counter]}${pos}`);
      setCounter(nextCounterValue);
    }, interval);

    return () => clearInterval(loop);
  }, [texts.length, counter, texts, pre, pos, interval]);

  return <Tag className={customClass}>{currentText}</Tag>;
};

LoopTexts.defaultProps = {
  pos: '',
  customClass: '',
  interval: 3000,
};

LoopTexts.propTypes = {
  tag: PropTypes.string.isRequired,
  pre: PropTypes.string.isRequired,
  texts: PropTypes.arrayOf(PropTypes.string).isRequired,
  pos: PropTypes.string,
  customClass: PropTypes.string,
  interval: PropTypes.number,
};

export default LoopTexts;
