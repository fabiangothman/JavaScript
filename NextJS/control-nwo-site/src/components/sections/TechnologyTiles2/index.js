import React from 'react';
import cx from 'classnames';
import { Grid, Row, Col } from 'components/grid';
import Animation from 'baseComponents/Animation';
//  Styles
import styles from './TechnologyTiles2.module.scss';

const TechnologyTiles2 = ({
  className,
  ...props
}) => {
  const sections = [
    {
      video: `technology-01.mp4`,
      title: `Think Google for global trends`,
      text1: `Queries can be phrased in plain speech, as if posed to a human expert. We’ve examined the context surrounding millions of topics to deliver deep, actionable insights in under a minute.`,
      text2: `Google answers the what. NWO answers the why.`
    },
    {
      video: `technology-02.mp4`,
      title: `Beautiful Machine-Generated Summaries`,
      text1: `Within seconds of performing a search, NWO generates a Signal Report on the topic in question to answer the what, where, when, who, and why behind the trend. These reports serve as a one-stop shop for clients to identify, leverage, and perform forensic analysis on trends, providing a deeper understanding of the underlying factors driving their growth or decline.`,
      text2: ``
    },
    {
      video: `technology-03.mp4`,
      title: `Petabyte-scale Data Coverage`,
      text1: `NWO analyzes massive troves of public and proprietary data sources to capture the voice of the consumer — from search engines and social networks to online media and even TV stations. NWO’s algorithms time-shift and layer-in these sources to understand which of them would be the strongest contributors to the growth or decline of a trend.`,
      text2: ``
    },
  ];
  
  return (
    <div
      {...props}
      className={cx(styles.component, className)}
    >
      <Grid fluid className={styles.noPad}>
        {sections.map((section, index) => (
          <Row key={index} className={ index%2 !== 0 ? styles.reverseRow : null}>
            <Col xs={12} lg={6} className={styles.noPad}>
              <div className={styles.videoWrapper}>
                <Animation
                  className={styles.animation}
                  src={ section.video }
                />
              </div>
            </Col>
            <Col xs={12} lg={6} className={styles.noPad}>
              <div className={styles.infoWrapper}>
                <div className={styles.title}>
                  <span>{ section.title }</span>
                </div>
                <div className={styles.text1}>
                  <span>{ section.text1 }</span>
                </div>
                { section.text2 && (
                  <div className={styles.text2}>
                    <span>{ section.text2 }</span>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        ))}
      </Grid>
    </div>
  );
}

export default TechnologyTiles2;
