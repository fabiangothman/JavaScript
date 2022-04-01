/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import { useState } from 'react';
import cx from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import styles from './OurTeam.module.scss';
import { ImageType } from '~shared';
import { LinkedinIcon, OurTeamRedBars } from '~baseComponents/Icons';

import Tooltip from '~baseComponents/Tooltip';
import { Col, Row } from '~grid';
import AboutUsPerson5Lines from '~baseComponents/Icons/AboutUsPerson5Lines';
import AboutUsPerson3Lines from '~baseComponents/Icons/AboutUsPerson3Lines';
import LearnMoreIcon from '~assets/icons/learn-more.svg';

const OurTeam = ({ content }) => {
  const [appearingTooltip, setAppearingTooltip] = useState(null);

  return (
    <div className={styles.ourTeam}>
      <OurTeamRedBars className={styles.bars} />
      <div className={cx('container', styles.fullWidth)}>
        <p className={styles.title}>OUR TEAM</p>
        <div className={styles.wrapper}>
          {content.map((person, index) => {
            return (
              <Row
                className={cx(
                  styles.myPerson,
                  person.tooltipText &&
                    appearingTooltip === index &&
                    styles.showTooltipOnMobile,
                )}
              >
                <Col className={styles.blank1} xs={12} md={6} lg={4}>
                  <AboutUsPerson3Lines />
                  <AboutUsPerson5Lines className={styles.hide} />
                </Col>
                <Col className={styles.blank2} xs={12} md={6} lg={4}>
                  <AboutUsPerson5Lines />
                  <AboutUsPerson3Lines className={styles.hide} />
                </Col>
                <Col className={styles.myImage} xs={12} md={6} lg={4}>
                  {person.tooltipText && appearingTooltip === index && (
                    <Tooltip
                      customClass={styles.tooltip}
                      text={person.tooltipText}
                    />
                  )}
                  <Image
                    onMouseEnter={() => setAppearingTooltip(index)}
                    /* onMouseLeave={() => setAppearingTooltip(null)} */
                    className={styles.personPhoto}
                    src={person.photo.url}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="top center"
                    alt={person.photo.alt}
                  />
                  <div className={cx(styles.personAbout)}>
                    {person.linkedinUrl && (
                      <div className={styles.personAboutUrl}>
                        <Link href={person.linkedinUrl} passHref>
                          <a href="..." target="_blank">
                            <LinkedinIcon />
                          </a>
                        </Link>
                      </div>
                    )}
                    <div>
                      <span className={styles.personAboutRole}>
                        {person.role}
                      </span>
                      <span
                        className={styles.personAboutName}
                        onMouseEnter={() => setAppearingTooltip(index)}
                        onMouseLeave={() => setAppearingTooltip(null)}
                      >
                        {person.name}
                      </span>
                      <button
                        type="button"
                        className={styles.learnMore}
                        onClick={() => setAppearingTooltip(index)}
                      >
                        Learn More
                        <Image width="10" height="10" src={LearnMoreIcon.src} />
                      </button>
                    </div>
                  </div>
                </Col>
              </Row>
            );
          })}
        </div>
      </div>
    </div>
  );
};

OurTeam.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      linkedinUrl: PropTypes.string,
      name: PropTypes.string,
      photo: ImageType,
      role: PropTypes.string,
      sysId: PropTypes.string,
    }).isRequired,
  ).isRequired,
};

export default OurTeam;
