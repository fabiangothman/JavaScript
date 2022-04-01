import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles.module.css';

function CameraCompletedScreen({ cameraId }) {
  return (
    <div id={`${cameraId}-completed-screen`} className={styles.completedScreen}>
      <div className={styles.message}>Processing…</div>
    </div>
  );
}

export default CameraCompletedScreen;
CameraCompletedScreen.defaultProps = {
  cameraId: 'myCamera',
};
CameraCompletedScreen.propTypes = {
  cameraId: PropTypes.string,
};
