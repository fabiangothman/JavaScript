import { useContext } from 'react';
import PropTypes from 'prop-types';
import { SimpleAudioPlayerContext } from '../../../contexts/SimpleAudioPlayerProvider';

const SimpleAudioPlayer = ({ audioUrl, children, className }) => {
  const {
    actions: { playPauseAudio },
    data: { currentFile, isPlaying },
  } = useContext(SimpleAudioPlayerContext);
  if (!audioUrl) {
    return null;
  }

  const handleClick = (ev) => {
    ev.preventDefault();

    playPauseAudio(audioUrl);
  };

  const renderChildren = () => {
    if (typeof children === 'function') {
      const playing = isPlaying && currentFile === audioUrl;
      return children({ playing });
    }

    return children;
  };

  return (
    <a className={className} href="#play-audio" onClick={handleClick}>
      {renderChildren()}
    </a>
  );
};

SimpleAudioPlayer.defaultProps = {
  audioUrl: null,
  className: null,
};

SimpleAudioPlayer.propTypes = {
  audioUrl: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};

export default SimpleAudioPlayer;
