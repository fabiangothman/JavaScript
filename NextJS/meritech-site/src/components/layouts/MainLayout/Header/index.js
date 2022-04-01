import { useState, useLayoutEffect, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import {
  MeritechGreenLogo,
  Close,
  Hamburger,
  CircleWithASquare,
  TracedLine,
} from 'components/icons';
import cx from 'classnames';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styles from './Header.module.scss';
import MobileMenu from '~baseComponents/MobileMenu';
import { RichTextTypes } from '~baseComponents/RichText';
import useThemeContext from '~hooks/useTheme';

const animationKey = 'W_ANIMATION';

const Header = ({
  menu,
  isAnimationCompleted,
  headerWithBackground,
  subscribeMessage,
}) => {
  const theme = useThemeContext();
  const { pathname } = useRouter();

  const hasWhiteBackground = [
    'team',
    'about-us',
    'research',
    'companies',
    'benchmarking',
  ].some((p) => pathname.includes(p));

  const withAnimation = pathname === '/';
  const [withScale, setWithScale] = useState(false);
  const [isMenuHover, setIsMenuHover] = useState(-1);
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const OnToggleMenu = () => setIsMenuOpened((prev) => !prev);

  useEffect(() => {
    document.querySelector('body').style.paddingTop = isMenuOpened
      ? '68px'
      : '0';
    document.querySelector('body').style.overflow = isMenuOpened
      ? 'hidden'
      : '';
  }, [isMenuOpened]);

  useLayoutEffect(() => {
    setWithScale(window.localStorage.getItem(animationKey) !== 'true');
  }, []);

  const intro = !isAnimationCompleted && withAnimation;

  const variants = {
    ...(withAnimation && withScale && { withAnimation: { y: 0 } }),
    ...(withAnimation && withScale && { animationComplete: { y: '70px' } }),
  };

  const scaleVariant = {
    ...(withScale && { withAnimation: {} }),
    ...(withScale && { animationComplete: { scale: 1, x: 0 } }),
  };

  return (
    <>
      <header
        className={cx(
          styles.header,

          { [styles.headerFixed]: withAnimation || isMenuOpened },
          { [styles.headerWithBorder]: !intro || !withAnimation },
          {
            [styles.headerWithBackground]:
              ((headerWithBackground || isMenuOpened) && !hasWhiteBackground) ||
              isMenuOpened,
          },
          {
            [styles.headerOpenedMenu]: isMenuOpened,
          },
          { [styles.headerWhite]: hasWhiteBackground && !isMenuOpened },
        )}
      >
        <div
          className={cx('container', {
            // [styles.customContainer]: withAnimation,
            [styles.customContainer]: true, // implementing 95% width on all pages
          })}
        >
          <div className={styles.content}>
            <button
              onClick={OnToggleMenu}
              className={styles.menuButton}
              type="button"
              aria-label={isMenuOpened ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpened ? <Close /> : <Hamburger />}
            </button>

            <div
              className={cx(styles.timeline, {
                [styles.timelineHidden]:
                  intro || !withAnimation || isMenuOpened,
              })}
            >
              <CircleWithASquare className={styles.timelineCircle} />
              <div className={styles.timelineTraceWrapper}>
                <TracedLine className={styles.timelineTrace} />
              </div>
            </div>
            <motion.h1
              variants={withScale ? scaleVariant : {}}
              animate={intro ? 'withAnimation' : 'animationComplete'}
              className={cx(
                styles.title,
                {
                  [styles.titleWithMargin]: withAnimation && !intro,
                },
                {
                  [styles.titleWithScale]: withAnimation && withScale,
                },
                {
                  [styles.titleWithTransition]: withScale,
                },
              )}
            >
              <Link href="/">
                <a aria-label="Go to home page">
                  <MeritechGreenLogo
                    className={cx({ [styles.whiteLogo]: theme === 'dark' })}
                  />
                </a>
              </Link>
            </motion.h1>
            <motion.nav
              variants={variants}
              animate={intro ? 'withAnimation' : 'animationComplete'}
              className={cx({
                [styles.withAnimation]: withAnimation && withScale,
              })}
            >
              <ul className={styles.list}>
                {!!menu?.length &&
                  menu.map(({ label, slug, openInANewTab, sysId }, index) => {
                    const [slugPrefix] = slug.split('/').filter(Boolean);
                    const [pathPrefix] = pathname.split('/').filter(Boolean);
                    return (
                      <li
                        onMouseEnter={() => setIsMenuHover(index)}
                        onMouseLeave={() => setIsMenuHover(-1)}
                        key={sysId}
                        className={cx(styles.listItem, {
                          [styles.listItemActived]: slugPrefix === pathPrefix,
                          [styles.listItemHovered]: isMenuHover === index,
                        })}
                      >
                        <Link href={slug} passHref>
                          <a
                            className={styles.listItemLink}
                            target={openInANewTab ? '_blank' : '_self'}
                            rel={openInANewTab ? 'noreferrer noopener' : ''}
                          >
                            {label}
                          </a>
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </motion.nav>
          </div>
        </div>
      </header>
      <MobileMenu
        subscribeMessage={subscribeMessage}
        isOpen={isMenuOpened}
        header={menu}
        pathname={pathname}
      />
    </>
  );
};

export default Header;

Header.defaultProps = {
  isAnimationCompleted: false,
  headerWithBackground: false,
};

export const MenuType = {
  isAnimationCompleted: PropTypes.bool,
  headerWithBackground: PropTypes.bool,
  subscribeMessage: RichTextTypes.isRequired,
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      sysId: PropTypes.string,
      openInANewTab: PropTypes.bool,
      slug: PropTypes.string,
    }),
  ).isRequired,
};

Header.propTypes = MenuType;
