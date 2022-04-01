import React from 'react';
import styles from './WidgetText.module.scss';

const WidgetText = ({ title, name, cta_label, cta_url, live }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.line}>
        <div className={styles.title}>
          {live && <div className={styles.live} />}
          <div className={styles.titleText}>{title}</div>
        </div>
        {live && <div className={styles.name}>{name}</div>}
      </div>
      {cta_url && (
        <div className={styles.line}>
          <a
            href={cta_url}
            className={styles.cta}
            target="_blank"
            rel="noreferrer nofollow"
          >
            <span className={styles.ctaLabel}>{cta_label}</span>
            <svg
              className={styles.icon}
              width="12"
              height="11"
              viewBox="0 0 12 11"
            >
              <path className={styles.iconPath} />
            </svg>
          </a>
        </div>
      )}
    </div>
  );
};

export default WidgetText;
