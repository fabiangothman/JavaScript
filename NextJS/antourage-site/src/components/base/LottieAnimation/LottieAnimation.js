import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import lottie from 'lottie-web';

export default function LottieAnimation({
  animationRef,
  className,
  animationPath,
  player,
  preserveAspectRatio,
  progressiveLoad,
  rendererType,
  ...props
}) {
  const elRef = useRef();
  useEffect(() => {
    const element = elRef.current;
    const animation = lottie.loadAnimation({
      container: element,
      renderer: rendererType,
      loop: false,
      autoplay: false,
      path: animationPath,
      rendererSettings: {
        preserveAspectRatio,
        progressiveLoad,
      },
      ...player,
    });

    // eslint-disable-next-line no-param-reassign
    animationRef.current = animation;
  }, [
    animationPath,
    animationRef,
    player,
    preserveAspectRatio,
    progressiveLoad,
    rendererType,
  ]);
  return <div className={className} ref={elRef} {...props} />;
}

LottieAnimation.defaultProps = {
  className: null,
  player: null,
  preserveAspectRatio: 'xMidYMid meet',
  progressiveLoad: true,
  rendererType: 'svg',
};

LottieAnimation.propTypes = {
  animationRef: PropTypes.shape().isRequired,
  animationPath: PropTypes.string.isRequired,
  className: PropTypes.string,
  preserveAspectRatio: PropTypes.string,
  progressiveLoad: PropTypes.bool,
  rendererType: PropTypes.string,
  player: PropTypes.shape(),
};
