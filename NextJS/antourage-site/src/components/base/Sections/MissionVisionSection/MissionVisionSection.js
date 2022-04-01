import cx from 'classnames';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { FileType, ImageType } from 'types';
import { DiagonalArrow } from 'components/icons';
import { Col, Grid, Row } from '~grid';
import * as styles from './MissionVisionSection.module.scss';
import Button from '~baseComponents/Button';

export default function MissionVisionSection({
  className,
  pdfFile,
  image,
  name,
  role,
  quote,
  missionTitle,
  missionText,
  visionTitle,
  visionText,
  ...props
}) {
  // console.log(`MissionVisionSection props: `, props);
  // return null;
  return (
    <div className={cx(styles.component, className)} {...props}>
      <div className={styles.content}>
        <Grid>
          <Row>
            <Col xs={12} md={6} lg={5} xlOffset={1} xl={5}>
              <div className={styles.colImage}>
                <div className={styles.outsideCont}>
                  <div className={styles.contImage}>
                    <Image
                      alt={image.alt}
                      src={image.url}
                      width={image.width}
                      height={image.height}
                      objectFit="contain"
                      layout="responsive"
                      className={styles.image}
                    />
                    <div className={styles.extraInfo}>
                      <div className={styles.name}>
                        <span>{name}</span>
                      </div>
                      <div className={styles.role}>
                        <span>{role}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={12} md={6} lg={7} xl={5}>
              <div className={styles.quote}>
                <span>{`“${quote}”`}</span>
              </div>
            </Col>
            <Col xs={12} xl={1} />
          </Row>
          <Row>
            <Col xs={12} mdOffset={1} md={5}>
              <div className={styles.radarIcon}>
                <Image
                  alt="radar icon"
                  src="/images/radar_icon.png"
                  width={49}
                  height={50}
                  objectFit="contain"
                  layout="intrinsic"
                />
              </div>
              <div className={styles.missionTitle}>
                <span>{missionTitle.toUpperCase()}</span>
              </div>
              <div className={styles.missionText}>
                <span>{missionText}</span>
              </div>
            </Col>
            <Col xs={12} md={5}>
              <div className={styles.radarIcon}>
                <Image
                  alt="eye icon"
                  src="/images/eye_icon.png"
                  width={49}
                  height={50}
                  objectFit="contain"
                  layout="intrinsic"
                />
              </div>
              <div className={styles.visionTitle}>
                <span>{visionTitle.toUpperCase()}</span>
              </div>
              <div className={styles.visionText}>
                <span>{visionText}</span>
              </div>
            </Col>
            <Col xs={12} md={1} />
            <Col xs={12} mdOffset={1} md={11}>
              <Button
                baseColors="GrayWhite_hover"
                href={pdfFile.slug}
                target={pdfFile.openInANewTab ? '_blank' : '_self'}
              >
                <span className={styles.buttonText}>
                  {pdfFile.label} <DiagonalArrow />
                </span>
              </Button>
            </Col>
          </Row>
        </Grid>
      </div>
    </div>
  );
}

MissionVisionSection.defaultProps = {
  className: '',
};

export const MissionVisionSectionType = PropTypes.shape({
  className: PropTypes.string,
  pdfFile: PropTypes.shape({
    label: PropTypes.string.isRequired,
    openInANewTab: PropTypes.bool.isRequired,
    pdfFile: FileType.isRequired,
  }).isRequired,
  image: ImageType.isRequired,
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  quote: PropTypes.string.isRequired,
  missionTitle: PropTypes.string.isRequired,
  missionText: PropTypes.string.isRequired,
  visionTitle: PropTypes.string.isRequired,
  visionText: PropTypes.string.isRequired,
});
MissionVisionSection.propTypes = MissionVisionSectionType.isRequired;
