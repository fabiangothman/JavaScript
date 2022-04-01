import React, { useState } from 'react';
import Image from 'next/image';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './ImageWithTextAndTabs.module.scss';

function ImageWithTextAndTabs({ title, image, tabs }) {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        {title ? <h2 className={styles.headlineLeft}>{title}</h2> : null}
        {image ? (
          <Image
            className={styles.image}
            alt={image.alt || title || null}
            src={image.url}
            width={image.width || 2000}
            height={image.height || 2000}
          />
        ) : null}
      </div>
      <div className={styles.right}>
        {title ? <h2 className={styles.headline}>{title}</h2> : null}
        {tabs ? (
          <div className={styles.tabsContainer}>
            <ul className={styles.tabsList}>
              {tabs.map((tab, index) => (
                <li
                  className={cx(
                    styles.tabsItem,
                    activeTab === index ? styles.activeTab : null,
                  )}
                  key={`tab_${index}`}
                >
                  <a
                    className={styles.tabTitle}
                    href={`#tab_${index}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab(index);
                    }}
                  >
                    {tab.title}
                  </a>
                </li>
              ))}
            </ul>
            <div className={styles.contContent}>
              {tabs.map((tab, index) => (
                <div
                  key={index}
                  className={cx(
                    styles.contBox,
                    activeTab === index ? styles.tabVisible : styles.tabHidden,
                  )}
                >
                  <p className={styles.tabContent}>{tab.content}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export const ImageWithTextAndTabsPropTypes = {
  title: PropTypes.string,
  image: PropTypes.shape({
    url: PropTypes.string,
    alt: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    }),
  ),
};

export const ImageWithTextAndTabsDefaultProps = {
  title: null,
  image: null,
  tabs: null,
};

ImageWithTextAndTabs.propTypes = ImageWithTextAndTabsPropTypes;
ImageWithTextAndTabs.defaultProps = ImageWithTextAndTabsDefaultProps;

export default ImageWithTextAndTabs;
