import cx from 'classnames';
import Image from 'next/image';
import PropTypes from 'prop-types';
import RichText, { RichTextTypes } from '~baseComponents/RichText';
import { ImageType } from '~types';
import { Col, Grid, Row } from '~grid';
import * as styles from './StepsSection.module.scss';

export default function StepsSection({ className, steps, ...props }) {
  // console.log(`StepsSection props: `, props);
  // return null;
  return (
    <div className={cx(styles.component, className)} {...props}>
      <Grid>
        {steps.map((step, index) => (
          <Row key={index} className={styles.contRow}>
            <Col
              xs={12}
              mdOffset={1}
              md={5}
              className={
                step.imagePosition ? styles.hideIfDesktop : styles.showLeft
              }
            >
              <div className={styles.contImage}>
                <Image
                  alt={step.image.alt}
                  width={step.image.width}
                  height={step.image.height}
                  src={step.image.url}
                  layout="responsive"
                  objectFit="cover"
                  className={styles.image}
                />
              </div>
            </Col>
            <Col xs={12} mdOffset={1} md={4}>
              <div className={styles.contContent}>
                <div className={styles.content}>
                  <p className={styles.title}>{step.stepTitle}</p>
                  <div className={styles.contText}>
                    <RichText
                      headingStyle={styles.title}
                      pStyle={styles.text}
                      content={step.content}
                    />
                  </div>
                </div>
              </div>
            </Col>
            <Col
              xs={12}
              mdOffset={1}
              md={5}
              className={step.imagePosition ? styles.showRight : styles.hide}
            >
              <div className={styles.contImage}>
                <Image
                  alt={step.image.alt}
                  width={step.image.width}
                  height={step.image.height}
                  src={step.image.url}
                  layout="responsive"
                  objectFit="cover"
                  className={styles.image}
                />
              </div>
            </Col>
          </Row>
        ))}
      </Grid>
    </div>
  );
}

StepsSection.defaultProps = {
  className: '',
};

export const StepsSectionType = PropTypes.shape({
  content: RichTextTypes.isRequired,
  image: ImageType.isRequired,
  imagePosition: PropTypes.bool.isRequired,
  stepTitle: PropTypes.string.isRequired,
});
StepsSection.propTypes = {
  className: PropTypes.string,
  steps: PropTypes.arrayOf(StepsSectionType).isRequired,
};
