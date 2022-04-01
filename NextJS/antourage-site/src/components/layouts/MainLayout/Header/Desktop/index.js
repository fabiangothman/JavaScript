import cx from 'classnames';
import { useRouter } from 'next/router';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { LinkType } from 'types';
import { AntourageLogo } from 'components/icons';
import Button from '~baseComponents/Button';
import { Grid, Row, Col } from '~grid';
import styles from './HeaderDesktop.module.scss';

const HeaderDesktop = ({ menu, className, loginButton, ...props }) => {
  // console.log(`HeaderDesktop props: `, props);
  // return null;
  const { pathname } = useRouter();

  return (
    <div className={cx(styles.desktopMenu, className)} {...props}>
      <Grid>
        <Row className={styles.contRow}>
          <Col mdOffset={1} md={2}>
            <div className={styles.contLogo}>
              <Link href="/" passHref>
                <a>
                  <AntourageLogo className={styles.logo} />
                </a>
              </Link>
            </div>
          </Col>
          <Col md={6}>
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
            </nav>
          </Col>
          <Col md={2}>
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
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default HeaderDesktop;

HeaderDesktop.defaultProps = {
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

HeaderDesktop.propTypes = MenuType;
