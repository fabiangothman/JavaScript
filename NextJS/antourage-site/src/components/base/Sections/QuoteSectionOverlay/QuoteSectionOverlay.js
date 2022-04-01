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
import * as styles from './QuoteSectionOverlay.module.scss';

const Tabs = dynamic(
  import('react-tabs').then((mod) => mod.Tabs),
  { ssr: false },
); // disable ssr

export default function QuoteSectionOverlay({ className, tabs, ...props }) {
  // console.log(`QuoteSectionOverlay props: `, props);
  // return null;
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const { query } = useRouter();

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (query.tab) {
      const index = tabs.findIndex((tab) => tab.slug === query.tab);
      setSelectedTabIndex(index === -1 ? 0 : index);
    }
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

                    {tabs.map((tab) => (
                      <TabPanel
                        key={tab.sysId}
                        className={styles.tabPanel}
                        selectedClassName={styles.panelSelected}
                      >
                        <div className={styles.text}>
                          <span>{tab.text}</span>
                        </div>
                        <div className={styles.contInfoResponsive}>
                          <div className={styles.contImage}>
                            <Image
                              alt={tabs[selectedTabIndex].image.alt}
                              src={tabs[selectedTabIndex].image.url}
                              width={tabs[selectedTabIndex].image.width}
                              height={tabs[selectedTabIndex].image.height}
                              objectFit="cover"
                              layout="responsive"
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
                      </TabPanel>
                    ))}
                  </Tabs>
                </div>
                <div className={styles.contInfo}>
                  <div className={styles.contImage}>
                    <Image
                      alt={tabs[selectedTabIndex].image.alt}
                      src={tabs[selectedTabIndex].image.url}
                      width={tabs[selectedTabIndex].image.width}
                      height={tabs[selectedTabIndex].image.height}
                      objectFit="cover"
                      layout="fixed"
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

QuoteSectionOverlay.defaultProps = {
  className: '',
};

export const QuoteSectionOverlayType = PropTypes.shape({
  image: ImageType.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  sysId: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
});

QuoteSectionOverlay.propTypes = {
  className: PropTypes.string,
  tabs: PropTypes.arrayOf(QuoteSectionOverlayType).isRequired,
};
