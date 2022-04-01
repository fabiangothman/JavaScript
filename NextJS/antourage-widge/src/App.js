import React, { useState, useEffect, useRef } from 'react';
import cx from 'classnames';
import styles from './App.module.scss';
import api from './api';
import Image from './components/Image';
import WidgetText from './components/WidgetText';
import WidgetConfigRenderer from './components/WidgetConfigRenderer';
import WidgetDoor from './components/WidgetDoor';
import Video from './components/Video';
import configParser from './utils/configParser';
import WidgetLiveIndicator from './components/WidgetLiveIndicator';
import useIsMobile from './hooks/isMobile';

const App = ({ antourage }) => {
  const [data, setData] = useState(null);
  const [config, setConfig] = useState(null);
  const widgetRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [isPinging, setIsPinging] = useState(false);
  const pingTimeout = useRef();
  const pingEndTimeout = useRef();
  const [isHidden, setHidden] = useState(true);
  const hasHoverSupport = useRef(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const loadWidget = async () => {
      antourage.dispatchEvent(new Event('load'));
      const jsConfig = window._ANTOURAGE_CONFIG || {};
      const data = await api.loadWidget(jsConfig.partner_id);

      setData(data.item);
    };

    loadWidget();
  }, []);

  useEffect(() => {
    if (!data) {
      return;
    }
    const jsConfig = window._ANTOURAGE_CONFIG || {};
    const parsedConfig = configParser(data.config, jsConfig);
    hasHoverSupport.current = !window.matchMedia('(hover: hover)').matches;
    if (isMobile) {
      parsedConfig.widget_size = parsedConfig.widget_size_mobile;
    } else {
      parsedConfig.widget_size = parsedConfig.widget_size_desktop;
    }
    setConfig(parsedConfig);
    setHidden(parsedConfig.widget_hidden);
    antourage.dispatchEvent(new Event('ready'));
  }, [data, isMobile]);

  useEffect(() => {
    const api = antourage;
    const requestHideListener = api.addEventListener('requestHide', () => {
      setHidden(true);
    });

    const requestShowListener = api.addEventListener('requestShow', () => {
      setHidden(false);
    });

    return () => {
      api.removeEventListener('requestHide', requestHideListener);
      api.removeEventListener('requestShow', requestShowListener);
    };
  }, [antourage]);

  const handleTap = (ev) => {
    if (isActive) {
      window.location.href = data.cta_url
    } else if (hasHoverSupport.current && !isActive) {
      setIsActive(true);
      ev.preventDefault();
      ev.stopImmediatePropagation();
      const callback = () => {
        setIsActive(false);
      };

      document.addEventListener('click', callback, { once: true });
    }
  };

  const handleMouseEnter = () => {
    if (!hasHoverSupport.current) {
      setIsActive(true);
      setIsPinging(false);
    }
  };

  const handleMouseLeave = () => {
    if (!hasHoverSupport.current) {
      setIsActive(false);
      setIsPinging(false);
    }
  };

  useEffect(() => {
    if (!config) {
      return null;
    }

    if (pingEndTimeout.current) {
      clearTimeout(pingEndTimeout.current);
      pingEndTimeout.current = null;
    }

    if (pingTimeout.current) {
      clearTimeout(pingTimeout.current);
      pingTimeout.current = null;
    }

    if (isPinging) {
      pingEndTimeout.current = setTimeout(
        () => setIsPinging(false),
        config.ms_ping_duration,
      );
    } else {
      pingTimeout.current = setTimeout(() => {
        if (!isActive) {
          setIsPinging(true);
          antourage.dispatchEvent(new Event('ping'));
        }
      }, config.ms_ping_every);
    }

    return () => {
      if (pingEndTimeout.current) {
        clearTimeout(pingEndTimeout.current);
        pingEndTimeout.current = null;
      }

      if (pingTimeout.current) {
        clearTimeout(pingTimeout.current);
        pingTimeout.current = null;
      }
    };
  }, [isPinging, isActive, config]);

  const renderInner = () => {
    switch (data.asset_type) {
      case 'VIDEO':
      case 'STREAM':
        return (
          <Video
            isPlaying={isActive || isPinging}
            src={data.asset_url}
            posterSrc={data.thumbnail_url}
          />
        );
      case 'IMAGE':
        return <Image alt={data.title} src={data.asset_url} />;
      default:
        return <Image alt={data.title} src={data.thumbnail_url} />;
    }
  };

  const renderContent = () => {
    return (
      <>
        <WidgetLiveIndicator live={data.live} />
        <WidgetText {...data} />
        <WidgetDoor
          config={config}
          isPinging={isPinging}
          isActive={isActive}
          onClick={handleTap}
        >
          {renderInner()}
        </WidgetDoor>
      </>
    );
  };

  return (
    <div
      ref={widgetRef}
      onMouseLeave={handleMouseLeave}
      className={cx(styles.widget, {
        __ANTOURAGE_ACTIVE__: isActive,
        __ANTOURAGE_PING__: isPinging,
        __ANTOURAGE_HIDDEN__: isHidden,
      })}
    >
      <div className={styles.hitbox} onMouseEnter={handleMouseEnter}>
        {!!data && !!config && (
          <WidgetConfigRenderer
            wrapperClassName={styles.widget}
            config={config}
          >
            <div className={styles.overlay} />
            {renderContent()}
          </WidgetConfigRenderer>
        )}
      </div>
    </div>
  );
};

export default App;
