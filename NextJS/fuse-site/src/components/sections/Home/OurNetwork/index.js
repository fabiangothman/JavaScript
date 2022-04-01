import PropTypes from 'prop-types';
import { useContext, useEffect, useRef, useState } from 'react';
import { Grid, Row, Col } from '~grid';
import OurNetworkItem from '~sections/Home/OurNetwork/OurNetworkItem';
import LottieAnimation from '~baseComponents/LottieAnimation';
import styles from './OurNetwork.module.scss';
import { ScrollProviderContext } from '~baseComponents/ScrollProvider';

const OurNetwork = ({ ourNetwork }) => {
  const scrollContext = useContext(ScrollProviderContext);
  const wrapperRef = useRef();
  const animationRef = useRef();
  const offsets = useRef([0]);
  const offsetFixed = useRef([0, 0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const prevIndex = useRef(0);

  useEffect(() => {
    if (!ourNetwork || ourNetwork.length === 0) {
      return null;
    }

    animationRef.current.addEventListener('DOMLoaded', () => {
      const currentNetworkItem = ourNetwork[currentIndex];
      let startFrame = currentNetworkItem.fields.animationFirstFrame;
      const endFrame = currentNetworkItem.fields.animationLastFrame;

      if (currentIndex === 0) {
        startFrame = 0;
      }

      animationRef.current.playSegments([startFrame, endFrame], true);
    });

    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!ourNetwork || ourNetwork.length === 0) {
      return null;
    }

    if (animationRef.current.isLoaded) {
      const prev = prevIndex.current;
      const currentNetworkItem = ourNetwork[currentIndex];
      const prevNetworkItem = ourNetwork[prev];

      let startFrame = 0;
      let endFrame = 0;

      if (currentIndex > prev) {
        startFrame = currentNetworkItem.fields.animationFirstFrame;
        endFrame = currentNetworkItem.fields.animationLastFrame;
      } else {
        startFrame = prevNetworkItem.fields.animationLastFrame;
        endFrame = prevNetworkItem.fields.animationFirstFrame;
      }

      animationRef.current.playSegments([startFrame, endFrame], false);
    }

    prevIndex.current = currentIndex;

    return null;
  }, [currentIndex, ourNetwork]);

  useEffect(() => {
    if (!ourNetwork || ourNetwork.length === 0) {
      return null;
    }

    const recalculateSizes = ({ viewportHeight }) => {
      const { length } = ourNetwork;

      const doc = document.documentElement;
      const top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

      wrapperRef.current.style.height = `${100 * length}vh`;

      const rect = wrapperRef.current.getBoundingClientRect();

      const offset = top + rect.top;

      offsetFixed.current[0] = offset;
      offsetFixed.current[1] = offset + (length - 1) * viewportHeight;

      const sectionOffsets = [];

      for (let i = 0; i < length; i += 1) {
        sectionOffsets.push(offset + i * viewportHeight - viewportHeight / 3);
      }

      offsets.current = sectionOffsets;
    };

    const handleScroll = ({ scrollTop }) => {
      const { length } = ourNetwork;

      if (
        scrollTop >= offsetFixed.current[0] &&
        scrollTop <= offsetFixed.current[1]
      ) {
        wrapperRef.current.classList.add(styles.fixed);
      } else {
        wrapperRef.current.classList.remove(styles.fixed);
      }

      let newCurrentIndex = 0;

      for (let i = 0; i < length; i += 1) {
        if (scrollTop >= offsets.current[i]) {
          newCurrentIndex = i;
        }
      }
      if (newCurrentIndex !== currentIndex) {
        setCurrentIndex(newCurrentIndex);
      }
    };

    const handleScreenResize = (ev) => {
      recalculateSizes(ev);
      handleScroll(ev);
    };

    scrollContext.addScrollEventListener(handleScroll);
    scrollContext.addResizeEventListener(handleScreenResize);

    return () => {
      scrollContext.removeScrollEventListener(handleScroll);
      scrollContext.removeResizeEventListener(handleScreenResize);
    };
  }, [scrollContext, currentIndex, ourNetwork]);

  if (!ourNetwork || ourNetwork.length === 0) {
    return null;
  }

  return (
    <section className={styles.wrapper} ref={wrapperRef}>
      <div className={styles.fixedContainer}>
        <Grid className={styles.grid}>
          <Row>
            <Col
              xs={12}
              lg={5}
              lgOffset={7}
              lgLast
              className={styles.animationColumn}
            >
              <LottieAnimation
                animationRef={animationRef}
                className={styles.animation}
                animationPath="/motifs.json"
              />
            </Col>
          </Row>
        </Grid>
        {ourNetwork.map((item, index) => {
          return (
            <OurNetworkItem
              first={index === 0}
              current={index === currentIndex}
              last={index === ourNetwork.length - 1}
              /* eslint-disable-next-line react/no-array-index-key */
              key={`our-network-item-${index}`}
              subtitle={item.fields.subtitle}
              personsName={item.fields.personsName}
              personsCompanyName={item.fields.personsCompanyName}
              title={item.fields.title}
              audioFile={item.fields.audioFile}
            />
          );
        })}
      </div>
    </section>
  );
};

OurNetwork.defaultProps = {
  ourNetwork: null,
};

OurNetwork.propTypes = {
  ourNetwork: PropTypes.arrayOf(PropTypes.shape()),
};

export default OurNetwork;
