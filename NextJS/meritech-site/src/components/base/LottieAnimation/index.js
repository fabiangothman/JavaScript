import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import lottie from 'lottie-web';

export default function LottieAnimation({
  onAnimationCompleteHandler,
  animationPath,
  ...props
}) {
  const elRef = useRef();
  useEffect(() => {
    const element = elRef.current;
    const animation = lottie.loadAnimation({
      container: element,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      path: animationPath,
    });

    animation.addEventListener('complete', onAnimationCompleteHandler);
    return () =>
      animation.removeEventListener('complete', onAnimationCompleteHandler);
  }, [animationPath, onAnimationCompleteHandler]);

  return <div ref={elRef} {...props} />;
}

LottieAnimation.propTypes = {
  onAnimationCompleteHandler: PropTypes.func.isRequired,
  animationPath: PropTypes.string.isRequired,
};
