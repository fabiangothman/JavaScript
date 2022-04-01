import { useEffect, useState } from 'react';
import Image from 'next/image';
import _sample from 'lodash/sample';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Col, Grid, Row } from '~grid';
import { ImageType } from '~types';
import * as styles from './PeopleSection.module.scss';

export default function PeopleSection({
  className,
  title,
  people,
  useTwoShapes,
  ...props
}) {
  // console.log(`PeopleSection props: `, props);
  // return null;
  const baseColors = ['green', 'purple', 'red', 'blue'];
  const [colorsRandom, setColorsRandom] = useState(
    Array(...Array(people.length)).map(() => baseColors[0]),
  );
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const newColors = colorsRandom.map(() => _sample(baseColors));
    setColorsRandom(newColors);
  }, []);

  return (
    <div
      {...props}
      id="peopleSection"
      className={cx(styles.component, className)}
    >
      <p className={styles.title}>{title}</p>
      <div className={styles.contCards}>
        <Grid>
          <Row>
            {people.map((person, index) => (
              <Col key={index} xs={12} md={6}>
                <div className={styles.contCard}>
                  <div className={styles.contImage}>
                    <Image
                      alt={person.image.alt}
                      src={person.image.url}
                      width={person.image.width}
                      height={person.image.height}
                      objectFit="contain"
                      layout="responsive"
                      className={cx(
                        styles.image,
                        // eslint-disable-next-line no-nested-ternary
                        useTwoShapes
                          ? index % 2
                            ? styles.secondShape
                            : null
                          : null,
                      )}
                    />
                    <div className={styles.contInfo}>
                      <div
                        className={cx(styles.name, styles[colorsRandom[index]])}
                      >
                        <span>{person.name}</span>
                      </div>
                      <div className={styles.role}>
                        <span>{person.role}</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.contText}>
                    <span>{person.description}</span>
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

PeopleSection.defaultProps = {
  className: '',
  useTwoShapes: false,
};

export const PeopleType = PropTypes.shape({
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  people: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string.isRequired,
      image: ImageType.isRequired,
      name: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      sysId: PropTypes.string.isRequired,
    }),
  ).isRequired,
  useTwoShapes: PropTypes.bool,
});
PeopleSection.propTypes = PeopleType.isRequired;
