import React, {
  useMemo,
  useState,
  createContext,
  useRef,
  useEffect,
} from 'react';
import {useRouter} from 'next/router';

const INITIAL_STATE = {
  currentFile: null,
  isPlaying: false,
};

export const SimpleAudioPlayerContext = createContext();

export default function SimpleAudioPlayerProvider({ children }) {
  const audioElementRef = useRef();
  const [state, setState] = useState(INITIAL_STATE);
  const router = useRouter();

  const stopAudio = () => {
    if (audioElementRef.current) {
      audioElementRef.current.pause();
      setState({
        ...state,
      });
    }
  };
  const playPauseAudio = (audioUrl) => {
    if (audioElementRef.current) {
      if (audioElementRef.current.paused) {
        audioElementRef.current.play();
      } else {
        audioElementRef.current.pause();
      }
    }
    if (state.currentFile !== audioUrl) {
      if (audioElementRef.current) {
        audioElementRef.current.pause();
      }
      audioElementRef.current = new Audio(audioUrl);

      audioElementRef.current.addEventListener('play', () => {
        setState({
          ...state,
          isPlaying: true,
          currentFile: audioUrl
        });
      });
      audioElementRef.current.addEventListener('pause', () => {
        setState({
          ...state,
          isPlaying: false,
          currentFile: audioUrl
        });
      });
      audioElementRef.current.addEventListener('ended', () => {
        setState({
          ...state,
          isPlaying: false,
          currentFile: audioUrl
        });
      });

      audioElementRef.current.play();
      setState({
        ...state,
        currentFile: audioUrl,
      });
    } else {
      setState({
        ...state,
      });
    }
  };

  useEffect(() => {
    router.events.on('routeChangeComplete', stopAudio);

    return () => {
      router.events.off('routeChangeComplete', stopAudio);
    };
  }, [state]);

  const context = useMemo(() => {
    return {
      data: state,
      actions: {
        stopAudio,
        playPauseAudio,
      },
    };
  }, [state]);

  return (
    <SimpleAudioPlayerContext.Provider value={context}>
      {children}
    </SimpleAudioPlayerContext.Provider>
  );
}
