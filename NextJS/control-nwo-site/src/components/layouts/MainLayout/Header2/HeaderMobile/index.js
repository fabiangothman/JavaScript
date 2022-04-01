import React, { useContext, useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import Image from 'baseComponents/CmsImage';
import Link from 'next/link';
import { Grid, Row, Col } from 'components/grid';
import { Close, Hamburguer } from 'components/icons';
import MenuItemMobile from 'baseComponents/MenuItemMobile';
import Button from 'baseComponents/Button';
import ButtonCircle from 'baseComponents/ButtonCircle';
import SubmenuMobile from 'baseComponents/SubmenuItemMobile';
import ScrollLink from 'baseComponents/ScrollLink';
import { HamburguerMenuContext } from 'layouts/MainLayout/Header2';
//  Styles
import styles from './HeaderMobile.module.scss';

const HeaderMobile = ({
  className,
  headerMenu = [],
  headerBackground = "gray-light",
  ...props
}) => {
  // console.log(`HeaderMobile headerMenu: `, headerMenu);
  // return null;
  
  const { hamburguerMenu, setHamburguerMenu } = useContext(
    HamburguerMenuContext,
  );
  const [menuBarHeight, setMenuBarHeight] = useState(-1);
  const [submenuOpened, setSubmenuOpened] = useState(null);
  const itemRef = useRef();

	const nwoImage = require(`../../../../../../public/images/nwo-ai_purple-logo.png`);
  const link = `/#`;

  useEffect(() => {
    setMenuBarHeight(window.getComputedStyle(itemRef.current).height);
    const resizeListener = () => {
      if (itemRef.current) {
        setMenuBarHeight(window.getComputedStyle(itemRef.current).height);
      }
    }
    window.addEventListener('resize', resizeListener);
    return () => {
      window.removeEventListener('resize', resizeListener);
    }
  }, []);

  const handleOpenSubmenu = (menuItem) => {
    if(menuItem.childrenLinks.length>0){
      setSubmenuOpened(menuItem);
    }else{
      setHamburguerMenu(false);
    }
  }

  const handleCloseSubmenu = () => {
    setSubmenuOpened(null);
  }

  const handleCloseMenu = () => {
    setSubmenuOpened(null);
    setHamburguerMenu(false);
  }

  return (
    <div
      {...props}
      style={{marginBottom: menuBarHeight}}
      className={cx(styles.component, className)}
    >
      <div
        style={{height: hamburguerMenu ? '100%' : 'auto'}}
        className={styles.header}
      >
        <div
          ref={itemRef}
          className={cx(
            styles.contHeader,
            hamburguerMenu ? styles.white : styles[headerBackground],
          )}
        >
          <Grid>
            <Row>
              <Col xs={10}>
                <div className={styles.contImage}>
                  <ScrollLink href="/" passHref>
                    <a className={styles.link}>
                      <Image
                        alt="NWO logo"
                        src={nwoImage}
                        objectFit="cover"
                        layout="fill"
                      />
                    </a>
                  </ScrollLink>
                </div>
              </Col>
              <Col xs={2}>
                <div className={styles.contImageAction}>
                  <div
                    className={styles.imageAction}
                    onClick={() => setHamburguerMenu(!hamburguerMenu)}
                  >
                    {!hamburguerMenu
                      ? <Hamburguer width="28" />
                      : <Close width="22" />
                    }
                  </div>
                </div>
              </Col>
            </Row>
          </Grid>
        </div>
          {hamburguerMenu && (
            <div
              style={{height: `calc(100vh - ${menuBarHeight} - 14%)`}}
              className={styles.dropdownMenu}
            >
              <div className={styles.wrapperMenu}>
                <div
                  className={cx(
                    styles.menu,
                    submenuOpened !== null ? styles.closeMenu : null
                  )}
                >
                  {headerMenu.map((menuItem, index) => (
                    <MenuItemMobile
                      key={index}
                      menuItem={menuItem}
                      className={styles.item}
                      onClick={() => handleOpenSubmenu(menuItem)}
                    />
                  ))}
                </div>
                <div
                  className={cx(
                    styles.submenu,
                    submenuOpened !== null ? styles.openSubmenu : null
                  )}
                >
                  {submenuOpened && (
                    <SubmenuMobile
                      title={submenuOpened.parentLink.label}
                      menuSections={submenuOpened.childrenLinks}
                      onClick={() => handleCloseSubmenu()}
                      className={styles.item}
                    />
                  )}
                </div>
              </div>
              <div className={styles.contButtons}>
                <Grid>
                  <Row>
                    <Col xs={12}>
                      <div className={styles.buttons}>
                        <div className={styles.btnDemo}>
                          <ScrollLink href="/#request-demo">
                            <Button
                              tag="button"
                              color="blue"
                              outlined
                              rounded
                              icon="dot"
                              onClick={() => handleCloseMenu()}
                            >
                              <span>Request demo</span>
                            </Button>
                          </ScrollLink>
                        </div>
                        <div className={styles.btnLogin}>
                          {link && (
                            <Link href={ link } passHref>
                              <a className={styles.link} target="_blank">
                                <ButtonCircle
                                  text='Login'
                                  color='blue'
                                />
                              </a>
                            </Link>
                          )}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Grid>
              </div>
            </div>
          )}
      </div>
      <div className={hamburguerMenu ? styles.disableBackground : null} />
    </div>
  );
}

export default HeaderMobile;
