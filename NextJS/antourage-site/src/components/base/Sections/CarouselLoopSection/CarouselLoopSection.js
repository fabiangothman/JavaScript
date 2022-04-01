import { useEffect, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { ImageType } from '~types';
import { Col, Grid, Row } from '~grid';
import * as styles from './CarouselLoopSection.module.scss';
import '@splidejs/splide/dist/css/splide.min.css';

export default function CarouselLoopSection({
  className,
  text,
  changeTime,
  images,
  ...props
}) {
  // console.log(`CarouselLoopSection props: `, props);
  // return null;
  const [width, setWidth] = useState(100);

  useEffect(() => {
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
      id="carouselLoopSection"
      className={cx(styles.component, className)}
    >
      <div className={styles.container}>
        <Grid>
          <Row>
            <Col xs={12} lgOffset={3} lg={6}>
              <p className={styles.text}>{text}</p>
            </Col>
          </Row>
        </Grid>
        <div className={styles.contCarousel}>
          <Splide
            options={{
              type: 'loop',
              trimSpace: true,
              rewind: true,
              autoplay: true,
              interval: changeTime * 1000,
              focus: 'center',
              arrows: false,
              pagination: false,
              width,
              breakpoints: {
                10000: {
                  perPage: 6,
                },
                1700: {
                  perPage: 5,
                },
                1060: {
                  perPage: 3,
                },
                560: {
                  perPage: 2,
                },
              },
            }}
            className={styles.carousel}
          >
            {images.map((image, index) => (
              <SplideSlide key={index}>
                {/* eslint-disable @next/next/no-img-element */}
                <img
                  src={image.url}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  className={styles.img}
                />
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </div>
    </div>
  );
}

CarouselLoopSection.defaultProps = {
  className: '',
};

export const CarouselLoopType = PropTypes.shape({
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
  changeTime: PropTypes.number.isRequired,
  images: PropTypes.arrayOf(ImageType).isRequired,
});
CarouselLoopSection.propTypes = CarouselLoopType.isRequired;
