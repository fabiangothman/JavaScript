import React from 'react';
import styles from './WidgetDoor.module.scss';
import CanvasAnimation from '../CanvasAnimation';

const WidgetDoor = ({ children, config, isPinging, isActive, onClick }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>{children}</div>
      <CanvasAnimation
        onClick={onClick}
        config={config}
        isPinging={isPinging}
        isActive={isActive}
      />
    </div>
  );
};

export default WidgetDoor;
