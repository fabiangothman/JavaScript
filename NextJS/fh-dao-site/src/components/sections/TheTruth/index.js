import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { Col, Grid, Row } from "~grid";
import Button from "~baseComponents/Button";
import CircleData from "~baseComponents/CircleData";
//  Styles
import styles from "./TheTruth.module.scss";

const TheTruth = ({ className, ...props }) => {
  // console.log(`TheTruth props: `, props);
  // return null;
  const sectionName = "The Truth";
  const titleNormal = "The world is in peril.";
  const text = [
    "Of 8 million species, One has become so powerful it’s taken claim of the planet. They’ve grown so strong it’s destabilized the entire place. It’s not bad will, they simply didn’t know the effect of their collective choices. It is only now that they’ve realized the power of their kind. They worry it might be too late.",
    "Luckily, it’s not too late. The ancient Force of Nature saw it coming. It gave us web3 and distributed powerful animal spirits across the planet.",
    "Representatives of other powerful species have come forward. The Vanguards. Unstoppable when bound with a human hodler. Together, they harness power from Warriors and Protectors to become stronger, together.",
    "As their numbers increase so does their power.",
    "They rise up to take on the ultimate Future Quest. To save our world.",
  ];
  const bottomText = "Are you one of them?";
  const goal = "GOAL";
  const value = "$5M";
  const raised = "Raised for Climate";
  const round = "Round 1";

  return (
    <div className={cx(styles.component, className)} {...props}>
      <div className={styles.background}>
        <div className={styles.content}>
          <Grid>
            <Row>
              <Col xs={6} sm={4} lg={2}>
                <div className={styles.sectionName}>
                  <span>{sectionName}</span>
                </div>
                <div className={styles.title}>
                  <span>{titleNormal}</span>
                </div>
              </Col>
              <Col xs={1}>
                <div className={styles.verticalLine} />
              </Col>
            </Row>
            <div className={styles.spacer} />
            <Row>
              <Col xs={12} lg={5}>
                <div className={styles.text}>
                  {text.map((paragraph, index) => (
                    <p key={index} className={styles.paragraph}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </Col>
              <Col xs={12} lgOffset={1} lg={6} xlOffset={2} xl={5}>
                <CircleData
                  goal={goal}
                  value={value}
                  raised={raised}
                  round={round}
                  className={cx(styles.circleData, styles.showOnDesktop)}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12} lg={5}>
                <div className={styles.bottomText}>
                  <span>{bottomText}</span>
                </div>
              </Col>
              <Col xs={12} lgOffset={1} lg={6} xlOffset={2} xl={5}>
                <div className={styles.button}>
                  <Button
                    url="https://www.google.com/"
                    label="GET GREENLIST"
                    backgroundColor="white"
                    textColor="black"
                    openInNewTab
                    hoverBackgroundColor="white"
                    hoverTextColor="black"
                    hoverBorderColor="white"
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <div className={cx(styles.line, styles.showOnDesktop)} />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <CircleData
                  goal={goal}
                  value={value}
                  raised={raised}
                  round={round}
                  className={cx(styles.circleData, styles.showOnMobile)}
                />
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default TheTruth;

export const TheTruthType = {
  className: PropTypes.string,
};
TheTruth.defaultProps = {
  className: "",
};
TheTruth.propTypes = TheTruthType;
