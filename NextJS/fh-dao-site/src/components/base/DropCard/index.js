import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import { HorizontalLineIcon } from "components/icons";
import Button, { ButtonType } from "~baseComponents/Button";
//  Styles
import styles from "./DropCard.module.scss";

const DropCard = ({
  className,
  smallTitle,
  icon,
  value,
  title,
  text,
  items,
  button,
  ...props
}) => {
  // console.log(`DropCard props: `, props);
  // return null;

  return (
    <div className={cx(styles.component, className)} {...props}>
      <div className={styles.card}>
        <div className={styles.supCard}>
          <div className={styles.topWrapper}>
            <div className={styles.leftContent}>
              <div className={styles.smallTitle}>
                <span>{smallTitle.toUpperCase()}</span>
              </div>
              <div className={styles.value}>
                <span>{value.toUpperCase()}</span>
              </div>
            </div>
            <div className={styles.rightContent}>{icon}</div>
          </div>
          <div className={styles.title}>
            <span>{title}</span>
          </div>
          <div className={styles.text}>
            {/* eslint-disable-next-line react/no-danger */}
            <span dangerouslySetInnerHTML={{ __html: text }} />
          </div>
        </div>
        <div className={styles.infCard}>
          <div className={cx(styles.contItems)}>
            {items.map((item, index) => (
              <div key={index} className={styles.item}>
                <HorizontalLineIcon width="24" />
                {/* eslint-disable-next-line react/no-danger */}
                <span dangerouslySetInnerHTML={{ __html: item }} />
              </div>
            ))}
          </div>
          <div className={cx(styles.button)}>
            <Button
              url={button.url}
              label={button.label}
              openInNewTab={button.openInNewTab}
              backgroundColor={button.backgroundColor}
              textColor={button.textColor}
              borderColor={button.borderColor}
              shadow={button.shadow}
              hoverLabel={button.hoverLabel}
              hoverBackgroundColor={button.hoverBackgroundColor}
              hoverTextColor={button.hoverTextColor}
              hoverBorderColor={button.hoverBorderColor}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropCard;

export const DropCardType = {
  className: PropTypes.string,
  smallTitle: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  value: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  button: PropTypes.shape(ButtonType).isRequired,
};
DropCard.defaultProps = {
  className: "",
};
DropCard.propTypes = DropCardType;
