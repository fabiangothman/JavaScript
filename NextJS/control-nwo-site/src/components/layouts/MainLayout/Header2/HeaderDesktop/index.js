import React from 'react';
import Image from 'baseComponents/CmsImage';
import Link from 'next/link';
import cx from 'classnames';
import ScrollLink from 'baseComponents/ScrollLink';
import Button from 'baseComponents/Button';
import ButtonCircle from 'baseComponents/ButtonCircle';
import MenuItemDesktop from 'baseComponents/MenuItemDesktop';
//  Styles
import styles from './HeaderDesktop.module.scss';

const HeaderDesktop = ({
  className,
  headerMenu = [],
  headerBackground = "gray-light",
  ...props
}) => {
  // console.log(`HeaderDesktop headerMenu: `, headerMenu);
  // return null;

	const nwoImage = require(`../../../../../../public/images/nwo-ai_purple-logo.png`);
  const link = `/#`;

  return (
    <div
      {...props}
      className={cx(
        styles.component,
        className,
        styles[headerBackground],
      )}
    >
      <div className={styles.contHeader}>
        <div className={styles.iconArea}>
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
        </div>
        <div className={styles.menuArea}>
          <div className={styles.navigation}>
            {headerMenu.map((menuItem, index) => (
              <MenuItemDesktop
                key={index}
                menuItem={menuItem}
                className={styles.item}
              />
            ))}
          </div>
          <div className={styles.buttons}>
            <div className={styles.btnDemo}>
              <ScrollLink href="/#request-demo">
                <Button
                  tag="a"
                  color="blue"
                  outlined
                  rounded
                  icon="dot"
                >
                  Request demo
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
        </div>
      </div>
    </div>
  );
}

export default HeaderDesktop;
