import React, { useRef, useState } from 'react';
import Image from 'baseComponents/CmsImage';
import SectionWrapper from 'baseComponents/SectionWrapper';
import { Grid, Row, Col } from 'grid';
import Header from 'baseComponents/Header';
import Button from 'baseComponents/Button';
import ScrollLink from 'baseComponents/ScrollLink';
import useIsMobile from 'hooks/useIsMobile';
// Styles
import styles from './Goal.module.scss';
import ParallaxContent from 'baseComponents/ParallaxContent';

const Goal = ({ id = "" }) => {
  const contRef = useRef();
  const [isMobile, setIsMobile] = useState(false);

  const highlighted = `Our goal is to enable you to cut through the noise and anticipate these changes.`;
  const text = `We believe it should be on-the-fly and it should be forward-looking. So you can focus on the outcome, not the process and always be a step ahead.`;
  const topleftImage = require(`../../../../public/images/goal/topleftImage.png`);
  const toprightImage = require(`../../../../public/images/goal/toprightImage.png`);
  const centerImage = require(`../../../../public/images/goal/centerImage.png`);
  const bottomleftImage = require(`../../../../public/images/goal/bottomleftImage.png`);
  const bottomrightImage = require(`../../../../public/images/goal/bottomrightImage.png`);

  useIsMobile(setIsMobile);

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
            <Col xs={12}>
              <div className={styles.button}>
                <ScrollLink href="/#request-demo">
                  <Button
                    tag="button"
                    color="blue"
                    outlined
                    rounded
                    icon="dot"
                  >
                    <span>Request demo</span>
                  </Button>
                </ScrollLink>
              </div>
            </Col>
          </Row>
        </Grid>
        <Grid fluid className={styles.noPad}>
          <Row>
            <Col xs={12} className={styles.noPad}>
              <div ref={contRef} className={styles.blockImages}>
                <div className={styles.backgroundColor} />
                <ParallaxContent
                  contRef={contRef}
                  className={styles.topleftImage}
                  animationHeight={isMobile ? 80 : 200}
                  animationToCenter={true}
                  animationInverse={true}
                >
                  <Image
                    alt="Platform featured top-left image"
                    src={topleftImage}
                    objectFit="cover"
                    layout="fill"
                  />
                </ParallaxContent>
                <ParallaxContent
                  contRef={contRef}
                  className={styles.toprightImage}
                  animationHeight={isMobile ? 110 : 250}
                  animationToCenter={true}
                  animationInverse={true}
                >
                  <Image
                    alt="Platform featured top-right image"
                    src={toprightImage}
                    objectFit="cover"
                    layout="fill"
                  />
                </ParallaxContent>
                <ParallaxContent
                  contRef={contRef}
                  className={styles.centerImage}
                  animationHeight={isMobile ? 200 : 300}
                  animationToCenter={true}
                  animationInverse={true}
                >
                  <Image
                    alt="Platform featured center image"
                    src={centerImage}
                    objectFit="cover"
                    layout="fill"
                  />
                </ParallaxContent>
                <ParallaxContent
                  contRef={contRef}
                  className={styles.bottomleftImage}
                  animationHeight={isMobile ? 80 : 200}
                  animationToCenter={true}
                  animationInverse={true}
                >
                  <Image
                    alt="Platform featured bottom-left image"
                    src={bottomleftImage}
                    objectFit="cover"
                    layout="fill"
                  />
                </ParallaxContent>
                <ParallaxContent
                  contRef={contRef}
                  className={styles.bottomrightImage}
                  animationHeight={isMobile ? 80 : 200}
                  animationToCenter={true}
                  animationInverse={true}
                >
                  <Image
                    alt="Platform featured bottom-right image"
                    src={bottomrightImage}
                    objectFit="cover"
                    layout="fill"
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

export default Goal
