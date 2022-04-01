import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import cx from 'classnames';
import ScrollLink from 'baseComponents/ScrollLink';
import { Grid, Row, Col } from 'components/grid';
import { ArrowSlimRight } from 'components/icons';
import { HamburguerMenuContext } from 'layouts/MainLayout/Header2';
//  Styles
import styles from './MenuItemMobile.module.scss';

const MenuItemMobile = ({
  className,
  menuItem,
  onClick,
  ...props
}) => {
  // console.log(`MenuItemMobile menuItem: `, menuItem);
  // return null;

  const router = useRouter();
  const { setHamburguerMenu } = useContext(
    HamburguerMenuContext,
  );

  const handleCloseMenu = () => {
    setHamburguerMenu(false);
  }

  return (
    <div
      {...props}
      className={cx(styles.component, className)}
    >
      <div className={styles.item}>
        <Grid>
          <Row>
            <Col xs={10} className={styles.alignCenter}>
              <nav
                className={cx(
                  styles.page,
                  router.pathname === menuItem.parentLink.link ? styles.active : null
                )}
                onClick={onClick}
              >
                {menuItem.childrenLinks.length==0 && menuItem.parentLink.link ? (
                  <ScrollLink href={ menuItem.parentLink.link } passHref>
                    <a
                      className={styles.link}
                      target={menuItem.parentLink.openInANewTab ? "_blank" : "_self"}
                    >{ menuItem.parentLink.label }</a>
                  </ScrollLink>
                ) : (
                  <span className={styles.link}>{ menuItem.parentLink.label }</span>
                )}
              </nav>
            </Col>
            <Col xs={2} className={styles.alignCenter}>
              <div
                className={styles.contArrow} 
                onClick={onClick}
              >
                <div className={styles.arrowIcon}>
                  <ArrowSlimRight width="12" />
                </div>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    </div>
  );
}

export default MenuItemMobile;
