import React from 'react';
import cx from 'classnames';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import { Grid, Row, Col } from 'grid';
import Header from 'baseComponents/Header';
// Styles
import styles from './TechnologySlider2.module.scss';
import '@splidejs/splide/dist/css/splide.min.css';
import { ButtonArrowLeft, ButtonArrowRight } from 'components/icons';

const TechnologySlider2 = ({
  className,
  ...props
}) => {
  const title = `Key Strengths`;
  const slideData = [
    {
      name: `Data 1`,
      text: `The NWO dataset includes over 1 billion digital conversations capturing consumer voices*, 300 million news records and other content spanning 65 languages, and accesses over 40 petabytes of news and information dating back to 2006.`,
      detail: `*currently growing at a rate of ~1 Billion additional data points per month`,
    },
    {
      name: `Data 2`,
      text: `The NWO dataset includes over 1 billion digital conversations capturing consumer voices*, 300 million news records and other content spanning 65 languages, and accesses over 40 petabytes of news and information dating back to 2006.`,
      detail: `*currently growing at a rate of ~1 Billion additional data points per month`,
    },
    {
      name: `Data 3`,
      text: `The NWO dataset includes over 1 billion digital conversations capturing consumer voices*, 300 million news records and other content spanning 65 languages, and accesses over 40 petabytes of news and information dating back to 2006.`,
      detail: `*currently growing at a rate of ~1 Billion additional data points per month`,
    },
    {
      name: `Data 4`,
      text: `The NWO dataset includes over 1 billion digital conversations capturing consumer voices*, 300 million news records and other content spanning 65 languages, and accesses over 40 petabytes of news and information dating back to 2006.`,
      detail: `*currently growing at a rate of ~1 Billion additional data points per month`,
    },
    {
      name: `Data 5`,
      text: `The NWO dataset includes over 1 billion digital conversations capturing consumer voices*, 300 million news records and other content spanning 65 languages, and accesses over 40 petabytes of news and information dating back to 2006.`,
      detail: `*currently growing at a rate of ~1 Billion additional data points per month`,
    },
  ];

  return (
    <div
      {...props}
      className={cx(styles.component, className)}
    >
      <Grid>
        <Row>
          <Col xs={12}>
            <div className={styles.title}>
              <Header tag="span" gradient>{ title }</Header>
            </div>
          </Col>
        </Row>
      </Grid>
      <Grid className={styles.noPad}>
        <Row>
          <Col xs={12} lgOffset={1} lg={10} className={styles.noPad}>
            <Splide
              renderControls={() => (
                <div className={cx(styles.contArrows, `splide__arrows`)}>
                  <button className={cx(styles.arrow, styles.prev, `splide__arrow splide__arrow--prev`)}>
                    <ButtonArrowLeft width="50" />
                  </button>
                  <button className={cx(styles.arrow, styles.next, `splide__arrow splide__arrow--next`)}>
                    <ButtonArrowRight width="50" />
                  </button>
                </div>
              )}
              options={{
                type: 'loop',
                trimSpace: true,
                rewind: true,
                autoplay: true,
                interval: 3 * 1000,
                focus: 'center',
                arrows: false,
                pagination: false,
                width: '100%',
                perPage: 1,
                breakpoints: {
                  991: {
                    perPage: 3/2,
                  },
                }
              }}
            >
              {slideData.map((item, index) => (
                <SplideSlide key={index}>
                  <div className={styles.slideCard}>
                    <div className={styles.cardContent}>
                      <div className={styles.numeration}>
                        <span>{`${index+1}/${slideData.length}`}</span>
                      </div>
                      <div className={styles.name}>
                        <span>{ item.name }</span>
                      </div>
                      <div className={styles.text}>
                        <span>{ item.text }</span>
                      </div>
                      <div className={styles.detail}>
                        <span>{ item.detail }</span>
                      </div>
                    </div>
                  </div>
                </SplideSlide>
              ))}
            </Splide>
          </Col>
        </Row>
      </Grid>
    </div>
  )
}

export default TechnologySlider2;
