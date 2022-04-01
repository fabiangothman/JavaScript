import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import LottieAnimation from '~baseComponents/LottieAnimation';
// Styles
import * as styles from './DataSection.module.scss';

export default function AnimationSection({
  changeTime,
  speedTime,
  cards,
  progress,
  event,
  headerHeight,
  windowHeight,
}) {
  const rouletteRef = useRef();
  const splideRef = useRef();
  const [rouletteProperties, setRouletteProperties] = useState({
    ready: false,
    frameStart: 0,
    frameEnd: 0,
    width: 1,
    height: 500,
    duration: 0,
    syncSpeed: 0,
  });
  const [comparatorTextClass, setComparatorTextClass] = useState('show');
  const [sliderIndex, setSliderIndex] = useState(0);
  // 1: Mouse moving to up, -1: Mouse moving to bottom
  const [mouseDirection, setMouseDirecion] = useState(1);
  const [splideMounted, setSplideMounted] = useState(false);
  const [viewPortHeight, setViewPortHeight] = useState(0);
  const [innerHeight, setInnerHeight] = useState(0);
  const minHeightAvailable = 310;

  const animationHideArchievement = () => {
    setComparatorTextClass('hide');
    const activeRef = document.querySelector(
      '#dataSection .splide__slide.is-active.is-visible #contArch',
    );
    if (activeRef) activeRef.className = 'hide';
  };

  const handleCarouselMove = (splide) => {
    animationHideArchievement();
    /* eslint-disable no-underscore-dangle */
    rouletteRef.current.setSpeed(splide._options.rouletteSyncSpeed);
    if (splide._options.mouseDirection === -1) {
      // Move to right
      rouletteRef.current.setDirection(1);
      rouletteRef.current.playSegments(
        [0, splide._options.rouletteFrameEnd],
        true,
      );
    } else {
      // Move to left
      rouletteRef.current.setDirection(-1);
      rouletteRef.current.playSegments(
        [splide._options.rouletteFrameEnd, 0],
        true,
      );
    }
  };

  const handleCarouselResize = () => {
    if (rouletteRef.current && rouletteRef.current.isLoaded) {
      rouletteRef.current.resize();
      setRouletteProperties({
        ...rouletteProperties,
        width: rouletteRef.current.wrapper.clientWidth,
        height: rouletteRef.current.wrapper.clientHeight,
        ready: splideRef.current.options.rouletteReady,
        frameEnd: splideRef.current.options.rouletteFrameEnd,
        duration: splideRef.current.options.rouletteDuration,
        syncSpeed: splideRef.current.options.rouletteSyncSpeed,
      });
    }
  };

  const handleCarouselMoved = (splide, newIndex) => {
    setSliderIndex(newIndex);
    setComparatorTextClass('show');
    const activeRef = document.querySelector(
      '#dataSection .splide__slide.is-active #contArch',
    );
    if (activeRef) activeRef.className = 'show';
    setMouseDirecion(1);
  };

  let mY = 0;
  const move = (e) => {
    if ((e.type === 'touchmove' && e.touches[0].pageY < mY) || e.pageY < mY)
      setMouseDirecion(1);
    else if (
      (e.type === 'touchmove' && e.touches[0].pageY > mY) ||
      e.pageY > mY
    )
      setMouseDirecion(-1);
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    let isMounted = true;
    rouletteRef.current.addEventListener('DOMLoaded', () => {
      const frameEnd = rouletteRef.current.getDuration(true);
      const duration = rouletteRef.current.getDuration(false);
      const defSpeed = frameEnd / duration;
      const syncSpeed = frameEnd / speedTime / defSpeed;

      if (isMounted)
        setRouletteProperties({
          ...rouletteProperties,
          ready: true,
          width: rouletteRef.current.wrapper.clientWidth,
          height: rouletteRef.current.wrapper.clientHeight,
          frameEnd,
          duration,
          syncSpeed,
        });
    });

    // Add listeners to know the slide Y direction
    const splideElement = document.getElementById('data-splide');
    const pressEvents = ['mousedown', 'touchstart'];
    const moveEvents = ['mousemove', 'touchmove'];
    const dropEvents = ['mouseup', 'touchend'];

    pressEvents.map((pressE) =>
      splideElement.addEventListener(pressE, (splideE) => {
        if (splideE.type === 'touchstart') mY = splideE.touches[0].pageY;
        else mY = splideE.pageY;
        moveEvents.map((moveE) => splideElement.addEventListener(moveE, move));
      }),
    );
    dropEvents.map((dropE) =>
      splideElement.addEventListener(dropE, () => {
        moveEvents.map((moveE) =>
          splideElement.removeEventListener(moveE, move),
        );
      }),
    );

    // console.log("outerHeight: ", window.outerHeight);
    // console.log("innerHeight: ", window.innerHeight);
    // setViewPortHeight(window.outerHeight-headerHeight);
    setViewPortHeight(window.innerHeight - headerHeight);
    if (splideMounted) {
      const blockNumbers = 1 / cards.length;
      let numsAcum = 0;
      const cardsIndexes = [...cards.keys()];
      cardsIndexes.forEach((index) => {
        const nextNumber = numsAcum + blockNumbers;
        if (progress >= numsAcum && progress < nextNumber)
          splideRef.current.splide.go(index);
        numsAcum = nextNumber;
      });
      handleCarouselResize();
      setInnerHeight(window.innerHeight);
    }
    return () => {
      isMounted = false;
    };
  }, [rouletteRef, progress, event, windowHeight]);

  return (
    <div className={styles.container}>
      <div className={styles.roulette} style={{ height: viewPortHeight }}>
        <LottieAnimation
          animationRef={rouletteRef}
          className={styles.animation}
          rendererType="canvas"
          preserveAspectRatio="xMaxYMid slice"
          progressiveLoad
          animationPath="/dial_cropped_opened.json"
        />
      </div>
      <div className={styles.space} />
      <div className={styles.content}>
        <div id="cont-splide" className={styles.scrollContainer}>
          <Splide
            id="data-splide"
            options={{
              type: 'slide',
              autoplay: false,
              interval: changeTime * 1000,
              wheel: false,
              drag: false,
              releaseWheel: true,
              focus: 'center',
              arrows: false,
              pagination: false,
              perPage: 3,
              trimSpace: false,
              speed: speedTime * 1000,
              direction: 'ttb',
              perMove: 1,
              start: 0,
              waitForTransition: false,
              height: rouletteProperties.height,
              rouletteReady: rouletteProperties.ready,
              rouletteFrameEnd: rouletteProperties.frameEnd,
              rouletteDuration: rouletteProperties.duration,
              rouletteSyncSpeed: rouletteProperties.syncSpeed,
              mouseDirection,
            }}
            onMove={handleCarouselMove}
            onDragging={animationHideArchievement}
            onMoved={handleCarouselMoved}
            // onResize={handleCarouselResize}
            // onResized={handleCarouselResize}
            onMounted={() => setSplideMounted(true)}
            ref={splideRef}
          >
            {cards.map((card) => (
              <SplideSlide key={card.sysId}>
                <div className={styles.contCard}>
                  <div className={styles.card}>
                    <div
                      className={styles.contValues}
                      style={
                        innerHeight < minHeightAvailable
                          ? { paddingBottom: '0rem' }
                          : {}
                      }
                    >
                      <div className={styles.value}>
                        <span>{card.value}</span>
                      </div>
                      <div className={styles.sign}>
                        <span>{card.sign.toUpperCase()}</span>
                      </div>
                    </div>
                    <div id="contArch">
                      <div
                        className={styles.contArch}
                        style={
                          innerHeight < minHeightAvailable
                            ? { paddingTop: '0rem' }
                            : {}
                        }
                      >
                        <div className={styles.achievement}>
                          <span>{`${card.achievement.toUpperCase()}*`}</span>
                        </div>
                        <div className={styles.contBuss}>
                          <div className={styles.bussiness}>
                            <span>{card.business}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.hide}>
                  <span id="comparatorText">{card.comparator}</span>
                </div>
              </SplideSlide>
            ))}
          </Splide>
        </div>
        <div
          id="comparatorShowArea"
          className={[styles.comparator, comparatorTextClass].join(' ')}
        >
          <span>*{cards[sliderIndex].comparator}</span>
        </div>
      </div>
    </div>
  );
}

export const AnimationSectionType = PropTypes.shape({
  changeTime: PropTypes.number.isRequired,
  speedTime: PropTypes.number.isRequired,
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      achievement: PropTypes.string.isRequired,
      business: PropTypes.string.isRequired,
      comparator: PropTypes.string.isRequired,
      sign: PropTypes.string.isRequired,
      sysId: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    }),
  ).isRequired,
  progress: PropTypes.number.isRequired,
  event: PropTypes.func.isRequired,
  headerHeight: PropTypes.number.isRequired,
  windowHeight: PropTypes.number.isRequired,
});
AnimationSection.propTypes = AnimationSectionType.isRequired;
