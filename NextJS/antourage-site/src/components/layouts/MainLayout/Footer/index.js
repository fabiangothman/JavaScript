import {
  AntourageLogo,
  DiagonalArrow,
  Twitter,
  Instagram,
  LinkedIn,
} from 'components/icons';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Col, Grid, Row } from '~grid';
import CircleButton from '~baseComponents/CircleButton';
import * as styles from './Footer.module.scss';
import Subscribe from '~baseComponents/Contact/Subscribe';

const Footer = ({
  sitemap,
  interest,
  info,
  socialmedia,
  mailchimp,
  ...props
}) => {
  // console.log(`Footer props: `, props);
  // return null;
  return (
    <footer id="#footer" className={styles.component} {...props}>
      <div className={styles.sitemap}>
        <Grid>
          <Row>
            <Col xs={12} lg={3}>
              <div className={styles.logo}>
                <AntourageLogo />
              </div>
            </Col>
            <Col xs={6} lgOffset={1} lg={2}>
              <ul className={styles.menuLinks}>
                {!!sitemap.length &&
                  sitemap.map(({ label, slug, openInANewTab }, index) => {
                    return (
                      <li key={index} className={styles.listItem}>
                        <Link href={slug}>
                          <a
                            target={openInANewTab ? '_blank' : '_self'}
                            className={styles.link}
                          >
                            <span>{label}</span>
                            {openInANewTab && (
                              <div className={styles.arrow}>
                                <DiagonalArrow />
                              </div>
                            )}
                          </a>
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </Col>
            <Col xs={6} lg={2}>
              <ul className={styles.menuLinks}>
                {!!interest.length &&
                  interest.map(({ label, slug, openInANewTab }, index) =>
                    label ? (
                      <li key={index} className={styles.listItem}>
                        <Link href={slug}>
                          <a
                            target={openInANewTab ? '_blank' : '_self'}
                            className={styles.link}
                          >
                            <span>{label}</span>
                            {openInANewTab && (
                              <div className={styles.arrow}>
                                <DiagonalArrow />
                              </div>
                            )}
                          </a>
                        </Link>
                      </li>
                    ) : null,
                  )}
                <li className={styles.listItem}>
                  <a className="ot-sdk-show-settings">Cookie Settings</a>
                </li>
              </ul>
            </Col>
            <Col lgOffset={1} lg={3} className={styles.hideInfoOnSm}>
              <ul className={styles.info}>
                <li className={styles.listItem}>
                  <a href={`mailto:${info.email}`}>{info.email}</a>
                </li>
                <li className={styles.listItem}>
                  <a href={`tel:${info.phone}`}>{info.phone}</a>
                </li>
                <li className={styles.listItem}>
                  <span>{info.address}</span>
                </li>
              </ul>
            </Col>
          </Row>
        </Grid>
      </div>

      <div className={styles.newsletter}>
        <Grid>
          <Row>
            <Col xs={12} lgOffset={4} lg={5}>
              <div className={styles.subscribeText}>
                Subscribe to newsletter
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12} lgOffset={4} lg={5}>
              <Subscribe mailchimp={mailchimp} />
            </Col>
            <Col xs={12} className={styles.showInfoOnSm}>
              <ul className={styles.info}>
                <li className={styles.listItem}>
                  <a href={`mailto:${info.email}`}>{info.email}</a>
                </li>
                <li className={styles.listItem}>
                  <a href={`tel:${info.phone}`}>{info.phone}</a>
                </li>
                <li className={styles.listItem}>
                  <span>{info.address}</span>
                </li>
              </ul>
            </Col>
            <Col xs={12} lg={3}>
              <div className={styles.socialButtons}>
                {socialmedia.twitter.slug && (
                  <CircleButton
                    className={styles.socialButton}
                    baseColors="WhiteBlack_HoverGreen"
                    target={
                      socialmedia.twitter.openInANewTab ? '_blank' : '_self'
                    }
                    href={socialmedia.twitter.slug}
                  >
                    <Twitter />
                  </CircleButton>
                )}
                {socialmedia.instagram.slug && (
                  <CircleButton
                    className={styles.socialButton}
                    baseColors="WhiteBlack_HoverGreen"
                    target={
                      socialmedia.instagram.openInANewTab ? '_blank' : '_self'
                    }
                    href={socialmedia.instagram.slug}
                  >
                    <Instagram />
                  </CircleButton>
                )}
                {socialmedia.linkedIn.slug && (
                  <CircleButton
                    className={styles.socialButton}
                    baseColors="WhiteBlack_HoverGreen"
                    target={
                      socialmedia.linkedIn.openInANewTab ? '_blank' : '_self'
                    }
                    href={socialmedia.linkedIn.slug}
                  >
                    <LinkedIn />
                  </CircleButton>
                )}
              </div>
            </Col>
          </Row>
        </Grid>
      </div>

      <div className={styles.rights}>
        <Grid>
          <Row>
            <Col xs={12}>
              <span>{`© ${new Date().getFullYear()} Antourage. All Rights Reserved`}</span>
            </Col>
          </Row>
        </Grid>
      </div>
    </footer>
  );
};

export default Footer;

Footer.propTypes = {
  sitemap: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  interest: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  info: PropTypes.shape({
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
  }).isRequired,
  socialmedia: PropTypes.shape({
    twitter: PropTypes.shape({
      openInANewTab: PropTypes.bool,
      slug: PropTypes.string,
    }).isRequired,
    instagram: PropTypes.shape({
      openInANewTab: PropTypes.bool,
      slug: PropTypes.string,
    }).isRequired,
    linkedIn: PropTypes.shape({
      openInANewTab: PropTypes.bool,
      slug: PropTypes.string,
    }).isRequired,
  }).isRequired,
  mailchimp: PropTypes.shape({
    mailchimpSubscribeVariable: PropTypes.string,
    mailchimpUVariable: PropTypes.string,
    mailchimpIdVariable: PropTypes.string,
  }).isRequired,
};
