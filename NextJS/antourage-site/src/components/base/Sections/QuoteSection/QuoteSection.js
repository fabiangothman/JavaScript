import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Tab, TabList, TabPanel } from 'react-tabs';
import PropTypes from 'prop-types';
import { ImageType } from 'types';
import cx from 'classnames';
import { Quotes } from 'components/icons';
import { Col, Grid, Row } from '~grid';
// Styles
import 'react-tabs/style/react-tabs.css';
import * as styles from './QuoteSection.module.scss';

const Tabs = dynamic(
  import('react-tabs').then((mod) => mod.Tabs),
  { ssr: false },
); // disable ssr

export default function QuoteSection({ className, tabs, ...props }) {
  // console.log(`QuoteSection props: `, props);
  // return null;
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [textSectionHeight, setTextSectionHeight] = useState('100%');
  const { query } = useRouter();
  const setLongestHeight = async (useTimer) => {
    const textBlocks = Array.from(
      await document.getElementsByClassName('textBlocks'),
    );
    const longestBlock = textBlocks.reduce((a, b) =>
      a.offsetHeight > b.offsetHeight ? a : b,
    );
    setTextSectionHeight(`${longestBlock.offsetHeight}px`);

    if (useTimer) {
      const timer = setInterval(() => {
        if (document.readyState === 'complete') {
          clearInterval(timer);
          setLongestHeight(false);
        }
      }, 500);
    }
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (query.tab) {
      const index = tabs.findIndex((tab) => tab.slug === query.tab);
      setSelectedTabIndex(index === -1 ? 0 : index);
    }

    setLongestHeight(true);
    window.addEventListener('resize', () => {
      setLongestHeight(false);
    });
  }, [query]);

  return (
    <div className={cx(styles.component, className)} {...props}>
      <Grid>
        <Row>
          <Col xs={12}>
            <div className={styles.contGeneralQuote}>
              <Quotes className={styles.topQuote} />
              <Quotes className={styles.bottomQuote} />
              <div className={styles.contQuote}>
                <div className={styles.contTabs}>
                  <Tabs
                    className={styles.tabs}
                    selectedIndex={selectedTabIndex}
                    onSelect={(index) => setSelectedTabIndex(index)}
                    forceRenderTabPanel
                  >
                    <TabList className={styles.tabList}>
                      {tabs.map((tab) => (
                        <Tab
                          key={tab.sysId}
                          className={styles.tab}
                          selectedClassName={styles.tabSelected}
                        >
                          <span>{tab.label.toUpperCase()}</span>
                        </Tab>
                      ))}
                    </TabList>
                    <div
                      className={styles.body}
                      style={{ height: textSectionHeight }}
                    >
                      {tabs.map((tab, index) => (
                        <TabPanel
                          key={tab.sysId}
                          className={styles.tabPanel}
                          selectedClassName={styles.panelSelected}
                        >
                          <div className={styles.text}>
                            <span
                              style={{
                                display:
                                  index === selectedTabIndex ? 'block' : 'none',
                              }}
                            >
                              {tabs[selectedTabIndex].text}
                            </span>
                          </div>
                        </TabPanel>
                      ))}
                      {tabs.map((tab) => (
                        <div
                          key={tab.sysId}
                          style={{ boxSizing: 'border-box' }}
                          className="textBlocks"
                        >
                          <div className={styles.hideText}>
                            <span>{tab.text}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Tabs>
                </div>
                <div className={styles.contInfo}>
                  <div className={styles.contImage}>
                    <Image
                      alt={tabs[selectedTabIndex].image.alt}
                      src={tabs[selectedTabIndex].image.url}
                      objectFit="cover"
                      layout="fill"
                      className={styles.image}
                    />
                  </div>
                  <div className={styles.contNames}>
                    <div className={styles.name}>
                      <span>{tabs[selectedTabIndex].name}</span>
                    </div>
                    <div className={styles.role}>
                      <span>{tabs[selectedTabIndex].role}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Grid>
    </div>
  );
}

QuoteSection.defaultProps = {
  className: '',
};

export const QuoteSectionType = PropTypes.shape({
  image: ImageType.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  sysId: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
});

QuoteSection.propTypes = {
  className: PropTypes.string,
  tabs: PropTypes.arrayOf(QuoteSectionType).isRequired,
};
