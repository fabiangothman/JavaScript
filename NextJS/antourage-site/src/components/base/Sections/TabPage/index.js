import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { Tab, TabList, TabPanel } from 'react-tabs';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Col, Grid, Row } from '~grid';
import RichText, { RichTextTypes } from '~baseComponents/RichText';
import 'react-tabs/style/react-tabs.css';
import * as styles from './TabPage.module.scss';

const Tabs = dynamic(
  import('react-tabs').then((mod) => mod.Tabs),
  { ssr: false },
); // disable ssr

export default function TabPage({ className, tabs, ...props }) {
  // console.log(`TabPage props: `, props);
  // return null;
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const { query, pathname } = useRouter();

  const handleTabClicked = (slug) => {
    const route = `${pathname}?tab=${slug}`;
    window.history.replaceState(null, null, route);
  };

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
                    onClick={() => handleTabClicked(tab.slug)}
                  >
                    <a>
                      <span>{tab.label}</span>
                    </a>
                  </Tab>
                ))}
              </TabList>

              {tabs.map((tab) => (
                <TabPanel
                  key={tab.sysId}
                  className={styles.tabPanel}
                  selectedClassName={styles.panelSelected}
                >
                  <RichText
                    headingStyle={styles.title}
                    h1Style={styles.h1title}
                    h2Style={styles.h2title}
                    h6Style={styles.h6title}
                    pStyle={styles.text}
                    content={tab.content}
                  />
                </TabPanel>
              ))}
            </Tabs>
          </Col>
        </Row>
      </Grid>
    </div>
  );
}

TabPage.defaultProps = {
  className: '',
};

export const TabPageSectionType = PropTypes.shape({
  content: RichTextTypes.isRequired,
  label: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  sysId: PropTypes.string.isRequired,
});

TabPage.propTypes = {
  className: PropTypes.string,
  tabs: PropTypes.arrayOf(TabPageSectionType).isRequired,
};
