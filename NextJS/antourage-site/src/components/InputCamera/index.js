import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CameraStartScreen from './CameraStartScreen';
import CameraWaitScreen from './CameraWaitScreen';
import CameraUploadScreen from './CameraUploadScreen';
import CameraCompletedScreen from './CameraCompletedScreen';

function InputCamera({ appId, onUpload, onError, onChange, ...props }) {
  // console.log(`VideoFormSection props: `, props);
  // return null;
  const cameraId = 'myCamera';
  const [showCamera, setShowCamera] = useState(true);
  const resetCamera = () => {
    const myCamera = window.CameraTag.cameras[cameraId];
    setShowCamera(false);
    myCamera.reset();
  };
  const onPublish = (data) => {
    try {
      setShowCamera(false);
      resetCamera();
      onChange(false);
      onUpload(data.medias.mp4.urls.cameratag);
    } catch (error) {
      onChange(false);
      onUpload('');
      onError();
    }
  };

  const onStop = () => {
    onUpload('');
    onChange(false);
    onError();
  };

  const onStart = () => {
    onChange(true);
  };

  const onInit = () => {
    setShowCamera(true);
  };

  useEffect(() => {
    window.CameraTag.setup();
    window.CameraTag.observe(cameraId, 'cameraReset', onInit);
    window.CameraTag.observe(cameraId, 'uploadStarted', onStart);
    window.CameraTag.observe(cameraId, 'initialized', onInit);
    window.CameraTag.observe(cameraId, 'processed', onPublish);
    window.CameraTag.observe(cameraId, 'publishFailed', onStop);
    window.CameraTag.observe(cameraId, 'serverDisconnected', onStop);
    window.CameraTag.observe(cameraId, 'uploadAborted', onStop);
    window.CameraTag.observe(cameraId, 'serverError', onStop);
    return () => {
      window.CameraTag.stopObserving(cameraId, 'cameraReset', onInit);
      window.CameraTag.stopObserving(cameraId, 'uploadStarted', onStart);
      window.CameraTag.stopObserving(cameraId, 'initialized', onInit);
      window.CameraTag.stopObserving(cameraId, 'processed', onPublish);
      window.CameraTag.stopObserving(cameraId, 'publishFailed', onStop);
      window.CameraTag.stopObserving(cameraId, 'serverDisconnected', onStop);
      window.CameraTag.stopObserving(cameraId, 'uploadAborted', onStop);
      window.CameraTag.stopObserving(cameraId, 'serverError', onStop);
    };
  });

  return (
    <>
      {showCamera && (
        <div {...props}>
          <camera
            data-app-id={appId}
            id="myCamera"
            data-sources="upload"
            poll-for-processed="true"
          />
          <CameraStartScreen cameraId={cameraId} />
          <CameraUploadScreen cameraId={cameraId} />
          <CameraWaitScreen cameraId={cameraId} />
          <CameraCompletedScreen cameraId={cameraId} />
        </div>
      )}
    </>
  );
}

export default InputCamera;

InputCamera.defaultProps = {};
InputCamera.propTypes = {
  appId: PropTypes.string.isRequired,
  onUpload: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};
