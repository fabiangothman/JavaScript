import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles.module.css';

function CameraUploadScreen({ cameraId }) {
  return (
    <div id={`${cameraId}-upload-screen`} className={styles.uploadScreen}>
      <div className={styles.message}>
        Your video is uploading, please wait…
      </div>
    </div>
  );
}

export default CameraUploadScreen;
CameraUploadScreen.defaultProps = {
  cameraId: 'myCamera',
};
CameraUploadScreen.propTypes = {
  cameraId: PropTypes.string,
};
