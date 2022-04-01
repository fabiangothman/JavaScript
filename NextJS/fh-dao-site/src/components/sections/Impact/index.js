import React, { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import PropTypes from "prop-types";
import cx from "classnames";
import { Tab, TabList, TabPanel } from "react-tabs";
import { Col, Grid, Row } from "~grid";
import Button from "~baseComponents/Button";
import LogoDivider from "~baseComponents/LogoDivider";
import tabs from "./tabs";
//  Styles
import styles from "./Impact.module.scss";
import "react-tabs/style/react-tabs.css";

const Tabs = dynamic(
  import("react-tabs").then((mod) => mod.Tabs),
  { ssr: false }
); // disable ssr

const Impact = ({ id, className, ...props }) => {
  // console.log(`Impact props: `, props);
  // return null;
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const title = "Wide Impact Platform & Investment Vehicle";

  return (
    <div id={id} className={cx(styles.component, className)} {...props}>
      <div className={styles.content}>
        <Grid>
          <Row>
            <Col xs={12} lg={8}>
              <div className={styles.title}>
                <span>{title}</span>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Tabs
                className={cx(styles.tabs, styles.showOnDesktop)}
                selectedIndex={selectedTabIndex}
                onSelect={(index) => setSelectedTabIndex(index)}
                forceRenderTabPanel
              >
                <TabList className={styles.tabList}>
                  {tabs.map((tab, index) => (
                    <Tab
                      key={index}
                      className={styles.tab}
                      selectedClassName={styles.tabSelected}
                    >
                      <span>{tab.label.toUpperCase()}</span>
                    </Tab>
                  ))}
                </TabList>
                <div className={styles.body}>
                  {tabs.map((tab, index) => (
                    <TabPanel key={index}>
                      <div className={styles.tabContent}>
                        <Image
                          src={tab.contentImage.src}
                          alt={tab.contentImage.alt}
                          objectFit="contain"
                          layout="responsive"
                          width={tab.contentImage.width}
                          height={tab.contentImage.height}
                        />
                      </div>
                    </TabPanel>
                  ))}
                </div>
              </Tabs>
              <div className={styles.featuredImage}>
                {tabs[0].contentImage && (
                  <Image
                    src={tabs[0].contentImage.src}
                    alt={tabs[0].contentImage.alt}
                    objectFit="contain"
                    layout="responsive"
                    width={tabs[0].contentImage.width}
                    height={tabs[0].contentImage.height}
                  />
                )}
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12} lgOffset={4} lg={4}>
              <div className={styles.button}>
                <Button
                  url="https://futurequest.notion.site/Future-Quest-Greenpaper-fbe1c9e6d55f45979e265aacf83c363c"
                  label="Read our Greenpaper"
                  backgroundColor="transparent"
                  borderColor="black"
                  textColor="black"
                  openInNewTab
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <LogoDivider />
            </Col>
          </Row>
        </Grid>
      </div>
    </div>
  );
};

export default Impact;

export const ImpactType = {
  id: PropTypes.string,
  className: PropTypes.string,
};
Impact.defaultProps = {
  id: "",
  className: "",
};
Impact.propTypes = ImpactType;
