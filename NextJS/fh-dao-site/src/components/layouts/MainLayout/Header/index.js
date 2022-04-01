import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import cx from "classnames";
import { Discord, FutureQuestLogo, Twitter } from "components/icons";
import { Grid, Row, Col } from "~grid";
//  Styles
import styles from "./Header.module.scss";

const Header = ({
  className,
  sitelogoName,
  headerMenu,
  discordUrl,
  twitterUrl,
  ...props
}) => {
  // console.log(`Header headerMenu: `, headerMenu);
  // return null;

  return (
    <header
      id="headerContainer"
      className={cx(styles.component, className)}
      {...props}
    >
      <Grid className={styles.container}>
        <Row>
          <Col xs={6}>
            <div className={styles.iconWrapper}>
              <Link href="/">
                <a target="_self">
                  <FutureQuestLogo width="247" />
                </a>
              </Link>
            </div>
          </Col>
          <Col xs={6}>
            <div className={styles.menuLinks}>
              {headerMenu.map((menuItem, index) => (
                <nav
                  key={index}
                  className={cx(styles.showOnDesktop, styles.menuItemTxt)}
                >
                  <Link href={menuItem.url}>
                    <a
                      target={menuItem.openInNewTab ? "_blank" : "_self"}
                      className={styles.item}
                    >
                      <span>{menuItem.label.toUpperCase()}</span>
                    </a>
                  </Link>
                </nav>
              ))}
              <nav className={styles.menuItem}>
                <Link href={discordUrl}>
                  <a target="_blank">
                    <Discord />
                  </a>
                </Link>
              </nav>
              <nav className={styles.menuItem}>
                <Link href={twitterUrl}>
                  <a target="_blank">
                    <Twitter />
                  </a>
                </Link>
              </nav>
            </div>
          </Col>
        </Row>
      </Grid>
    </header>
  );
};

export default Header;

export const HeaderType = {
  className: PropTypes.string,
  sitelogoName: PropTypes.string.isRequired,
  headerMenu: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  discordUrl: PropTypes.string.isRequired,
  twitterUrl: PropTypes.string.isRequired,
};
Header.defaultProps = {
  className: "",
};
Header.propTypes = HeaderType;
