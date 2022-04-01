import { useEffect, useRef, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { ImageType } from '~types';
import * as styles from './CarouselSection.module.scss';
import '@splidejs/splide/dist/css/splide.min.css';

export default function CarouselSection({
  className,
  changeTime,
  carouselCards,
  ...props
}) {
  // console.log(`CarouselSection props: `, props);
  // return null;
  const [width, setWidth] = useState(100);
  const [cardsStatus, setCardsStatus] = useState(
    Array(...Array(carouselCards.length)).map(() => 'hide'),
  );
  const splideRef = useRef();

  const handleCarouselMove = (splide, newIndex, prevIndex) => {
    const cardsStatusCopy = [...cardsStatus];
    cardsStatusCopy[prevIndex] = 'hide';
    cardsStatusCopy[newIndex] = 'show';
    setCardsStatus(cardsStatusCopy);
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const cardsStatusCopy = [...cardsStatus];
    cardsStatusCopy[0] = 'show';
    setCardsStatus(cardsStatusCopy);

    setWidth(document.getElementById('mainLayout').clientWidth);
    function handleResize() {
      setWidth(document.getElementById('mainLayout').clientWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      {...props}
      id="carouselSection"
      className={cx(styles.component, className)}
    >
      <div className={styles.container}>
        <div className={styles.contCarousel}>
          <Splide
            options={{
              type: 'loop',
              autoplay: false,
              interval: changeTime * 1000,
              arrows: false,
              pagination: false,
              width,
              perMove: 1,
              start: 0,
              breakpoints: {
                10000: {
                  perPage: carouselCards.length,
                },
                3000: {
                  perPage: carouselCards.length >= 6 ? 6 : carouselCards.length,
                },
                2000: {
                  perPage: carouselCards.length >= 5 ? 5 : carouselCards.length,
                },
                1500: {
                  perPage: carouselCards.length >= 4 ? 4 : carouselCards.length,
                },
                1150: {
                  perPage: carouselCards.length >= 3 ? 3 : carouselCards.length,
                },
                850: {
                  perPage: carouselCards.length >= 2 ? 3 : carouselCards.length,
                },
                575: {
                  perPage: carouselCards.length >= 1 ? 1 : carouselCards.length,
                },
              },
            }}
            className={styles.carousel}
            onMove={handleCarouselMove}
            ref={splideRef}
          >
            {carouselCards.map((card, index) => (
              <SplideSlide key={index}>
                <div className={styles.contCard}>
                  <div className={styles.contImage}>
                    <div className={styles.overlay}>
                      {/* eslint-disable @next/next/no-img-element */}
                      <div
                        className={styles.image}
                        style={{ backgroundImage: `url(${card.image.url})` }}
                      />
                    </div>
                    <div className={styles.contInfo}>
                      <div className={styles.nick}>
                        <span>{card.nick}</span>
                      </div>
                      <div className={styles.followers}>
                        <span>{card.followers} followers</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ width: (width * 5) / 6 }}>
                    <div
                      className={cx(
                        styles.contText,
                        styles[cardsStatus[index]],
                      )}
                    >
                      <span>{card.description}</span>
                    </div>
                  </div>
                </div>
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </div>
    </div>
  );
}

CarouselSection.defaultProps = {
  className: '',
};

export const CarouselType = PropTypes.shape({
  className: PropTypes.string,
  changeTime: PropTypes.number.isRequired,
  carouselCards: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string.isRequired,
      followers: PropTypes.string.isRequired,
      image: ImageType.isRequired,
      nick: PropTypes.string.isRequired,
      sysId: PropTypes.string.isRequired,
    }),
  ).isRequired,
});
CarouselSection.propTypes = CarouselType.isRequired;
