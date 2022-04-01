import cx from 'classnames';
import Image from 'next/image';
import PropTypes from 'prop-types';
import RichText, { RichTextTypes } from '~baseComponents/RichText';
import { ImageType, LinkType } from '~types';
import { Col, Grid, Row } from '~grid';
import * as styles from './CaseStudySection.module.scss';
import Button from '~baseComponents/Button';

export default function CaseStudySection({
  className,
  baseColors,
  title,
  description,
  image,
  link,
  ...props
}) {
  // console.log(`CaseStudySection props: `, props);
  // return null;
  return (
    <div className={cx(styles.component, className)} {...props}>
      <div className={styles.container}>
        <div className={styles.contImage}>
          <Image
            alt={image.alt}
            src={image.url}
            objectFit="cover"
            layout="fill"
            className={styles.image}
          />
        </div>
        <Grid className={styles.contGrid}>
          <Row className={styles.contRow}>
            <Col xs={12} lg={12}>
              <div className={styles.contContent}>
                <div className={styles.content}>
                  <p className={styles.case}>CASE STUDY</p>
                  <p className={styles.title}>{title}</p>
                  <div className={styles.contText}>
                    <RichText
                      headingStyle={styles.title}
                      pStyle={styles.text}
                      content={description}
                    />
                  </div>
                  <div className={styles.contButton}>
                    <Button
                      baseColors={baseColors}
                      target={link.openInANewTab ? '_blank' : '_self'}
                      href={link.slug}
                    >
                      <span>{link.label}</span>
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    </div>
  );
}

CaseStudySection.defaultProps = {
  className: '',
  baseColors: '',
};

export const CaseStudyType = PropTypes.shape({
  className: PropTypes.string,
  baseColors: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: RichTextTypes.isRequired,
  image: ImageType.isRequired,
  link: LinkType.isRequired,
});
CaseStudySection.propTypes = CaseStudyType.isRequired;
