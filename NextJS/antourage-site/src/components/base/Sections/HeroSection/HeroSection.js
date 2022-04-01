import cx from 'classnames';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { ImageType, LinkType } from '~types';
import { Col, Grid, Row } from '~grid';
import * as styles from './HeroSection.module.scss';
import Button from '~baseComponents/Button';

export default function HeroSection({
  className,
  baseColors,
  title,
  image,
  link,
  ...props
}) {
  // console.log(`HeroSection props: `, props);
  // return null;
  return (
    <div className={cx(styles.component, className)} {...props}>
      <div className={styles.container}>
        <div className={styles.contImage}>
          <div className={styles.overlay}>
            <Image
              alt={image.alt}
              src={image.url}
              objectFit="cover"
              layout="fill"
              className={styles.image}
            />
          </div>
        </div>
        <div className={styles.contWrapper}>
          <Grid className={styles.contInfo}>
            <Row className={styles.contRow}>
              <Col xs={12} mdOffset={1} md={8}>
                <div className={styles.box}>
                  <p className={styles.title}>{title}</p>
                  <div className={styles.contButton}>
                    <Button
                      className={styles.button}
                      baseColors={baseColors}
                      target={link.openInANewTab ? '_blank' : '_self'}
                      href={link.slug}
                    >
                      <span>{link.label}</span>
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    </div>
  );
}

HeroSection.defaultProps = {
  className: '',
};

export const HeroSectionType = PropTypes.shape({
  className: PropTypes.string,
  baseColors: PropTypes.string,
  title: PropTypes.string.isRequired,
  image: ImageType.isRequired,
  link: LinkType.isRequired,
});
HeroSection.propTypes = HeroSectionType.isRequired;
