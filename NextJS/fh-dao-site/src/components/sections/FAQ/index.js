import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { Col, Grid, Row } from "~grid";
import questions from "./questions";
import QuestionItem from "~baseComponents/QuestionItem";
//  Styles
import styles from "./FAQ.module.scss";

const FAQ = ({ className, ...props }) => {
  // console.log(`FAQ props: `, props);
  // return null;
  const title = "FAQ";

  return (
    <div className={cx(styles.component, className)} {...props}>
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
            {questions.map((question, index) => (
              <Col key={index} xs={12}>
                <QuestionItem {...question} />
              </Col>
            ))}
          </Row>
        </Grid>
      </div>
    </div>
  );
};

export default FAQ;

export const FAQType = {
  className: PropTypes.string,
};
FAQ.defaultProps = {
  className: "",
};
FAQ.propTypes = FAQType;
