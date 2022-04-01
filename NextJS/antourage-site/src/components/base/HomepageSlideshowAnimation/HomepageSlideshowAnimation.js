import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { AntourageLogo } from 'components/icons';
import styles from './HomepageSlideshowAnimation.module.scss';
import CircleAnimation from '~sections/CircleAnimation';

function HomepageSlideshowAnimation({ images, speed }) {
  const [activeItem, setActiveItem] = useState(0);

  useEffect(() => {
    if (activeItem >= images.length) {
      return null;
    }

    const timer = setTimeout(() => {
      setActiveItem(activeItem + 1);
    }, speed);

    return () => {
      clearTimeout(timer);
    };
  }, [activeItem, images.length, speed]);

  if (!images || !images.length || !images.length > 1) {
    return null;
  }

  return images && images.length ? (
    <>
      <div
        className={cx(styles.container, {
          [styles.hiddenContainer]: activeItem >= images.length,
        })}
      >
        <div className={styles.inner}>
          {images.map((image, index) => (
            <Image
              src={image.url}
              alt={image.alt || 'Slideshow Image'}
              className={cx(
                styles.image,
                index === activeItem ? styles.activeImage : null,
              )}
              objectFit="cover"
              layout="fill"
              key={`image_${index}`}
            />
          ))}
          {activeItem < images.length ? (
            <AntourageLogo className={styles.logo} />
          ) : null}
        </div>
      </div>
      {activeItem + 1 > images.length ? <CircleAnimation /> : null}
    </>
  ) : null;
}

export const HomepageSlideshowAnimationProps = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.shape({
        url: PropTypes.string,
        alt: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number,
      }),
    }),
  ),
  speed: PropTypes.number,
};

export const HomepageSlideshowAnimationDefaultProps = {
  images: null,
  speed: 1000,
};

export const formatSlideShow = (data) => {
  return data && data.length
    ? data.map((image) => {
        const { fields } = image;
        const { title, description, file } = fields;

        return {
          url: `https:${file.url}`,
          alt: title || description,
          height: file.details.image.height,
          width: file.details.image.width,
        };
      })
    : null;
};

HomepageSlideshowAnimation.propTypes = HomepageSlideshowAnimationProps;
HomepageSlideshowAnimation.defaultProps =
  HomepageSlideshowAnimationDefaultProps;

export default HomepageSlideshowAnimation;
