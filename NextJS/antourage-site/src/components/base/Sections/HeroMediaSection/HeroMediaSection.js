import cx from 'classnames';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { Col, Grid, Row } from '~grid';
import * as styles from './HeroMediaSection.module.scss';

export default function HeroMediaSection({
  className,
  sysId,
  title,
  text,
  ...props
}) {
  // console.log(`HeroMediaSection props: `, props);
  // return null;
  return (
    <div className={cx(styles.component, className)} {...props}>
      <div className={styles.shapesImage}>
        <Image
          alt="Shapes image"
          src="/images/shapes.png"
          width={1563}
          height={710}
          objectFit="contain"
          layout="fixed"
          className={styles.image}
        />
      </div>
      <div className={styles.shapesImageMobile}>
        <Image
          alt="Shapes image"
          src="/images/shapes_mobile.png"
          width={750}
          height={450}
          objectFit="contain"
          layout="fixed"
          className={styles.image}
        />
      </div>
      <div className={styles.blobsImage}>
        <Image
          alt="Blobs image"
          src="/images/blobs.png"
          width={1426}
          height={528}
          objectFit="contain"
          layout="fixed"
          className={styles.image}
        />
      </div>
      <div className={styles.blobsImageMobile}>
        <Image
          alt="Blobs image"
          src="/images/blobs_mobile.png"
          width={760}
          height={136}
          objectFit="contain"
          layout="fixed"
          className={styles.image}
        />
      </div>
      <div className={styles.laKingsImage}>
        <Image
          alt="Photo"
          src="/images/photo_pic.png"
          width={328}
          height={277}
          objectFit="contain"
          layout="fixed"
          className={styles.image}
        />
      </div>
      <div className={styles.playingBallImage}>
        <Image
          alt="Playing"
          src="/images/playing-ball.png"
          width={287}
          height={241}
          objectFit="contain"
          layout="fixed"
          className={styles.image}
        />
      </div>
      <div className={styles.teamImage}>
        <Image
          alt="Team"
          src="/images/team.png"
          width={330}
          height={325}
          objectFit="contain"
          layout="fixed"
          className={styles.image}
        />
      </div>
      <div className={styles.conferenceImage}>
        <Image
          alt="Conference"
          src="/images/conference.png"
          width={328}
          height={277}
          objectFit="contain"
          layout="fixed"
          className={styles.image}
        />
      </div>
      <div className={styles.volleyballImage}>
        <Image
          alt="Volleyball"
          src="/images/volleyball.png"
          width={285}
          height={286}
          objectFit="contain"
          layout="fixed"
          className={styles.image}
        />
      </div>
      <div className={styles.container}>
        <Grid>
          <Row>
            <Col xs={12}>
              <div className={styles.title}>
                <span>{title}</span>
              </div>
            </Col>
            <Col xs={12} lgOffset={3} lg={6}>
              <div className={styles.text}>
                <span>{text}</span>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    </div>
  );
}

HeroMediaSection.defaultProps = {
  className: '',
};

export const HeroMediaSectionType = PropTypes.shape({
  className: PropTypes.string,
  sysId: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
});
HeroMediaSection.propTypes = HeroMediaSectionType.isRequired;
