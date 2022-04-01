import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { Col, Grid, Row } from "~grid";
import LogoDivider from "~baseComponents/LogoDivider";
import categories from "./categories";
//  Styles
import styles from "./NotJust.module.scss";
import TextSlider from "~baseComponents/TextSlider";

const NotJust = ({ id, className, ...props }) => {
  // console.log(`NotJust props: `, props);
  // return null;
  const title = "So much more than just pretty JPEGs";
  const featuredParagraph = [
    "Future Quest supports NGOs and for-profit organizations.",
    "Profit is reinvested into the treasury. As projects succeed, the treasury grows larger, enabling us to fund more high impact climate action.",
    "Fund distribution is based on milestone achievement.",
  ];

  return (
    <div id={id} className={cx(styles.component, className)} {...props}>
      <div className={styles.content}>
        <Grid>
          <Row>
            <Col xs={12} lg={6}>
              <div className={styles.title}>
                <span>{title}</span>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12} lg={11}>
              <div
                className={cx(styles.featuredParagraph, styles.showOnDesktop)}
              >
                {featuredParagraph.map((text, index) => (
                  <p key={index}>{text}</p>
                ))}
              </div>
            </Col>
          </Row>
          <Row className={styles.rowWrapper}>
            {categories.map((category, index) => (
              <Col key={index} xs={12} lg={4}>
                <div className={styles.showOnDesktop}>
                  <div className={styles.name}>
                    <span>{category.name.toUpperCase()}</span>
                  </div>
                  {category.texts.map((text, jindex) => (
                    <p key={jindex} className={styles.paragraph}>
                      {text}
                    </p>
                  ))}
                </div>
              </Col>
            ))}
          </Row>
          <Row>
            <Col xs={12}>
              <div className={cx(styles.slideWrapper, styles.showOnMobile)}>
                <TextSlider items={categories} />
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div className={styles.divider}>
                <LogoDivider />
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    </div>
  );
};

export default NotJust;

export const NotJustType = {
  id: PropTypes.string,
  className: PropTypes.string,
};
NotJust.defaultProps = {
  id: "",
  className: "",
};
NotJust.propTypes = NotJustType;
