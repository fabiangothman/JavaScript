import React, { useRef, useState } from 'react';
import InViewport from 'baseComponents/InViewport';
import useIsMobile from 'hooks/useIsMobile';
import Button from 'baseComponents/Button';
import Animation from 'baseComponents/Animation';
import Link from 'next/link';
import { Col, Grid, Row } from '../../grid';
import ScrollLink from 'baseComponents/ScrollLink';
// Styles
import styles from './MainHero2.module.scss';

const MainHero2 = ({ id = "" }) => {
  const ref = useRef()
  const videoRef = useRef();
  const [isMobile, setIsMobile] = useState(false);
  const title = `Identify microtrends before they become exponential`;
  const subtitle = `Leverage more than 93M Signals to anticipate and track global cultural shifts.`;
  const link = `/#`;

  const updateIsMobile = (isMobile) => {
    setIsMobile(isMobile)
  }

  useIsMobile(updateIsMobile)

  const onInView = () => {
    videoRef.current.play()
  }

  const onOutOfView = () => {
    videoRef.current.pause()
  }

  return (
    <InViewport track={ref} fullView={true} onInView={onInView} onOutOfView={onOutOfView}>
      <div id={id} className={styles.mainHero} ref={ref}>
        <div className={styles.info}>
          <Grid>
            <Row>
              <Col xs={12} lg={7}>
                <div className={styles.title}>
                  <span>{ title }</span>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={12} lg={5}>
                <div className={styles.subtitle}>
                  <span>{ subtitle }</span>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={12} lg={5}>
                <div className={styles.buttons}>
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
                  {link && (
                    <Link href={ link } passHref>
                      <a className={styles.link} target="_self">
                        <Button
                          tag="button"
                          color="blue"
                          outlined
                          rounded
                        >
                          <span>Learn more</span>
                        </Button>
                      </a>
                    </Link>
                  )}
                </div>
              </Col>
            </Row>
          </Grid>
        </div>
        <div className={styles.background}>
          <Animation
            className={styles.animation}
            src={isMobile ? 'main-mobile.mp4' : 'main-desktop.mp4' }
            ref={videoRef}
          />
        </div>
      </div>
    </InViewport>
  )
}

export default MainHero2;
