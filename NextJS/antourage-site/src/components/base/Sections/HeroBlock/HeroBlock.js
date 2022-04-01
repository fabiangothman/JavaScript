import React from 'react';
import PropTypes from 'prop-types';
import styles from './HeroBlock.module.scss';

function HeroBlock({ headline, image, description }) {
  return (
    <div className={styles.container}>
      {image && image.url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className={styles.image}
          alt={headline || description}
          src={image.url}
        />
      ) : null}
      {headline ? <p className={styles.eyebrow}>{headline}</p> : null}
      {description ? <h1 className={styles.headline}>{description}</h1> : null}
    </div>
  );
}

export const HeroPropTypes = {
  image: PropTypes.shape({
    url: PropTypes.string,
  }),
  headline: PropTypes.string,
  description: PropTypes.string,
};

export const HeroDefaultProps = {
  image: null,
  headline: null,
  description: null,
};

HeroBlock.propTypes = HeroPropTypes;
HeroBlock.defaultProps = HeroDefaultProps;

export default HeroBlock;
