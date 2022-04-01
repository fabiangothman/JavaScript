import React, { useState } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { AdditionIcon, SubstractIcon } from "components/icons";
import { Col, Grid, Row } from "~grid";
//  Styles
import styles from "./QuestionItem.module.scss";

const QuestionItem = ({ className, question, answer, expanded, ...props }) => {
  // console.log(`QuestionItem props: `, props);
  // return null;
  const [answerOpen, setAnswerOpen] = useState(expanded);

  return (
    <div className={cx(styles.component, className)} {...props}>
      <div className={styles.item}>
        <div
          className={styles.expandArea}
          onClick={() => setAnswerOpen(!answerOpen)}
          onKeyDown={() => setAnswerOpen(!answerOpen)}
          aria-hidden="true"
        >
          <div className={styles.question}>
            <span>{question.toUpperCase()}</span>
          </div>
          <div className={styles.icon}>
            {answerOpen ? (
              <SubstractIcon width="24" />
            ) : (
              <AdditionIcon width="24" />
            )}
          </div>
        </div>
        <div
          className={styles.answerWrapper}
          style={{ display: answerOpen ? "block" : "none" }}
        >
          <Grid fluid>
            <Row>
              <Col xs={12} lg={8}>
                <div className={styles.answer}>{answer}</div>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default QuestionItem;

export const QuestionItemType = {
  className: PropTypes.string,
  question: PropTypes.string.isRequired,
  answer: PropTypes.node.isRequired,
  expanded: PropTypes.bool,
};
QuestionItem.defaultProps = {
  className: "",
  expanded: false,
};
QuestionItem.propTypes = QuestionItemType;
