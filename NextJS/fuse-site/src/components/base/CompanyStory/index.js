/* eslint-disable prettier/prettier */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import cx from 'classnames';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Link from 'next/link';

import {
  ReadmoreIcon,
  GlobeIcon,
  SuitcaseIcon,
  SmallVerticalDivider,
  // PortfolioStoryLeftBackground,
} from '~baseComponents/Icons';
import styles from './CompanyStory.module.scss';
import { Col } from '~grid';
import { CompanyType } from '~shared';
import RichText from '~baseComponents/RichText';
import SimpleAudioPlayer from '~baseComponents/SimpleAudioPlayer';
import MicrophonePaused from '~assets/icons/microphone_paused.svg';
import MicrophonePlaying from '~assets/icons/microphone_playing.svg';

const CompanyStory = ({
  selectedCompany,
  currentGrid,
  startIndex,
  className,
}) => {
  const [currentFullStory, setCurrentFullStory] = useState({});

  const handleShowFullStory = (index, element) => {
    if (index === currentFullStory.index) {
      setCurrentFullStory({});
    } else {
      setCurrentFullStory({ index, ...element });
    }
  };

  const handleGrid = (index) => {
    if (Array.isArray(currentGrid)) {
      return currentGrid[index];
    }
    return currentGrid;
  };

  return (
    <div className={cx(styles.wrapper, styles[className])}>
      {selectedCompany.testimonials.map(
        (
          { authorPhoto, audio, testimonial, fullStory, linkToFullStory },
          index,
        ) => {
          const showOnRightSide = (startIndex + index) % 2 === 1;
          const hasAltPhotos =
            selectedCompany.altPhotoInner &&
            selectedCompany.altPhotoInner.width &&
            selectedCompany.altPhotoOuter &&
            selectedCompany.altPhotoOuter.width;
          const grid = handleGrid(startIndex + index);
          // const shouldRenderBackground = index % 2 === 0;
          return (
            <>
              <div
                id={selectedCompany.identifier}
                name={selectedCompany.identifier}
                className={cx(styles.storiesWrapper, grid)}
              >
                {/* {shouldRenderBackground && (
                      <PortfolioStoryLeftBackground
                        className={styles.customBackground}
                      />
                    )} */}
                <div
                  className={cx(styles.testimonials, {
                    [styles.testimonialsNoMargin]:
                      currentFullStory.content &&
                      currentFullStory.index === index,
                  })}
                >
                  <div
                    className={cx(styles.testimonialsImages, {
                      [styles.testimonialsImagesRight]: !showOnRightSide,
                      [styles.testimonialsImagesLeft]: showOnRightSide,
                    })}
                  >
                    <img
                      className={styles.testimonialsImagesAuthorPhoto}
                      src={authorPhoto.url}
                      alt={authorPhoto.alt}
                    />
                    {selectedCompany?.companyLogo.width && (
                      <img
                        className={styles.testimonialsImagesCompanyLogo}
                        src={selectedCompany.companyLogo.url}
                        alt={selectedCompany.companyLogo.alt}
                      />
                    )}
                  </div>
                  <div className={styles.testimonialsBody}>
                    <RichText
                      pStyle={styles.testimonialsRelate}
                      content={testimonial}
                    />
                    <div
                      className={cx(styles.testimonialsRelateAudioWrapper, {
                        [styles.testimonialsRelateAudioWrapperAtLeft]:
                          !showOnRightSide,
                        [styles.testimonialsRelateAudioWrapperAtRight]:
                          showOnRightSide,
                      })}
                    >
                      <SimpleAudioPlayer
                        className={styles.microphoneWrapper}
                        audioUrl={audio.url}
                      >
                        {({ playing }) => (
                          <>
                            {!playing && (
                              <img
                                src={MicrophonePaused.src}
                                alt=""
                                width="13"
                                height="18"
                              />
                            )}
                            {playing && (
                              <img
                                src={MicrophonePlaying.src}
                                alt=""
                                width="13"
                                height="18"
                              />
                            )}
                            <span>Hear My Story</span>
                          </>
                        )}
                      </SimpleAudioPlayer>
                      {linkToFullStory && (
                        <>
                          <SmallVerticalDivider />
                          <Link href={`/blog/${linkToFullStory}`} passHref>
                            Full Story
                          </Link>
                        </>
                      )}
                    </div>
                    {fullStory && (
                      <div
                        className={cx(styles.readmoreWrapper, {
                          [styles.readmoreWrapperAtLeft]: !showOnRightSide,
                          [styles.readmoreWrapperAtRight]: showOnRightSide,
                        })}
                        onClick={() => handleShowFullStory(index, fullStory)}
                      >
                        <span>Learn about {selectedCompany.companyName}</span>
                        <ReadmoreIcon />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {currentFullStory.content && currentFullStory.index === index && (
                <Col
                  xs={11}
                  xsOffset={showOnRightSide ? 0 : 1}
                  lgOffset={showOnRightSide ? 2 : 4}
                  lg={8}
                  className={styles.fullStory}
                >
                  <div className={styles.fullStoryCompanyData}>
                    {selectedCompany.companyName && (
                      <p className={styles.fullStoryCompanyDataName}>
                        {selectedCompany.companyName}
                      </p>
                    )}
                    <div className={styles.fullStoryCompanyDataLinks}>
                      {selectedCompany.companyWebsite && (
                        <>
                          <span>
                            <Link
                              href={selectedCompany.companyWebsite}
                              passHref
                            >
                              <a href="..." target="_blank">
                                <GlobeIcon />
                                Company Website
                              </a>
                            </Link>
                          </span>
                          <SmallVerticalDivider />
                        </>
                      )}
                      {selectedCompany.companyCareersPage && (
                        <span>
                          <Link
                            href={selectedCompany.companyCareersPage}
                            passHref
                          >
                            <a href="..." target="_blank">
                              <SuitcaseIcon />
                              Careers Page
                            </a>
                          </Link>
                        </span>
                      )}
                    </div>
                  </div>
                  <div
                    className={cx(styles.fullStoryCompanyRelate, {
                      [styles.fullStoryCompanyRelateWithPadding]: !hasAltPhotos,
                    })}
                  >
                    <RichText
                      pStyle={styles.fullStoryRelate}
                      content={currentFullStory}
                    />
                  </div>
                  <div
                    className={cx(styles.fullStoryCompanyAltPhoto, {
                      [styles.fullStoryCompanyAltPhotoAtRight]: showOnRightSide,
                      [styles.fullStoryCompanyAltPhotoNoInner]:
                        !selectedCompany.altPhotoInner?.url,
                    })}
                  >
                    {selectedCompany.altPhotoInner?.url && (
                      <img
                        className={cx({
                          [styles.fullStoryCompanyAltPhotoInnerAtLeft]:
                            !showOnRightSide,
                          [styles.fullStoryCompanyAltPhotoInnerAtRight]:
                            showOnRightSide,
                        })}
                        src={selectedCompany.altPhotoInner.url}
                        alt={selectedCompany.altPhotoInner.alt}
                      />
                    )}
                    {selectedCompany.altPhotoOuter?.url && (
                      <img
                        className={cx({
                          [styles.fullStoryCompanyAltPhotoOuterAtRight]:
                            showOnRightSide,
                          [styles.fullStoryCompanyAltPhotoOuterAtLeft]:
                            !showOnRightSide,
                        })}
                        src={selectedCompany.altPhotoOuter.url}
                        alt={selectedCompany.altPhotoOuter.alt}
                      />
                    )}
                  </div>
                </Col>
              )}
            </>
          );
        },
      )}
    </div>
  );
};

CompanyStory.defaultProps = {
  className: null,
};

CompanyStory.propTypes = {
  selectedCompany: CompanyType.isRequired,
  currentGrid: PropTypes.arrayOf(PropTypes.string).isRequired,
  startIndex: PropTypes.number.isRequired,
  className: PropTypes.string,
};

export default CompanyStory;
