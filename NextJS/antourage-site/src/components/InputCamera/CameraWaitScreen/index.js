import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles.module.css';

function CameraWaitScreen({ cameraId }) {
  return (
    <div id={`${cameraId}-wait-screen`} className={styles.waitScreen}>
      <div className={styles.message}>Pushing pixels, please wait…</div>
    </div>
  );
}

export default CameraWaitScreen;
CameraWaitScreen.defaultProps = {
  cameraId: 'myCamera',
};
CameraWaitScreen.propTypes = {
  cameraId: PropTypes.string,
};
