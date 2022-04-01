import React from 'react';
import ReactPlayer from 'react-player';
import styles from './Video.module.scss';

const Video = ({ src, alt, posterSrc, isPlaying }) => {
  return (
    <div className={styles.wrapper}>
      <ReactPlayer
        loop
        playing={isPlaying}
        muted={true}
        playsinline
        config={{
          file: {
            attributes: {
              poster: posterSrc,
            },
            hlsOptions: {
              maxBufferLength: 15,
              maxBufferSize: 15,
            },
          },
        }}
        wrapper={React.Fragment}
        alt={alt}
        url={src}
      />
    </div>
  );
};

export default Video;
