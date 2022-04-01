import Image from 'next/image';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Col, Grid, Row } from '~grid';
import * as styles from './BioSection.module.scss';
import CarouselSection, {
  CarouselType,
} from '~baseComponents/Sections/CarouselSection/CarouselSection';

export default function CarouselContainerSection({
  className,
  carousel,
  ...props
}) {
  // console.log(`CarouselContainerSection props: `, props);
  // return null;

  return (
    <div
      {...props}
      id="carouselContainerSection"
      className={cx(styles.component, className)}
    >
      <div className={styles.showOnMobile}>
        <CarouselSection {...carousel} />
      </div>
      <div className={styles.showOnDesktop}>
        <div className={styles.contCards}>
          <Grid>
            <Row>
              {carousel.carouselCards.map((card, index) => (
                <Col key={index} xs={12} md={4} xl={4}>
                  <div className={styles.contCard}>
                    <div className={styles.contImage}>
                      <div className={styles.overlay}>
                        <Image
                          alt={card.image.alt}
                          src={card.image.url}
                          objectFit="cover"
                          layout="fill"
                          className={styles.image}
                        />
                      </div>
                      <div className={styles.contInfo}>
                        <div className={styles.nick}>
                          <span>{card.nick}</span>
                        </div>
                        <div className={styles.followers}>
                          <span>{card.followers} followers</span>
                        </div>
                        <div className={styles.text}>
                          <span>{card.description}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Grid>
        </div>
      </div>
    </div>
  );
}

CarouselContainerSection.defaultProps = {
  className: '',
};

export const CarouselContainerType = PropTypes.shape({
  className: PropTypes.string,
  carousel: CarouselType.isRequired,
});
CarouselContainerSection.propTypes = CarouselContainerType.isRequired;
