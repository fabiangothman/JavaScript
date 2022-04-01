/* eslint-disable react/no-array-index-key */
import PropTypes from 'prop-types';
import Link from 'next/link';
import styles from './Footer.module.scss';
import { Row, Col } from '~grid';
import { SingleVerticalRedBar, LogoIcon } from '~baseComponents/Icons';
import useIsMobile from '~hooks/useIsMobile';
import RichText, { RichTextTypes } from '~baseComponents/RichText';
import { SocialIcons } from '~shared';
import Subscribe from '~baseComponents/Subscribe';

const Footer = ({
  links: menuLinks,
  socialLinks,
  companyAddress,
  mailchimp,
}) => {
  const year = new Date().getFullYear();
  const isMobile = useIsMobile();

  return (
    <footer className={styles.footer}>
      <div className="container-fluid">
        <Row className="no-pad">
          <Col xs={12} md={6}>
            <div className={styles.pages}>
              <div>
                <p className={styles.title}>EXPLORE</p>
                {menuLinks.map(({ title, links }, index) => (
                  <div key={index} className={styles.pagesWrapper}>
                    <span className={styles.pagesIndex}>0{index + 1}.</span>
                    <SingleVerticalRedBar />
                    <Link
                      href={
                        title.toLowerCase() === 'contact'
                          ? `/#contact-us`
                          : `/${links.slug}`
                      }
                      passHref
                    >
                      <a href="..." className={styles.pagesName}>
                        {title}
                      </a>
                    </Link>
                  </div>
                ))}
              </div>
              <div className={styles.pagesLogo}>
                <LogoIcon />
                <span>©{year}, FUSE</span>
              </div>
            </div>
          </Col>

          <Col xs={12} md={6}>
            <div className={styles.contactWrapper}>
              <div className={styles.subscribe}>
                <p className={styles.title}>SUBSCRIBE</p>
                <Subscribe mailchimp={mailchimp} />
              </div>
              <div className={styles.contact}>
                <div className={styles.connect}>
                  <p className={styles.title}>CONNECT</p>
                  <div className={styles.contactAddress}>
                    <RichText
                      pStyle={styles.contactAddressItem}
                      content={companyAddress}
                    />
                    <a href="mailto:info@fuse.vc">info@fuse.vc</a>
                  </div>
                </div>
                <div className={styles.social}>
                  <p className={styles.title}>SOCIAL</p>
                  <span>
                    {socialLinks.map((item) => (
                      <Link
                        key={`social-link-${item.sysId}`}
                        href={item.socialLink}
                        passHref
                      >
                        <a href="..." target="_blank">
                          {SocialIcons[item.title.toLowerCase()]}
                        </a>
                      </Link>
                    ))}
                  </span>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        {isMobile && (
          <div className={styles.fuseCopyright}>
            <span>©{year}, FUSE</span>
          </div>
        )}
      </div>
    </footer>
  );
};

export const FooterTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      slug: PropTypes.string,
    }),
  ).isRequired,
  socialLinks: PropTypes.arrayOf(
    PropTypes.shape({
      socialLink: PropTypes.string,
      title: PropTypes.string,
      sysId: PropTypes.string,
    }),
  ).isRequired,
  companyAddress: RichTextTypes.isRequired,
  mailchimp: PropTypes.shape({
    mailchimpSubscribeVariable: PropTypes.string,
    mailchimpUVariable: PropTypes.string,
    mailchimpIdVariable: PropTypes.string,
  }).isRequired,
};

Footer.propTypes = FooterTypes;

export default Footer;
