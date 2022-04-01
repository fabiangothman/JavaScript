import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { Col, Grid, Row } from "~grid";
import partners from "./partners";
import PartnerCard from "~baseComponents/PartnerCard";
import Button from "~baseComponents/Button";
//  Styles
import styles from "./Partners.module.scss";

const Partners = ({ id, className, ...props }) => {
  // console.log(`Partners props: `, props);
  // return null;
  const title = "Launch Partners";

  return (
    <div id={id} className={cx(styles.component, className)} {...props}>
      <div className={styles.content}>
        <Grid>
          <Row>
            <Col xs={12} lg={7}>
              <div className={styles.title}>
                <span>{title}</span>
              </div>
            </Col>
          </Row>
          <Row>
            {partners.map((partner, index) => (
              <Col key={index} xs={6} md={4} lg={3}>
                <div className={styles.card}>
                  <PartnerCard {...partner} />
                </div>
              </Col>
            ))}
          </Row>
          <Row>
            <Col xs={12} lgOffset={4} lg={4}>
              <div className={styles.button}>
                <Button
                  url="https://www.google.com/"
                  label="GET GREENLIST"
                  openInNewTab
                  hoverBackgroundColor="black"
                  hoverTextColor="blue-white"
                  hoverBorderColor="transparent"
                />
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    </div>
  );
};

export default Partners;

export const PartnersType = {
  id: PropTypes.string,
  className: PropTypes.string,
};
Partners.defaultProps = {
  id: "",
  className: "",
};
Partners.propTypes = PartnersType;
