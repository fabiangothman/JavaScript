import React from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import styles from './FiftyFifty.module.scss';

function FiftyFifty({ title, description, image }) {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        {image ? (
          <Image
            className={styles.image}
            alt={title || description}
            src={image.url}
            objectFit="cover"
            layout="responsive"
            width={image.width || 2000}
            height={image.height || 2000}
          />
        ) : null}
      </div>
      <div className={styles.right}>
        {title ? <h2 className={styles.headline}>{title}</h2> : null}
        {description ? <p className={styles.body}>{description}</p> : null}
      </div>
    </div>
  );
}

export const FiftyFiftyPropTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.shape({
    url: PropTypes.string,
    height: PropTypes.height,
    width: PropTypes.width,
  }),
};

export const FiftyFiftyDefaultProps = {
  title: null,
  description: null,
  image: {
    url: null,
  },
};

FiftyFifty.propTypes = FiftyFiftyPropTypes;
FiftyFifty.defaultProps = FiftyFiftyDefaultProps;

export default FiftyFifty;
