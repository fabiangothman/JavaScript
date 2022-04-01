import React from 'react';
import Image from 'baseComponents/CmsImage';
import cx from 'classnames';
import { Grid, Row, Col } from 'grid';
import SectionWrapper from 'baseComponents/SectionWrapper';
import Subscribe from 'baseComponents/Subscribe';
// Styles
import styles from './SignUp.module.scss';
import '@splidejs/splide/dist/css/splide.min.css';

const SignUp = ({ id = "" }) => {
	const text = `Sign up for The Inflection Point, Your weekly dose of micro trends that will shape our world`;
	const signupImage = require(`../../../../public/images/signup-image2.png`);

	return (
  <SectionWrapper slug={id}>
    <div className={styles.component}>
      <Grid fluid className={styles.background}>
        <Row>
          <Col xs={12} lg={6}>
            <div className={cx(styles.contImage, styles.showOnDesktop)}>
              <Image
                alt="Featured sign up image"
                src={signupImage}
                objectFit="cover"
                layout="fill"
                className={styles.image}
              />
            </div>
          </Col>
          <Col xs={12} lg={5}>
            <div className={styles.contRightCol}>
              <div className={styles.text}>
                <span>{text}</span>
              </div>
              <div className={styles.contSubscribe}>
                <Subscribe />
              </div>
            </div>
          </Col>
          <Col xs={12}>
            <div className={cx(styles.contImage, styles.showOnMobile)}>
              <Image
                alt="Featured sign up image"
                src={signupImage}
                objectFit="cover"
                layout="fill"
                className={styles.image}
              />
            </div>
          </Col>
        </Row>
      </Grid>
    </div>
  </SectionWrapper>
	)
}

export default SignUp;
