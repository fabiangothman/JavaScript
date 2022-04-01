import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import cx from 'classnames';
import ScrollLink from 'baseComponents/ScrollLink';
import { TriangleSelector } from 'components/icons';
//  Styles
import styles from './MenuItemDesktop.module.scss';
import reactDOM from 'react-dom';

const MenuItemDesktop = ({
  className,
  menuItem,
  ...props
}) => {
  // console.log(`MenuItemDesktop menuItem: `, menuItem);
  // return null;

  const router = useRouter();
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [itemWidth, setItemWidth] = useState(0);
  const itemRef = useRef();
  
  const byNeedSubitems = menuItem.childrenLinks.filter(menuItem => menuItem.menuItemCategory === "BY NEED");
  const byIndustrySubitems = menuItem.childrenLinks.filter(menuItem => menuItem.menuItemCategory === "BY INDUSTRY");
  const byNoneSubitems = menuItem.childrenLinks.filter(menuItem => menuItem.menuItemCategory === "NONE");
  

  useEffect(() => {
    if (itemRef.current) {
      setTimeout(() => {
        const element=reactDOM.findDOMNode(itemRef.current);
        setItemWidth(element.getBoundingClientRect().width);
      }, 300);
    }
    const resizeListener = () => {
      if (itemRef.current) {
        const element=reactDOM.findDOMNode(itemRef.current);
        setItemWidth(element.getBoundingClientRect().width);
      }
    }
    window.addEventListener('resize', resizeListener);
    return () => {
      window.removeEventListener('resize', resizeListener);
    }
  }, [itemRef.current]);

  return (
    <div
      id={menuItem.id}
      {...props}
      className={cx(styles.component, className)}
      onMouseEnter={() => setShowSubMenu(true)}
      onMouseLeave={() => setShowSubMenu(false)}
    >
      <nav
        className={cx(
          styles.item,
          router.pathname === menuItem.parentLink.link ? styles.active : null
        )}
      >
        {menuItem.parentLink.link ? (
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
      {menuItem.childrenLinks.length > 0 && (
        <div
          ref={itemRef}
          style={{left: `calc(-0.3*${itemWidth}px + 1rem)`}}
          className={cx(
            showSubMenu ? styles.show : styles.hide,
            styles.boxArea,
          )}
        >
          <div className={styles.spacing} />
          <div
          style={{left: `calc(+0.3*${itemWidth}px + 1rem)`}}
            className={styles.triangleSelector}
          >
            <div className={styles.triangleCont}>
              <TriangleSelector width="20" height="100%" />
            </div>
          </div>
          <div className={styles.subItems}>
            {byNeedSubitems.length > 0 && (
              <div className={styles.list}>
                <div className={styles.title}>
                  <span>BY NEED</span>
                </div>
                {byNeedSubitems.map((subitem, index) => (
                  <nav key={index} className={styles.subitem}>
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
                  </nav>
                ))}
              </div>
            )}
            {(byNeedSubitems.length > 0 && byNeedSubitems.length > 0) && (
              <div className={styles.lineVertical} />
            )}
            {byIndustrySubitems.length > 0 && (
              <div className={styles.list}>
                <div className={styles.title}>
                  <span>BY INDUSTRY</span>
                </div>
                {byIndustrySubitems.map((subitem, index) => (
                  <nav key={index} className={styles.subitem}>
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
                  </nav>
                ))}
              </div>
            )}
            {(byNeedSubitems.length > 0 || byNeedSubitems.length > 0)
              && byNoneSubitems.length > 0 && (
              <div className={styles.lineVertical} />
            )}
            {byNoneSubitems.length > 0 && (
              <div className={styles.list}>
                {byNoneSubitems.map((subitem, index) => (
                  <nav key={index} className={styles.subitem}>
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
                  </nav>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default MenuItemDesktop;
