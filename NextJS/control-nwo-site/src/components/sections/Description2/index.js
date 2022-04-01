import React, { useRef, useState } from 'react';
import Image from 'baseComponents/CmsImage';
import cx from 'classnames';
import { Grid, Row, Col } from 'grid';
import SectionWrapper from 'baseComponents/SectionWrapper';
import ParallaxContent from 'baseComponents/ParallaxContent';
import useIsMobile from 'hooks/useIsMobile';
// Styles
import styles from './Description2.module.scss'

const Description2 = ({ id = "" }) => {
  // console.log(`Description2 id: `, id);
  // return null;

  const imageRef = useRef();
  const [isMobile, setIsMobile] = useState(false);

  const deskImg = require(`../../../../public/images/diagonal-network-desktop.png`);
  const txtHighlighted = `The world has rapidly transformed.`;
  const txtText = `In this new market dynamic, narrative is king, and it has become overwhelmingly shaped by online conversations.`;

  useIsMobile(setIsMobile);

  return (
    <SectionWrapper slug={id}>
      <div className={styles.component}> 
        <Grid>
          <Row>
            <Col xs={12} lgOffset={1} lg={5} className={styles.showOnMobile}>
              <div className={styles.info}>
                <div className={styles.highlighted}>
                  <span>{txtHighlighted}</span>
                </div>
                <div className={styles.text}>
                  <span>{txtText}</span>
                </div>
              </div>
            </Col>
          </Row>
        </Grid>
        <Grid fluid className={styles.noPad}>
          <Row>
            <Col className={cx(styles.noPad, styles.backgrounds)} xs={12} lg={5}>
              <div ref={imageRef} className={styles.parallax}>
                <ParallaxContent
                  contRef={imageRef}
                  className={styles.contImage}
                  animationHeight={isMobile ? 500 : 700}
                  animationToCenter={false}
                  animationInverse={false}
                >
                  <Image
                    alt="Diagonal network image dektop version"
                    src={deskImg}
                    objectFit="cover"
                    layout="fill"
                    className={styles.image}
                  />
                </ParallaxContent>
              </div>
            </Col>
            <Col xs={12} lgOffset={1} lg={5} className={styles.showOnDesktop}>
              <div className={styles.info}>
                <div className={styles.highlighted}>
                  <span>{txtHighlighted}</span>
                </div>
                <div className={styles.text}>
                  <span>{txtText}</span>
                </div>
              </div>
            </Col>
          </Row>    
        </Grid>
      </div>
    </SectionWrapper>
  )
}

export default Description2;
