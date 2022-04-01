import React, { useContext } from 'react';
import cx from 'classnames';
import ScrollLink from 'baseComponents/ScrollLink';
import { Grid, Row, Col } from 'components/grid';
import { ArrowSlimLeft } from 'components/icons';
import { HamburguerMenuContext } from 'layouts/MainLayout/Header2';
//  Styles
import styles from './SubmenuMobile.module.scss';

const SubmenuMobile = ({
  className,
  title = "",
  menuSections = [],
  onClick,
  ...props
}) => {
  // console.log(`SubmenuMobile menuSections: `, menuSections);
  // return null;

  const { setHamburguerMenu } = useContext(
    HamburguerMenuContext,
  );
  const byNeedSubitems = menuSections.filter(menuItem => menuItem.menuItemCategory === "BY NEED");
  const byIndustrySubitems = menuSections.filter(menuItem => menuItem.menuItemCategory === "BY INDUSTRY");
  const byNoneSubitems = menuSections.filter(menuItem => menuItem.menuItemCategory === "NONE");

  const handleCloseMenu = () => {
    setHamburguerMenu(false);
  }

  return (
    <div
      {...props}
      className={cx(styles.component, className)}
    >
      <div className={styles.header}>
        <Grid>
          <Row>
            <Col xs={12}>
              <div
                className={styles.headerWrapper}
                onClick={onClick}
              >
                <div className={styles.contArrow}>
                  <div className={styles.arrowIcon}>
                    <ArrowSlimLeft width="12" />
                  </div>
                </div>
                <div className={styles.title}>
                  <span>{ title }</span>
                </div>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
      {byNeedSubitems.length > 0 && (
        <div className={styles.category}>
          <Grid>
            <Row>
              <Col xs={12}>
                <div className={styles.titleCat}>
                  <span>BY NEED</span>
                </div>
                {byNeedSubitems.map((subitem, index) => (
                  <div
                    key={index}
                    className={styles.item}
                    onClick={() => handleCloseMenu()}
                  >
                    {subitem.link ? (
                      <ScrollLink href={ subitem.link } passHref>
                        <a
                          className={styles.link}
                          target={subitem.openInANewTab ? "_blank" : "_self"}
                        >{ subitem.label }</a>
                      </ScrollLink>
                    ) : (
                      <span className={styles.link}>{ subitem.label }</span>
                    )}
                  </div>
                ))}
              </Col>
            </Row>
          </Grid>
        </div>
      )}
      {byIndustrySubitems.length > 0 && (
        <div className={styles.category}>
          <Grid>
            <Row>
              <Col xs={12}>
                <div className={styles.titleCat}>
                  <span>BY INDUSTRY</span>
                </div>
                {byIndustrySubitems.map((subitem, index) => (
                  <div
                    key={index}
                    className={styles.item}
                    onClick={() => handleCloseMenu()}
                  >
                    {subitem.link ? (
                      <ScrollLink href={ subitem.link } passHref>
                        <a
                          className={styles.link}
                          target={subitem.openInANewTab ? "_blank" : "_self"}
                        >{ subitem.label }</a>
                      </ScrollLink>
                    ) : (
                      <span className={styles.link}>{ subitem.label }</span>
                    )}
                  </div>
                ))}
              </Col>
            </Row>
          </Grid>
        </div>
      )}
      {byNoneSubitems.length > 0 && (
        <div className={styles.category}>
          <Grid>
            <Row>
              <Col xs={12}>
                {byNoneSubitems.map((subitem, index) => (
                  <div
                    key={index}
                    className={styles.item}
                    onClick={() => handleCloseMenu()}
                  >
                    {subitem.link ? (
                      <ScrollLink href={ subitem.link } passHref>
                        <a
                          className={styles.link}
                          target={subitem.openInANewTab ? "_blank" : "_self"}
                        >{ subitem.label }</a>
                      </ScrollLink>
                    ) : (
                      <span className={styles.link}>{ subitem.label }</span>
                    )}
                  </div>
                ))}
              </Col>
            </Row>
          </Grid>
        </div>
      )}
    </div>
  );
}

export default SubmenuMobile;
