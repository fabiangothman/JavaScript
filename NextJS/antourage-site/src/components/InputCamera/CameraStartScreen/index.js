import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

// import RecordIcon from '~/assets/images/record.svg'
// import UploadIcon from '~/assets/images/upload.svg'
function CameraStartScreen({ cameraId }) {
  return (
    <div id={`${cameraId}-start-screen`} className={styles.startScreen}>
      <a className={cx('cameratag_upload', styles.uploadBtn)}>
        <p className={styles.caption}>Upload a video file</p>
      </a>
    </div>
  );
}

export default CameraStartScreen;
CameraStartScreen.defaultProps = {
  cameraId: 'myCamera',
};
CameraStartScreen.propTypes = {
  cameraId: PropTypes.string,
};
