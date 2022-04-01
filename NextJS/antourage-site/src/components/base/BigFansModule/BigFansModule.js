import React from 'react';
import PropTypes from 'prop-types';
import styles from './BigFansModule.module.scss';

function BigFansModule({ image, text, progress }) {
  return (
    <div
      className={styles.wrapper}
      style={{
        clipPath: `circle(100% at ${190 - Math.min(progress, 1) * 130}% ${
          170 - Math.min(progress, 1) * 90
        }%)`, // 190, 170 -> 60, 80
      }}
    >
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className={styles.image} src={image.url} alt={text} />
      ) : null}
      {text ? <p className={styles.text}>{text}</p> : null}
    </div>
  );
}

BigFansModule.propTypes = {
  text: PropTypes.string.isRequired,
  image: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
  progress: PropTypes.number.isRequired,
};

export default BigFansModule;
