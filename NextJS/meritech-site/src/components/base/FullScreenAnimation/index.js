/* eslint-disable react-hooks/exhaustive-deps */
import {
  useEffect,
  useRef,
  useState,
  useCallback,
  useContext,
  createContext,
} from 'react';
import {
  CircleWithASquare,
  SwipeUp,
  Mouse,
  TracedLine,
} from 'components/icons';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './FullScreenAnimation.module.scss';

const FullScreenAnimationContext = createContext({
  currentView: 1,
});

export const useFullScreenAnimationContext = () =>
  useContext(FullScreenAnimationContext);

export default function FullScreenAnimation({
  elements,
  isAnimationCompleted,
}) {
  const elementRef = useRef(null);
  const scrollPosition = useRef(0);
  const animationFrame = useRef(null);
  const totalHeight = useRef(0);
  const timelineDistance = useRef(0);
  const [currentView, setCurrentView] = useState(1);
  const timelineRef = useRef();

  const setCurrentViewByScrollPosition = useCallback(() => {
    const el = elementRef.current;
    if (!el) {
      return;
    }

    const maxHeight = totalHeight.current;
    const elHeight = maxHeight / elements.length;

    const currentEl =
      Math.min(
        Math.max(0, Math.floor((window.scrollY + elHeight / 2) / elHeight)),
        elements.length - 1,
      ) + 1;

    setCurrentView(currentEl);
    document.documentElement.classList.toggle(
      'sticky-scroll',
      window.scrollY <= maxHeight - elHeight,
    );
    document.documentElement.classList.toggle(
      'transparent-header',
      window.scrollY <= maxHeight,
    );
  }, [elements.length]);

  const updateHeight = () => {
    if (elements.length > 0) {
      totalHeight.current =
        elementRef.current.childNodes[0].childNodes[0].getBoundingClientRect()
          .height * elements.length;
    } else {
      totalHeight.current = 0;
    }
  };

  const calculateTimelineDistance = () => {
    timelineRef.current.style.setProperty(
      '--pageHeight',
      `${window.innerHeight}px`,
    );
    const timelineHeight =
      document.querySelector('#timeline')?.clientHeight ?? 0;
    const totalElements = elements.length;
    const distance = timelineHeight / totalElements;

    timelineDistance.current = distance;
  };

  const onResizeHandler = () => {
    updateHeight();
    calculateTimelineDistance();
    setCurrentViewByScrollPosition();
  };

  useEffect(() => {
    const scrollWatch = () => {
      animationFrame.current = requestAnimationFrame(scrollWatch);

      if (window.scrollY !== scrollPosition.current) {
        scrollPosition.current = window.scrollY;
        setCurrentViewByScrollPosition();
      }
    };

    scrollWatch();
    scrollPosition.current = window.scrollY;
    onResizeHandler();
    window.addEventListener('resize', onResizeHandler);
    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      window.removeEventListener('resize', onResizeHandler);

      document.documentElement.classList.remove(
        'transparent-header',
        'sticky-scroll',
      );
    };
  }, [elements.length]);

  const translateY = timelineDistance.current * currentView - 21;

  return (
    <FullScreenAnimationContext.Provider value={{ currentView }}>
      <div
        ref={timelineRef}
        style={{ '--pageHeight': '1px' }}
        className={cx(styles.timeline, {
          [styles.timelineVisible]: isAnimationCompleted,
        })}
      >
        <div id="timeline" className={styles.timelineLine} />
        <div
          style={{
            transform: `translateY(${translateY}px)`,
          }}
          className={cx(styles.timelinePoint)}
        >
          <CircleWithASquare />
        </div>
        <div className={cx(styles.timelineHighlight)}>PORTFOLIO HIGHLIGHT</div>
        <div className={cx(styles.timelineFinalPoint)}>
          <CircleWithASquare />
        </div>
        <div className={styles.timelineMouse}>
          <Mouse />
        </div>
        <div className={styles.timelineSwiperUp}>
          <p>Next</p>
          <SwipeUp />
        </div>
        <TracedLine className={styles.timelineTracedLine} />
      </div>
      <div ref={elementRef} className={styles.component}>
        <div className={styles.sticky}>
          {elements.map((Component, index) => {
            return (
              <section
                key={index}
                className={cx(styles.layer, {
                  [styles.currentView]: currentView === index + 1,
                })}
              >
                <Component
                  isActived={currentView === index + 1}
                  isPlaying={
                    currentView === index + 1 ||
                    currentView === index ||
                    currentView === index + 2
                  }
                  currentView={currentView}
                />
              </section>
            );
          })}
          ;
        </div>
      </div>
    </FullScreenAnimationContext.Provider>
  );
}

FullScreenAnimation.propTypes = {
  isAnimationCompleted: PropTypes.bool.isRequired,
  elements: PropTypes.arrayOf(PropTypes.func).isRequired,
};
