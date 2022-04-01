import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import LottieAnimation from '~baseComponents/LottieAnimation';
import * as styles from './IntroAnimation.module.scss';
import useIsMobile from '~hooks/useIsMobile';

export default function IntroAnimation({
  isAnimationCompleted,
  onAnimationCompleteHandler,
}) {
  const isMobile = useIsMobile(1200);
  const animationPath = isMobile
    ? './preloader-mobile.json'
    : './preloader-desktop.json';

  return (
    <motion.div
      animate={!isAnimationCompleted ? 'open' : 'closed'}
      transition={{ duration: 0.5 }}
      variants={{
        open: { y: 0 },
        closed: { y: '-100vh' },
      }}
      className={styles.component}
    >
      <LottieAnimation
        className={styles.animation}
        onAnimationCompleteHandler={onAnimationCompleteHandler}
        animationPath={animationPath}
      />
    </motion.div>
  );
}

IntroAnimation.propTypes = {
  isAnimationCompleted: PropTypes.bool.isRequired,
  onAnimationCompleteHandler: PropTypes.func.isRequired,
};
