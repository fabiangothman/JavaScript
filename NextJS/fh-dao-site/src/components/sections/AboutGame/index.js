import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { WorldNavigation } from "components/icons";
import { Col, Grid, Row } from "~grid";
import DropCard from "~baseComponents/DropCard";
import Button from "~baseComponents/Button";
import drops from "./drops";
//  Styles
import styles from "./AboutGame.module.scss";

const AboutGame = ({ className, ...props }) => {
  // console.log(`AboutGame props: `, props);
  // return null;
  const entryTextHg = "70% of each sale is raised for climate action.";
  const entryText =
    "Future Quest NFTs grant access to the Community and The Game among <u>many other perks</u>.";
  const subtitle = "We will drop 30 Clans on 3 levels to start...";
  const hightlightedText = "...and then the game begins.";
  const relatedText =
    "After NFT sales we’ll launch the Future Quest NFT game, which doubles as a fundraiser for our DAO and the climate action.";
  return (
    <div className={cx(styles.component, className)} {...props}>
      <div className={styles.container}>
        <Grid>
          <Row>
            <Col xs={12} lg={6}>
              <div className={styles.header}>
                <div className={styles.icon}>
                  <WorldNavigation width="46" />
                </div>
                <div className={styles.textWrapper}>
                  <div className={styles.entryTextHg}>
                    {/* eslint-disable-next-line react/no-danger */}
                    <span dangerouslySetInnerHTML={{ __html: entryTextHg }} />
                  </div>
                  <div className={styles.entryText}>
                    {/* eslint-disable-next-line react/no-danger */}
                    <span dangerouslySetInnerHTML={{ __html: entryText }} />
                  </div>
                </div>
              </div>
              <div className={styles.subtitle}>
                <span>{subtitle}</span>
              </div>
            </Col>
          </Row>
          <Row>
            {drops.map((drop, index) => (
              <Col key={index} xs={12} md={6} lg={4}>
                <DropCard
                  smallTitle={drop.smallTitle}
                  icon={drop.icon}
                  value={drop.value}
                  title={drop.title}
                  text={drop.text}
                  items={drop.items}
                  button={drop.button}
                  className={styles.dropCard}
                />
              </Col>
            ))}
          </Row>
          <Row>
            <Col xs={12} lgOffset={2} lg={8}>
              <div className={styles.hightlightedText}>
                <span>{hightlightedText}</span>
              </div>
              <div className={styles.relatedText}>
                <span>{relatedText}</span>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12} lgOffset={4} lg={4}>
              <div className={styles.buttonLearn}>
                <Button
                  url="https://www.notion.so/futurequest/NFT-Game-Concept-ca6385f2a3df4d0d9d549aa486d64224"
                  label="LEARN MORE ABOUT THE GAME"
                  backgroundColor="transparent"
                  borderColor="transparent"
                  textColor="black"
                  openInNewTab
                  hoverBackgroundColor="transparent"
                  hoverTextColor="black"
                  hoverBorderColor="transparent"
                  extraClassName="borbottom_black"
                />
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    </div>
  );
};

export default AboutGame;

export const AboutGameType = {
  className: PropTypes.string,
};
AboutGame.defaultProps = {
  className: "",
};
AboutGame.propTypes = AboutGameType;
