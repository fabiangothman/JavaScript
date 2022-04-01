import React from 'react';
import styles from './Image.module.scss';

const Image = ({ src, alt }) => {
  return (
    <div className={styles.wrapper}>
      <img src={src} alt={alt} />
    </div>
  );
};

export default Image;
