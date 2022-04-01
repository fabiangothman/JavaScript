import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import Image from 'next/image';
import PropTypes from 'prop-types';
import _sample from 'lodash/sample';
import styles from './Testimonials.module.scss';

function Testimonials({ testimonials }) {
  const { cards } = testimonials;
  const baseColors = ['green', 'purple', 'red', 'blue'];
  const [colorsRandom, setColorsRandom] = useState(
    Array(...Array(cards.length)).map(() => baseColors[0]),
  );
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const newColors = colorsRandom.map(() => _sample(baseColors));
    setColorsRandom(newColors);
  }, []);

  if (!cards || !cards.length) return null;

  return (
    <div className={styles.container}>
      <div className={styles.peopleContainer}>
        {cards.map((card, index) => (
          <div
            className={cx(
              styles.peopleCard,
              index % 2 ? styles.peopleCardEven : null,
            )}
            key={`testimonial_${index}`}
          >
            <div className={styles.peopleImage}>
              <Image
                className={styles.image}
                src={card.image.url}
                alt={card.image.alt || card.name}
                height={card.image.height || 2000}
                width={card.image.width || 2000}
              />
              <div className={styles.imageText}>
                <div className={cx(styles.author, styles[colorsRandom[index]])}>
                  {card.name}
                </div>
                <p className={styles.position}>{card.role}</p>
              </div>
            </div>
            <div className={styles.peopleText}>
              <h2 className={styles.title}>{card.headline}</h2>
              <p className={styles.text}>{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const TestimonialsPropTypes = {
  testimonials: PropTypes.shape({
    cards: PropTypes.arrayOf(
      PropTypes.shape({
        image: PropTypes.shape({
          url: PropTypes.string,
          alt: PropTypes.string,
          height: PropTypes.number,
          width: PropTypes.number,
        }),
      }),
    ),
  }),
};

export const TestimonialsDefaultProps = {
  testimonials: null,
};

Testimonials.propTypes = TestimonialsPropTypes;
Testimonials.defaultProps = TestimonialsDefaultProps;

export default Testimonials;
