import React, { useRef, useState } from 'react';
import Image from 'baseComponents/CmsImage';
import { Grid, Row, Col } from 'grid';
import SectionWrapper from 'baseComponents/SectionWrapper';
import Header from 'baseComponents/Header';
import ParallaxContent from 'baseComponents/ParallaxContent';
import useIsMobile from 'hooks/useIsMobile';
//  Styles
import styles from './Stats.module.scss'

const Stats = ({ id = "" }) => {
  const imageRef = useRef();
  const [isMobile, setIsMobile] = useState(false);

  const deskImg = require(`../../../../public/images/stats-desktop-pattern.png`);
  const txtTitle = `Yet strategic intelligence processes rely on static information and gut feeling. While:`;
  const stats = [
    {
      number: '92%',
      text: 'Of data analytics professionals said their company needed to increase the use of external data'
    },
    {
      number: '74',
      text: 'Zettabytes of data created, captured, copied and consumed in 2020, Up 45% YoY'
    },
    {
      number: '50%',
      text: 'of Consumer Industry growth will occur through direct-to-consumer business model'
    }
  ];

  useIsMobile(setIsMobile);

  return (
    <SectionWrapper slug={id}>
      <div className={styles.component}>
        <Grid fluid className={styles.noPad}>
          <Row>
            <Col xs={12} lgOffset={1} lg={5}>
              <div className={styles.info}>
                <div className={styles.highlighted}>
                  <span>{txtTitle}</span>
                </div>
                <div className={styles.stats}>
                  { stats.length>0 && stats.map(((stat, index) => (
                    <div className={styles.stat} key={index}>
                      <div className={styles.number}>
                        <Header tag="span" gradient>{stat.number}</Header>
                      </div>
                      <div className={styles.text}>
                        <span>{stat.text}</span>
                      </div>
                    </div>
                  )))}
                </div>
              </div>
            </Col>
            <Col className={styles.noPad} xs={12} lgOffset={1} lg={5}>
              <div ref={imageRef} className={styles.parallax}>            
                <ParallaxContent
                  contRef={imageRef}
                  className={styles.contImage}
                  animationHeight={isMobile ? 500 : 700}
                  animationToCenter={false}
                  animationInverse={false}
                >
                  <Image
                    alt="Featured stats network desktop version"
                    src={deskImg}
                    objectFit="cover"
                    layout="fill"
                    className={styles.image}
                  />
                </ParallaxContent>
              </div>
            </Col>
          </Row>    
        </Grid>
      </div>
    </SectionWrapper>
  )
}

export default Stats;
