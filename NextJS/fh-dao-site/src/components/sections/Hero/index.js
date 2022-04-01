import React, { useEffect, useState } from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import cx from "classnames";
import {
  BottomMountainsLayer1,
  BottomMountainsLayer2,
  BottomMountainsLayer3,
  BottomMountainsLayer4,
  BottomNature1,
  BottomNature2,
  BottomTreesLayer1,
  BottomTreesLayer2,
  BottomPlantsMobile,
} from "components/icons";
import { Grid, Row, Col } from "~grid";
import Button from "~baseComponents/Button";
//  Styles
import styles from "./Hero.module.scss";
import HeroImage from "~baseComponents/HeroImage";

const Hero = ({ id, className, ...props }) => {
  // console.log(`Hero props: `, props);
  // return null;
  const [headerHeight, setHeaderHeight] = useState(0);
  const title = "Join the Quest to protect life on Earth.";
  const subtitle = "All 8 million species.";
  const text =
    "Future Quest DAO accelerates exponential progress towards a regenerative future.";
  const fixHeader = 1;

  useEffect(() => {
    const onResize = () => {
      const header =
        document.getElementById("headerContainer").clientHeight + fixHeader;
      if (header) setHeaderHeight(header);
    };
    onResize();

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("scroll", onResize);
  }, [id]);

  return (
    <div className={cx(styles.component, className)} {...props}>
      <div
        className={styles.background}
        style={{
          marginTop: `-${headerHeight}px`,
          paddingTop: `${headerHeight}px`,
        }}
      >
        <div className={styles.content}>
          <Grid>
            <Row className={styles.rowWrapper}>
              <Col xs={12} lg={6} className={styles.showOnMobile}>
                <div className={styles.contFeatured}>
                  <div className={styles.heroImageCont}>
                    <HeroImage className={styles.heroImage} />
                  </div>
                </div>
              </Col>
              <Col xs={12} lg={6}>
                <Row>
                  <Col xs={12}>
                    <div className={styles.title}>
                      <span>{title}</span>
                    </div>
                    <div className={styles.subtitle}>
                      <span>{subtitle}</span>
                    </div>
                    <div className={styles.text}>
                      <span>{text}</span>
                    </div>
                  </Col>
                  <Col xs={12} lg={8}>
                    <div className={styles.button}>
                      <Button
                        url="https://www.google.com/"
                        label="GET GREENLIST"
                        openInNewTab
                        hoverBackgroundColor="black"
                        hoverTextColor="blue-white"
                        hoverBorderColor="transparent"
                      />
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col xs={12} lg={6} className={styles.showOnDesktop}>
                <div className={styles.contFeatured}>
                  <div className={styles.heroImageCont}>
                    <HeroImage className={styles.heroImage} />
                  </div>
                  <div className={styles.lightWrapper}>
                    <div className={styles.sunLight1Pos}>
                      <Image
                        src="/images/hero/sun_light_24.png"
                        width={1371}
                        height={1657}
                        objectFit="fill"
                        layout="responsive"
                        className={styles.image}
                      />
                    </div>
                    <div className={styles.sunLight2Pos}>
                      <Image
                        src="/images/hero/sun_light_25.png"
                        width={1371}
                        height={1657}
                        objectFit="fill"
                        layout="responsive"
                        className={styles.image}
                      />
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Grid>
        </div>
        <div className={cx(styles.showOnDesktop, styles.bottomNature1)}>
          <BottomNature1 />
        </div>
        <div className={cx(styles.bottomNature2, styles.showOnDesktop)}>
          <BottomNature2 />
        </div>
        <div className={cx(styles.bottomNature2Mobile, styles.showOnMobile)}>
          <BottomPlantsMobile />
        </div>
        <div className={styles.bottomTreesLayer1}>
          <BottomTreesLayer1 />
        </div>
        <div className={styles.bottomTreesLayer2}>
          <BottomTreesLayer2 />
        </div>
        <div className={styles.bottomMountainsLayer1}>
          <BottomMountainsLayer1 />
        </div>
        <div className={styles.bottomMountainsLayer2}>
          <BottomMountainsLayer2 />
        </div>
        <div className={styles.bottomMountainsLayer3}>
          <BottomMountainsLayer3 />
        </div>
        <div className={styles.bottomMountainsLayer4}>
          <BottomMountainsLayer4 />
        </div>
      </div>
    </div>
  );
};

export default Hero;

export const HeaderType = {
  id: PropTypes.string,
  className: PropTypes.string,
};
Hero.defaultProps = {
  id: "",
  className: "",
};
Hero.propTypes = HeaderType;
