import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { Col, Grid, Row } from "~grid";
import LogoDivider from "~baseComponents/LogoDivider";
import FiguresCard from "~baseComponents/FiguresCard";
import objectSteps from "./objectSteps";
//  Styles
import styles from "./TheQuest.module.scss";

const TheQuest = ({ className, ...props }) => {
  // console.log(`TheQuest props: `, props);
  // return null;
  const title = "The Quest begins";
  const text =
    "This is only the beginning. Future Quest is the introduction of a new DAO focused on accelerating organizations and projects to usher in a carbon-negative economy. We’re working to cultivate a global society that makes good decisions for each other, the planet, and our future.";
  const hightlightedText =
    "Climate action requires more than just tackling carbon emissions. Our holistic Theory of Change developed through our community, F, aims to:";
  const endText =
    "Beyond carbon negative economy, the global society is making increasingly conscious consumer, governance, investor and entrepreneur decisions.";

  return (
    <div className={cx(styles.component, className)} {...props}>
      <div className={styles.background}>
        <div className={styles.content}>
          <Grid>
            <Row>
              <Col xs={12} lg={6}>
                <div className={styles.title}>
                  <span>{title}</span>
                </div>
              </Col>
              <Col xs={12} lg={6}>
                <div className={styles.text}>
                  <span>{text}</span>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <div className={styles.divider1}>
                  <LogoDivider />
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={12} lg={10}>
                <div className={styles.hightlightedText}>
                  <span>{hightlightedText}</span>
                </div>
              </Col>
            </Row>
            <Row className={styles.figuresCards}>
              {objectSteps.map((object, index) => (
                <Col key={index} xs={12} md={6} lg={3}>
                  <FiguresCard
                    icon={object.icon}
                    text={object.text}
                    number={object.number}
                    borderLeft={index !== 0}
                    className={cx(styles.card, styles.showOnDesktop)}
                  />
                  <div className={cx(styles.item, styles.showOnMobile)}>
                    <span>{object.text}</span>
                  </div>
                </Col>
              ))}
            </Row>
            <Row>
              <Col xs={12} lgOffset={3} lg={6}>
                <div className={cx(styles.endText, styles.showOnDesktop)}>
                  <span>{endText}</span>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <div className={styles.divider2}>
                  <LogoDivider />
                </div>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default TheQuest;

export const TheQuestType = {
  className: PropTypes.string,
};
TheQuest.defaultProps = {
  className: "",
};
TheQuest.propTypes = TheQuestType;
