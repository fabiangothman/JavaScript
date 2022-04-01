import { useEffect, useState } from 'react';
import Image from 'next/image';
import _sample from 'lodash/sample';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Col, Grid, Row } from '~grid';
import { ImageType, LinkType } from '~types';
import * as styles from './EngageSection.module.scss';
import Button from '~baseComponents/Button';

export default function EngageSection({ className, title, cards, ...props }) {
  // console.log(`EngageSection props: `, props);
  // return null;
  const baseColors = ['green', 'purple', 'red', 'blue'];
  const [colorsRandom, setColorsRandom] = useState(
    Array(...Array(cards.length)).map(() => baseColors[0]),
  );
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const newColors = colorsRandom.map(() => _sample(baseColors));
    setColorsRandom(newColors);
  }, []);

  return (
    <div
      {...props}
      id="engageSection"
      className={cx(styles.component, className)}
    >
      <p className={styles.title}>{title}</p>
      <div className={styles.contCards}>
        <Grid>
          <Row>
            {cards.map((card) => (
              <Col key={card.sysId} xs={12} md={6} lg={4}>
                <div className={styles.card}>
                  <div className={styles.contCardHead}>
                    <div className={styles.contImage}>
                      <Image
                        alt={card.image.alt}
                        src={card.image.url}
                        width={card.image.width}
                        height={card.image.height}
                        objectFit="fill"
                        layout="responsive"
                        className={styles.image}
                      />
                    </div>
                  </div>
                  <div className={styles.contCardBody}>
                    <div className={styles.contInfo}>
                      <div className={styles.name}>
                        <span>{card.name.toUpperCase()}</span>
                      </div>
                      <div className={styles.text}>
                        <span>{card.text}</span>
                      </div>
                      <Button
                        href={card.button.slug}
                        target={card.button.openInANewTab ? '_blank' : '_self'}
                        baseColors={`WhiteBlack_Hover${card.color}White`}
                        // className={styles[colorsRandom[index]]}
                      >
                        <span>{card.button.label}</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Grid>
      </div>
    </div>
  );
}

EngageSection.defaultProps = {
  className: '',
};

export const EngageSectionType = PropTypes.shape({
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      button: LinkType.isRequired,
      image: ImageType.isRequired,
      name: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      sysId: PropTypes.string.isRequired,
    }),
  ).isRequired,
});
EngageSection.propTypes = EngageSectionType.isRequired;
