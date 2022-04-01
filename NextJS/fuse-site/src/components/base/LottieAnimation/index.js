import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import lottie from 'lottie-web';

export default function LottieAnimation({
  animationRef,
  className,
  animationPath,
}) {
  const elRef = useRef();
  useEffect(() => {
    const element = elRef.current;
    const animation = lottie.loadAnimation({
      container: element,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: animationPath,
    });

    // eslint-disable-next-line no-param-reassign
    animationRef.current = animation;
  }, [animationPath, animationRef]);
  return <div className={className} ref={elRef} />;
}

LottieAnimation.defaultProps = {
  className: null,
};

LottieAnimation.propTypes = {
  animationRef: PropTypes.shape().isRequired,
  animationPath: PropTypes.string.isRequired,
  className: PropTypes.string,
};
