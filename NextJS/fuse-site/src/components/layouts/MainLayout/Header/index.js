/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Link from 'next/link';
import { useRouter } from 'next/router';
import cx from 'classnames';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Grid } from '~grid';
import {
  LogoIcon,
  CloseIcon,
  HamburguerIcon,
  LargeVerticalRedBarIcon,
  ThinVerticalRedBarIcon,
} from '~baseComponents/Icons';
import useIsMobile from '~hooks/useIsMobile';
import styles from './Header.module.scss';
import { useNavbarProvider } from '~contexts/NavbarMenuProvider';
import { SocialIcons } from '~shared';

const Header = ({ menu, fixedHeader, loginPageUrl, socialLinks }) => {
  const isMobile = useIsMobile();
  const router = useRouter();
  const { menuIsOpen, setIsNavbarMenuOpen } = useNavbarProvider();

  useEffect(() => {
    if (!isMobile) {
      setIsNavbarMenuOpen(false);
    }
  }, [isMobile, setIsNavbarMenuOpen]);

  const onToggleMenu = () => {
    setIsNavbarMenuOpen(!menuIsOpen);
  };

  const buildLinkURLBySlug = (slug, section = '') => {
    if (slug.toLowerCase() === 'contact') {
      return `/#contact-us`;
    }
    if (slug === '/' && section) {
      return `/${section}`;
    }

    if (slug === '/') {
      return '/';
    }

    if (slug.includes('mailto') || slug.includes('http')) {
      return slug;
    }

    return `/${slug}${section}`;
  };

  const isActived = (slug) => {
    if (
      `/${slug}` === router.pathname ||
      router.pathname.startsWith(`/${slug}/`)
    ) {
      return true;
    }

    return false;
  };

  const shouldHideDesktopLogo = () => {
    return router.pathname === '/';
  };

  return (
    <header
      id="header"
      className={cx(styles.header, {
        [styles.headerFixed]: fixedHeader,
      })}
    >
      <Grid className={styles.inner}>
        <Row className="no-pad">
          <Col xs={12}>
            <div
              className={cx(styles.area, {
                [styles.areaLogoHidden]: shouldHideDesktopLogo(),
              })}
            >
              <Link href="/">
                <a
                  id="navbar-logo"
                  aria-label="Go to home page"
                  className={styles.logo}
                >
                  <LogoIcon />
                </a>
              </Link>
              <div className={styles.mobileMenu}>
                <button
                  className={styles.menuBtn}
                  type="button"
                  onClick={onToggleMenu}
                >
                  {menuIsOpen ? <CloseIcon /> : <HamburguerIcon />}
                </button>
              </div>
              <nav
                className={cx(styles.nav, {
                  [styles.navIsOpened]: menuIsOpen,
                })}
              >
                <div className={styles.scrollable}>
                  <div className={styles.list}>
                    {menu.map(
                      ({ label, slug, openInANewTab, sysId, section }) => {
                        return (
                          <div key={sysId} className={styles.listItem}>
                            <Link
                              href={buildLinkURLBySlug(slug || label, section)}
                              passHref
                            >
                              <a
                                className={cx(styles.listItemLink, {
                                  [styles.listItemLinkActived]: isActived(slug),
                                })}
                                onClick={() => setIsNavbarMenuOpen(false)}
                                target={openInANewTab ? '_blank' : '_self'}
                              >
                                {label}
                              </a>
                            </Link>
                          </div>
                        );
                      },
                    )}
                    {loginPageUrl && (
                      <div className={styles.loginWrapper}>
                        {isMobile ? (
                          <LargeVerticalRedBarIcon />
                        ) : (
                          <ThinVerticalRedBarIcon />
                        )}
                        <Link href={loginPageUrl} passHref>
                          <a
                            className={cx(styles.listItemLink, styles.loginBtn)}
                            rel="noreferrer"
                            target="_blank"
                          >
                            Login
                          </a>
                        </Link>
                      </div>
                    )}
                    {menuIsOpen && (
                      <div className={styles.social}>
                        <span>
                          {socialLinks.map((item) => (
                            <Link
                              key={item.sysId}
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
                    )}
                  </div>
                </div>
              </nav>
            </div>
          </Col>
        </Row>
      </Grid>
    </header>
  );
};

export default Header;

Header.defaultProps = {
  fixedHeader: false,
};

export const HeaderType = PropTypes.shape({
  fixedHeader: PropTypes.bool,
  loginPageUrl: PropTypes.string.isRequired,
  socialLinks: PropTypes.arrayOf(
    PropTypes.shape({
      socialLink: PropTypes.string,
      title: PropTypes.string,
      sysId: PropTypes.string,
    }),
  ).isRequired,
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
      openInANewTab: PropTypes.bool,
      url: PropTypes.string,
    }),
  ),
});

Header.propTypes = HeaderType.isRequired;
