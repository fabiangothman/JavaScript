/* eslint-disable no-underscore-dangle */
import { useEffect } from 'react';
import styles from './CircleAnimation.module.scss';

function CircleAnimation() {
  useEffect(() => {
    const timeout = setTimeout(() => {
      window._ANTOURAGE.show();
      window._ANTOURAGE_CONFIG.widget_hidden = false;
    }, 3200);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className={styles.container}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="images/o.svg" alt="Antourage" />
    </div>
  );
}

export default CircleAnimation;
