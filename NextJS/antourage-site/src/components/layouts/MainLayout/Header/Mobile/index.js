import { useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { LinkType } from 'types';
import cx from 'classnames';
import { AntourageLogo, HamburgerIcon, ExIcon } from 'components/icons';
import { Grid, Row, Col } from '~grid';
import styles from './HeaderMobile.module.scss';
import { HamburguerMenuContext } from '~layouts/MainLayout';
import Button from '~baseComponents/Button';

const HeaderMobile = ({ menu, className, loginButton, ...props }) => {
  // console.log(`HeaderMobile menu: `, menu);
  // return null;
  const { hamburguerMenu, setHamburguerMenu } = useContext(
    HamburguerMenuContext,
  );
  const { pathname } = useRouter();

  return (
    <div className={cx(styles.mobileMenu, className)} {...props}>
      <Grid>
        <Row className={styles.contRow}>
          <Col xs={10}>
            <Link href="/" passHref>
              <div>
                <a>
                  <AntourageLogo className={styles.logo} />
                </a>
              </div>
            </Link>
          </Col>
          <Col xs={2}>
            <div className={styles.contActionButton}>
              <div
                role="button"
                tabIndex={0}
                className={styles.actionButton}
                onClick={() => setHamburguerMenu(!hamburguerMenu)}
                onKeyDown={() => setHamburguerMenu(!hamburguerMenu)}
              >
                {hamburguerMenu ? <ExIcon /> : <HamburgerIcon />}
              </div>
            </div>
          </Col>
        </Row>
        <Row className={hamburguerMenu ? styles.openMenu : styles.closeMenu}>
          <Col xsOffset={3} xs={6}>
            <nav className={styles.navigation}>
              <ul className={styles.list}>
                {!!menu?.length &&
                  menu.map(({ label, slug, openInANewTab, sysId }) => {
                    return (
                      <li key={sysId} className={styles.listItem}>
                        <Link href={slug} passHref>
                          <a
                            className={cx(
                              styles.listItemLink,
                              slug === pathname ? styles.current : '',
                            )}
                            target={openInANewTab ? '_blank' : '_self'}
                          >
                            {label}
                          </a>
                        </Link>
                      </li>
                    );
                  })}
              </ul>
              <div className={styles.contButton}>
                <Button
                  className={styles.button}
                  baseColors="WhiteBlack_HoverGreen"
                  target={loginButton.openInANewTab ? '_blank' : '_self'}
                  href={loginButton.slug}
                >
                  <span>{loginButton.label}</span>
                </Button>
              </div>
            </nav>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default HeaderMobile;

HeaderMobile.defaultProps = {
  className: '',
};

const MenuType = {
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      sysId: PropTypes.string,
      openInANewTab: PropTypes.bool,
      slug: PropTypes.string,
    }),
  ).isRequired,
  loginButton: LinkType.isRequired,
  className: PropTypes.string,
};

HeaderMobile.propTypes = MenuType;
