import React, { useContext, useRef, useState } from 'react';
import useLayoutEffect from 'hooks/use-isomorphic-layout-effect';
import cx from 'classnames';
import { ScrollProviderContext } from 'baseComponents/ScrollProvider';
//  Styles
import styles from './ParallaxContent.module.scss';

const ParallaxContent = ({
  className = "",
  contRef = null,
  animationHeight = 200,
  animationInverse = false,
  animationToCenter = false,
  children = null,
  ...props
}) => {
  // console.log(`ParallaxContent animationHeight ${[className]}: `, animationHeight);
  // return null;
  
  const scrollContext = useContext(ScrollProviderContext);
  const animHeight = useRef();
  const animInverse = useRef();
  const animToCenter = useRef();
  const [parallaxPx, setParallaxPx] = useState(0);

  const inRange = (x, inverse = false, min = 0, max = animHeight.current) => (x>=min && x<=max) ? inverse ? x-max : -x : (x<min) ?inverse ? -1*max : -1*min : inverse ? -1*min : -1*max;
  const getRefProps = (ref) => ref.current.getBoundingClientRect();

  useLayoutEffect(() => {
    const setParallaxValues = () => {
      const objectProps = getRefProps(contRef);
      const windowHeight = window.innerHeight;
      const objectScrolled = -objectProps.top+windowHeight;
      const objScrollPerc = 100*objectScrolled/(objectProps.height+windowHeight);
      const animMove = (animHeight.current)*objScrollPerc/100;
      let parallax = inRange(animMove, animInverse.current);
      if(animToCenter.current) {
        if (parallax >= -animHeight.current/2) parallax = -1*(parallax + animHeight.current/2);
        else parallax = -1*parallax - animHeight.current/2;
      }
      setParallaxPx(parallax);
    }

    animHeight.current = animationHeight;
    animInverse.current = animationInverse;
    animToCenter.current = animationToCenter;
    const loadReference = (time = 300) => setTimeout(() => {
      if(contRef.current) {
        scrollContext.addResizeEventListener(setParallaxValues);
        scrollContext.addScrollEventListener(setParallaxValues);
      } else {
        loadReference();
      }
    }, time);
    loadReference();
  
    return () => {
      scrollContext.removeResizeEventListener(setParallaxValues);
      scrollContext.removeScrollEventListener(setParallaxValues);
    }
    
  }, [animationHeight, animationInverse, animationToCenter]);

  return (
    <div
      style={{
        transform: `translateY(${parallaxPx}px)`,
        height: !animationToCenter ? `calc(100% + ${animHeight.current}px)` : "",
      }}
      {...props}
      className={cx(styles.component, className)}
    >
      {children}
    </div>
  );
}

export default ParallaxContent;
