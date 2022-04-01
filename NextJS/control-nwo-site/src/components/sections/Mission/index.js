import React from 'react';
import Image from 'baseComponents/CmsImage';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import SectionWrapper from 'baseComponents/SectionWrapper';
import animateScrollTo from 'animated-scroll-to';
import { Grid, Row, Col } from 'grid';
import Header from 'baseComponents/Header';
// Styles
import styles from './Mission.module.scss';
import '@splidejs/splide/dist/css/splide.min.css';

const Mission = ({ id = "" }) => {
  const highlighted = `Our mission is to help you answer the what, when, why, where and who by analyzing billions of unstructured data points on the fly.`;
  const text = `We are proud to work with some of the world’s greatest brands`;
  const sap_logo = require(`../../../../public/images/mission/sap_logo.png`);
  const henkel_logo = require(`../../../../public/images/mission/henkel_logo.png`);
  const gsk_logo = require(`../../../../public/images/mission/gsk_logo.png`);
  const lvmh_logo = require(`../../../../public/images/mission/lvmh_logo.png`);
  const logos = [
    {
      name: 'sap_logo',
      logo: sap_logo,
    },
    {
      name: 'henkel_logo',
      logo: henkel_logo,
    },
    {
      name: 'gsk_logo',
      logo: gsk_logo,
    },
    {
      name: 'lvmh_logo',
      logo: lvmh_logo,
    }
  ];

  return (
    <SectionWrapper slug={id}>
      <div className={styles.component}>
        <Grid>
          <Row>
            <Col xs={12} lgOffset={2} lg={8}>
              <div className={styles.highlighted}>
                <Header tag="div" gradient>
                  <span>{highlighted}</span>
                </Header>
              </div>
            </Col>
            <Col xs={12} lgOffset={3} lg={6}>
              <div className={styles.text}>
                <span>{text}</span>
              </div>
            </Col>
          </Row>
        </Grid>
        <Grid fluid className={styles.noPad}>
          <Row>
            <Col xs={12} className={styles.noPad}>
              <Splide
                options={{
                  type: 'loop',
                  trimSpace: true,
                  rewind: true,
                  autoplay: true,
                  interval: 0,
                  speed: 3000,
                  easing: 'linear',
                  pauseOnHover: false,
                  focus: 'center',
                  arrows: false,
                  pagination: false,
                  width: '100%',
                  perPage: 4,
                  breakpoints: {
                    991: {
                      perPage: 2,
                    },
                  }
                }}
              >
                {logos.map((item, index) => (
                  <SplideSlide key={index}>
                    <div className={styles.imageCont}>
                      {/* eslint-disable @next/next/no-img-element */}
                      <img
                        alt={item.name}
                        src={item.logo}
                        className={styles.image}
                      />
                    </div>
                  </SplideSlide>
                ))}
              </Splide>
            </Col>
          </Row>
        </Grid>
      </div>
    </SectionWrapper>
  )
}

export default Mission;
