import cx from 'classnames';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { FileType, ImageType } from 'types';
import { DiagonalArrow, Stain3 } from 'components/icons';
import { Col, Grid, Row } from '~grid';
import * as styles from './HeroStainsSection.module.scss';
import Button from '~baseComponents/Button';

export default function HeroStainsSection({
  className,
  leftImage,
  pdfFile,
  rightImage,
  text,
  title1,
  title2,
  title3,
  ...props
}) {
  // console.log(`HeroStainsSection props: `, props);
  // return null;
  return (
    <div className={cx(styles.component, className)} {...props}>
      <div className={styles.leftImage}>
        <Image
          alt={leftImage.alt}
          src={leftImage.url}
          objectFit="cover"
          layout="fill"
          className={styles.image}
        />
      </div>
      <div className={styles.contBlobs}>
        <Stain3 className={styles.topStain} />
        <div className={styles.rightImage}>
          <Image
            alt={rightImage.alt}
            src={rightImage.url}
            objectFit="cover"
            layout="fill"
            className={styles.image}
          />
        </div>
        <div className={styles.content}>
          <Grid>
            <Row>
              <Col xs={12} mdOffset={3} md={6}>
                <div className={styles.titlesArea}>
                  <p>{title1}</p>
                  <p>{title2}</p>
                  <p>{title3}</p>
                </div>
                <div className={styles.text}>
                  <span>{text}</span>
                </div>
                <div className={styles.contButton}>
                  <Button
                    baseColors="GrayWhite"
                    href={pdfFile.slug}
                    target={pdfFile.openInANewTab ? '_blank' : '_self'}
                  >
                    <span className={styles.buttonText}>{pdfFile.label}</span>
                    <DiagonalArrow />
                  </Button>
                </div>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    </div>
  );
}

HeroStainsSection.defaultProps = {
  className: '',
};

export const HeroStainsSectionType = PropTypes.shape({
  className: PropTypes.string,
  leftImage: ImageType.isRequired,
  pdfFile: PropTypes.shape({
    label: PropTypes.string.isRequired,
    openInANewTab: PropTypes.bool.isRequired,
    pdfFile: FileType.isRequired,
    externalUrl: PropTypes.string,
    slug: PropTypes.string.isRequired,
  }).isRequired,
  rightImage: ImageType.isRequired,
  text: PropTypes.string.isRequired,
  title1: PropTypes.string.isRequired,
  title2: PropTypes.string.isRequired,
  title3: PropTypes.string.isRequired,
});
HeroStainsSection.propTypes = HeroStainsSectionType.isRequired;
