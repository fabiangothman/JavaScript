import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import cx from "classnames";
import { Discord, FutureQuestLogo, Twitter } from "components/icons";
import { Grid, Row, Col } from "~grid";
//  Styles
import styles from "./Footer.module.scss";

const Footer = ({
  className,
  sitelogoName,
  footerMenu,
  discordUrl,
  twitterUrl,
  ...props
}) => {
  // console.log(`Footer footerMenu: `, footerMenu);
  // return null;

  return (
    <footer
      id="footerContainer"
      className={cx(styles.component, className)}
      {...props}
    >
      <Grid className={styles.container}>
        <Row>
          <Col xs={12} lg={7}>
            <div className={styles.iconWrapper}>
              <Link href="/">
                <a target="_self">
                  <FutureQuestLogo width="247" />
                </a>
              </Link>
            </div>
          </Col>
          <Col xs={12} lg={5} className={styles.showOnDesktop}>
            <div className={cx(styles.menuLinksDesktop)}>
              {footerMenu.map((menuItem, index) => (
                <nav key={index} className={styles.menuItemTxt}>
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
                    <Discord width="34" />
                  </a>
                </Link>
              </nav>
              <nav className={styles.menuItem}>
                <Link href={twitterUrl}>
                  <a target="_blank">
                    <Twitter width="34" />
                  </a>
                </Link>
              </nav>
            </div>
          </Col>
          <Col xs={12}>
            <div className={cx(styles.menuLinksMobile, styles.showOnMobile)}>
              <div className={styles.topContent}>
                {footerMenu.map((menuItem, index) => (
                  <nav key={index} className={styles.menuItemTxt}>
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
              </div>
              <div className={styles.bottomContent}>
                <nav className={styles.menuItem}>
                  <Link href={discordUrl}>
                    <a target="_blank">
                      <Discord width="24" />
                    </a>
                  </Link>
                </nav>
                <nav className={styles.menuItem}>
                  <Link href={twitterUrl}>
                    <a target="_blank">
                      <Twitter width="22" />
                    </a>
                  </Link>
                </nav>
              </div>
            </div>
          </Col>
        </Row>
      </Grid>
    </footer>
  );
};

export default Footer;

export const FooterType = {
  className: PropTypes.string,
  sitelogoName: PropTypes.string.isRequired,
  footerMenu: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  discordUrl: PropTypes.string.isRequired,
  twitterUrl: PropTypes.string.isRequired,
};
Footer.defaultProps = {
  className: "",
};
Footer.propTypes = FooterType;
