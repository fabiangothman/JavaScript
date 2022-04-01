import cx from 'classnames';
import PropTypes from 'prop-types';
import { useRef, useEffect, useState } from 'react';
import { PlayIcon, PauseIcon } from '~baseComponents/Icons';
import styles from './VisualizedAudioPlayer.module.scss';

const formatTime = (seconds) => {
  if (seconds >= 3600) {
    return new Date(seconds * 1000).toISOString().substr(11, 8);
  }
  return new Date(seconds * 1000).toISOString().substr(14, 5);
};

const VisualizedAudioPlayer = ({ className, fileUrl }) => {
  const waveSurverContainer = useRef();
  const waveSurferObject = useRef();
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = async (ev) => {
    ev.preventDefault();

    if (!waveSurferObject.current) {
      return;
    }

    if (loading) {
      return;
    }

    await waveSurferObject.current.playPause();
    setIsPlaying(waveSurferObject.current.isPlaying());
  };

  useEffect(() => {
    if (!waveSurverContainer.current) {
      return null;
    }
    // eslint-disable-next-line global-require
    const WaveSurfer = require('wavesurfer.js');
    waveSurverContainer.current.innerHTML = '';
    waveSurferObject.current = WaveSurfer.create({
      container: waveSurverContainer.current,
      cursorColor: 'rgba(0, 0, 0, 0)',
      height: 41,
      responsive: 100,
      normalize: true,
      partialRender: true,
      progressColor: '#C2C2C2',
      waveColor: '#080808',
      barMinHeight: 1,
      barGap: 4,
      barHeight: 1,
      barRadius: 0,
      barWidth: 1,
      scrollParent: false,
      hideScrollbar: true,
    });
    setLoading(true);
    waveSurferObject.current.on('ready', () => {
      setLoading(false);
      setIsPlaying(false);
      setDuration(Math.round(waveSurferObject.current.getDuration()));
      setCurrentTime(Math.round(waveSurferObject.current.getCurrentTime()));
    });
    waveSurferObject.current.on('audioprocess', () => {
      setCurrentTime(Math.round(waveSurferObject.current.getCurrentTime()));
    });
    waveSurferObject.current.on('finish', () => {
      waveSurferObject.current.seekTo(0);
      setCurrentTime(0);
      setIsPlaying(false);
    });
    waveSurferObject.current.load(fileUrl);

    return () => {
      if (waveSurferObject.current) {
        waveSurferObject.current.destroy();
      }
    };
  }, [fileUrl]);

  return (
    <div className={cx(styles.wrapper, className)}>
      <div className={styles.mainRow}>
        <div className={styles.buttonWrapper}>
          <a
            className={cx(styles.playButton, { [styles.loading]: loading })}
            href="#play-pause"
            onClick={handlePlayPause}
          >
            {isPlaying && <PauseIcon />}
            {!isPlaying && <PlayIcon />}
          </a>
        </div>
        <div className={styles.waveContainer} ref={waveSurverContainer} />
      </div>
      <div className={styles.bottomRow}>
        {loading && <span>Loading...</span>}
        {!loading && (
          <span>
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        )}
      </div>
    </div>
  );
};

VisualizedAudioPlayer.defaultProps = {
  className: null,
};

VisualizedAudioPlayer.propTypes = {
  className: PropTypes.string,
  fileUrl: PropTypes.string.isRequired,
};

export default VisualizedAudioPlayer;
