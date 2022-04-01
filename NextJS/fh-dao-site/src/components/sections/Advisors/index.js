import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { Col, Grid, Row } from "~grid";
import members from "./members";
import MemberCard from "~baseComponents/MemberCard";
//  Styles
import styles from "./Advisors.module.scss";

const Advisors = ({ id, className, ...props }) => {
  // console.log(`Advisors props: `, props);
  // return null;
  const title = "Our Mighty Advisors";

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
            {members.map((member, index) => (
              <Col key={index} xs={6} sm={4} md={3} lg={3} xl={2}>
                <div className={styles.card}>
                  <MemberCard {...member} />
                </div>
              </Col>
            ))}
          </Row>
        </Grid>
      </div>
    </div>
  );
};

export default Advisors;

export const AdvisorsType = {
  id: PropTypes.string,
  className: PropTypes.string,
};
Advisors.defaultProps = {
  id: "",
  className: "",
};
Advisors.propTypes = AdvisorsType;
