import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { LinkType } from 'types';
import cx from 'classnames';
import { HamburguerMenuContext } from '~layouts/MainLayout';
import styles from './Header.module.scss';
import HeaderDesktop from './Desktop';
import HeaderMobile from './Mobile';

const Header = ({ menu, headerColor, headerType, loginButton, ...props }) => {
  // console.log(`Header props: `, props);
  // return null;
  const { hamburguerMenu } = useContext(HamburguerMenuContext);
  const color = headerColor.toLowerCase();
  const type = headerType.toLowerCase();
  const [transparentHeader, setTransparentHeader] = useState(false);

  useEffect(() => {
    if (window.pageYOffset === 0) setTransparentHeader(true);
    window.onscroll = () => {
      // console.log(`Page scroll value: ${window.pageYOffset}`)
      if (window.pageYOffset > 100) setTransparentHeader(false);
      else setTransparentHeader(true);
    };
  }, []);

  return (
    <header id="header" className={cx(styles.header)} {...props}>
      <div id="stickyHeader" className={cx(styles[color], styles[type])}>
        <div
          className={cx(
            styles.desktopMenu,
            transparentHeader ? styles.transparent : styles.dark,
          )}
        >
          <HeaderDesktop menu={menu} loginButton={loginButton} />
        </div>
        <div
          className={cx(
            styles.mobileMenu,
            hamburguerMenu && color === 'transparent'
              ? styles.dark
              : styles.closeBg,
            transparentHeader ? styles.transparent : styles.dark,
          )}
        >
          <HeaderMobile menu={menu} loginButton={loginButton} />
        </div>
      </div>
    </header>
  );
};

export default Header;

Header.defaultProps = {
  headerColor: 'black',
  headerType: 'static',
};
export const MenuType = {
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      sysId: PropTypes.string,
      openInANewTab: PropTypes.bool,
      slug: PropTypes.string,
    }),
  ).isRequired,
  loginButton: LinkType.isRequired,
  headerColor: PropTypes.string,
  headerType: PropTypes.string,
};

Header.propTypes = MenuType;
