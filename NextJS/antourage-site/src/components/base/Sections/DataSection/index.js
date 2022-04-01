import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Controller, Scene } from 'react-scrollmagic';
// Styles
import * as styles from './DataSection.module.scss';
import AnimationSection from './AnimationSection';

export default function DataSection({
  className,
  changeTime,
  speedTime,
  cards,
  ...props
}) {
  // console.log(`DataSection props: `, props);
  // return null;
  const [headerHeight, setHeaderHeight] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    setHeaderHeight(document.getElementById('stickyHeader').clientHeight);
    window.addEventListener('resize', () => {
      setWindowHeight(window.innerHeight);
    });
  }, []);

  return (
    <div
      {...props}
      id="dataSection"
      className={cx(styles.component, className)}
    >
      <div className={styles.contScroll}>
        <Controller>
          <Scene
            duration={`${cards.length * 100}%`}
            triggerHook="onLeave"
            offset={-headerHeight}
            indicators={false}
            pin
            reverse
          >
            {(progress, event) => (
              <div>
                <AnimationSection
                  event={event}
                  progress={progress}
                  cards={cards}
                  changeTime={changeTime}
                  speedTime={speedTime}
                  headerHeight={headerHeight}
                  windowHeight={windowHeight}
                />
              </div>
            )}
          </Scene>
        </Controller>
      </div>
    </div>
  );
}

DataSection.defaultProps = {
  className: '',
};

export const DataSectionType = PropTypes.shape({
  className: PropTypes.string,
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
});
DataSection.propTypes = DataSectionType.isRequired;
