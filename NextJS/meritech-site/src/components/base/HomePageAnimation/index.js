/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from 'react';
import _shuffle from 'lodash/shuffle';
import cx from 'classnames';
import { ImageType } from 'types';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import Image from 'next/image';
import FullScreenAnimation from '~baseComponents/FullScreenAnimation';
import * as styles from './HomePageAnimation.module.scss';
import RichText, { RichTextTypes } from '~baseComponents/RichText';

const Section = ({
  mobileBackground,
  background,
  text,
  logo,
  currentView,
  company,
  isPlaying,
  index,
}) => {
  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, y: '40%' },
  };
  const videoRef = useRef();
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);

  useEffect(() => {
    const pausePlay = async () => {
      try {
        if (isPlaying) {
          await videoRef.current.play();
        } else {
          await videoRef.current.pause();
        }
      } catch (error) {
        // ignore
      }
    };

    pausePlay();
  }, [isPlaying]);

  const getBackground = () => {
    if (isMobile && mobileBackground?.url) {
      return mobileBackground;
    }
    return background;
  };

  return (
    <div className={styles.component} data-company={company}>
      <div
        className={cx(
          styles.section,
          {
            [styles.sectionActived]: currentView === index + 1,
          },
          {
            [styles.sectionNext]: currentView < index + 1,
          },
          {
            [styles.sectionPrev]: currentView > index + 1,
          },
        )}
      >
        <div className={cx(styles.content, 'container')}>
          <motion.div
            transition={{ delay: currentView === index + 1 ? 0.4 : 0 }}
            animate={currentView === index + 1 ? 'open' : 'closed'}
            variants={variants}
            className={styles.image}
          >
            {logo?.url ? (
              <Image
                src={logo.url}
                layout="fixed"
                width={logo.width}
                height={logo.height}
              />
            ) : (
              <div />
            )}
          </motion.div>
          {text && (
            <motion.div
              transition={{ delay: currentView === index + 1 ? 0.5 : 0 }}
              animate={currentView === index + 1 ? 'open' : 'closed'}
              variants={variants}
            >
              <RichText
                pStyle={styles.title}
                headingStyle={styles.title}
                content={text}
              />
            </motion.div>
          )}
        </div>
        {getBackground()?.contentType?.includes('image') && (
          <span>
            <Image objectFit="cover" src={getBackground().url} layout="fill" />
          </span>
        )}

        {getBackground()?.contentType?.includes('video') && (
          <div className={styles.videoWrapper}>
            <video
              ref={videoRef}
              key={`video-${index}`}
              src={getBackground().url}
              loop
              playsInline
              autoPlay
              muted
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default function HomePageAnimation({
  pinnedPortfolios,
  highlightedPortfolios,
  numbersOfPortfolio,
  isAnimationCompleted,
}) {
  const portfolio = pinnedPortfolios.concat(
    _shuffle(highlightedPortfolios).slice(0, numbersOfPortfolio),
  );

  const elements = portfolio
    .filter((company) => company?.logo?.url && company?.background?.url)
    .map((section, index) => (props) => (
      <Section key={`section-${index}`} {...props} {...section} index={index} />
    ));

  return (
    <FullScreenAnimation
      elements={elements}
      isAnimationCompleted={isAnimationCompleted}
    />
  );
}

HomePageAnimation.propTypes = {
  pinnedPortfolios: PropTypes.arrayOf(
    PropTypes.shape({
      text: RichTextTypes.isRequired,
      logo: ImageType.isRequired,
      background: ImageType.isRequired,
      mobileBackground: ImageType,
    }),
  ).isRequired,
  highlightedPortfolios: PropTypes.arrayOf(
    PropTypes.shape({
      text: RichTextTypes.isRequired,
      logo: ImageType.isRequired,
      background: ImageType.isRequired,
      mobileBackground: ImageType,
    }),
  ).isRequired,
  numbersOfPortfolio: PropTypes.number.isRequired,
  isAnimationCompleted: PropTypes.bool.isRequired,
};

Section.propTypes = {
  text: RichTextTypes.isRequired,
  logo: ImageType.isRequired,
  background: ImageType.isRequired,
  mobileBackground: ImageType.isRequired,
  currentView: PropTypes.number.isRequired,
  company: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};
