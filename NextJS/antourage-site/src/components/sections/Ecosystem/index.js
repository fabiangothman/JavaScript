import PropTypes from 'prop-types';
import { useContext, useEffect, useRef, useState } from 'react';
import { Grid, Row, Col } from '~grid';
import EcosystemBlock from './EcosystemBlock';
import BigFansModule from '~baseComponents/BigFansModule';
import LottieAnimation from '~baseComponents/LottieAnimation';
import styles from './Ecosystem.module.scss';
import { ScrollProviderContext } from '~baseComponents/ScrollProvider';

const Ecosystem = ({ blocks, bigfans }) => {
  const scrollContext = useContext(ScrollProviderContext);
  const wrapperRef = useRef();
  const animationRef = useRef();
  const blocksRef = useRef();
  const offsets = useRef([0]);
  const offsetFixed = useRef([0, 0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const prevIndex = useRef(0);
  const viewportHeightRef = useRef(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!blocks || blocks.length === 0) {
      return null;
    }

    animationRef.current.addEventListener('DOMLoaded', () => {
      animationRef.current.setSpeed(3);

      const currentAnimationBlock = blocks[currentIndex];
      let startFrame = currentAnimationBlock.animationStartFrame;
      const endFrame = currentAnimationBlock.animationEndFrame;

      if (currentIndex === 0) {
        startFrame = 0;
      }

      animationRef.current.playSegments([startFrame, endFrame], true);
    });

    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let startFrame = 0;
    let endFrame = 0;
    if (!blocks || blocks.length === 0) {
      return null;
    }

    if (animationRef.current.isLoaded) {
      const prev = prevIndex.current;
      const currentAnimationBlock = blocks[currentIndex];
      const prevAnimationBlock = blocks[prev];

      if (currentIndex > prev) {
        if (currentIndex < blocks.length - 1) {
          startFrame = currentAnimationBlock.animationStartFrame;
          endFrame = currentAnimationBlock.animationEndFrame;
        } else {
          startFrame = prevAnimationBlock.animationEndFrame;
          endFrame = prevAnimationBlock.animationStartFrame;
        }
      } else {
        startFrame = prevAnimationBlock.animationEndFrame;
        endFrame = prevAnimationBlock.animationStartFrame;
      }
      if (!startFrame || !endFrame) {
        const lastBlock = blocks.length - 2;
        endFrame = blocks[lastBlock].animationEndFrame;
        startFrame = blocks[lastBlock].animationStartFrame;
      }
    }
    animationRef.current.playSegments([startFrame, endFrame], true);

    prevIndex.current = currentIndex;

    return null;
  }, [currentIndex, blocks]);

  useEffect(() => {
    if (!blocks || blocks.length === 0) {
      return null;
    }

    const recalculateSizes = ({ viewportHeight }) => {
      viewportHeightRef.current = viewportHeight;
      const { length } = blocks;

      const doc = document.documentElement;
      const top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

      wrapperRef.current.style.height = `${100 * length}vh`;

      const rect = wrapperRef.current.getBoundingClientRect();

      const offset = top + rect.top;

      offsetFixed.current[0] = offset;
      offsetFixed.current[1] = offset + length * viewportHeight;

      const sectionOffsets = [];

      for (let i = 0; i < length; i += 1) {
        sectionOffsets.push(offset + i * viewportHeight - viewportHeight / 3);
      }

      offsets.current = sectionOffsets;
    };

    const handleScroll = ({ scrollTop }) => {
      const { length } = blocks;

      let newCurrentIndex = 0;

      for (let i = 0; i < length; i += 1) {
        if (scrollTop >= offsets.current[i]) {
          newCurrentIndex = i;
        }
      }
      if (newCurrentIndex !== currentIndex) {
        setCurrentIndex(newCurrentIndex);
      }

      // blocksRef.current.style.transform = `translateY(${Math.min(0, Math.max(-scrollTop + offsetFixed.current[0], - (length - 2) * viewportHeightRef.current))}px)`

      setProgress(
        Math.max(
          (scrollTop - offsetFixed.current[0]) / viewportHeightRef.current,
          0,
        ),
      );
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
  }, [scrollContext, currentIndex, blocks]);

  if (!blocks || blocks.length === 0) {
    return null;
  }

  return (
    <section className={styles.wrapper} ref={wrapperRef}>
      <div className={styles.blocks} ref={blocksRef}>
        {blocks.map((item, index) => {
          return (
            <EcosystemBlock
              first={index === 0}
              current={index === currentIndex}
              last={index === blocks.length - 1}
              title={item.title}
              mobileAsset={`images/ecosystem/ecosys_${index + 1}.png`}
              key={`ecosystem-block-${index}`}
              content={item.content}
              ctaLink={item.ctaLink}
              ctaText={item.ctaText}
              ctaColor={item.color}
              openLinkInNewTab={item.openLinkInNewTab}
              animationStartFrame={item.animationStartFrame}
              animationEndFrame={item.animationEndFrame}
            />
          );
        })}
      </div>
      <div className={styles.fixedContainer}>
        <Grid className={styles.grid}>
          <Row>
            <Col
              xs={12}
              lg={7}
              lgOffset={5}
              lgLast
              className={styles.animationColumn}
            >
              {currentIndex <= blocks.length - 1 ? (
                <LottieAnimation
                  animationRef={animationRef}
                  className={styles.animation}
                  animationPath="/animations/ecosys/ecosys.json"
                />
              ) : null}
            </Col>
          </Row>
        </Grid>
        {currentIndex >= blocks.length - 2 && (
          <BigFansModule {...bigfans} progress={progress - 2} />
        )}
      </div>
    </section>
  );
};

Ecosystem.defaultProps = {
  blocks: null,
  bigfans: null,
};

Ecosystem.propTypes = {
  blocks: PropTypes.arrayOf(PropTypes.shape()),
  bigfans: PropTypes.shape({}),
};

export default Ecosystem;
