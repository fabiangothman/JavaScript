import React from 'react';
import Image from 'baseComponents/CmsImage';
import Link from 'next/link';
import cx from 'classnames';
import { Col, Grid, Row } from 'components/grid';
import Header from 'baseComponents/Header';
//  Styles
import styles from './EventCard.module.scss';

const EventCard = ({
  className,
  date = 0,
  image = null,
  link = "",
  text = "",
  title = "",
  openInANewTab = false,
  ...props
}) => {
  // console.log(`EventCard content: `, content);
  // return null;

  const dateFormat = new Date(date);
  
  return (
    <div
      {...props}
      className={cx(styles.component, className)}
    >
      <div className={styles.contImage}>
        {image && <Image
          alt={image.alt}
          src={image.url}
          width={image.width}
          height={image.height}
          objectFit="cover"
          layout="responsive"
          className={styles.image}
        />}
      </div>
      {link && (
        <Link href={ link } passHref>
          <a className={styles.link} target={openInANewTab ? "_blank" : "_self"}>
            <div className={styles.eventArea}>
              <div className={styles.dateCont}>
                <div className={styles.day}>
                  {date && (
                    <span>
                      {dateFormat.getUTCDate().toLocaleString('en-US', {
                        minimumIntegerDigits: 2,
                      })}
                    </span>
                  )}
                </div>
                <div className={styles.date}>
                  {date && (
                    <span>{`
                      ${dateFormat.toLocaleString('en-US', {
                        month: 'short',
                        timeZone: 'UTC',
                      })}, ${dateFormat.getUTCFullYear()}
                    `}
                    </span>
                  )}
                </div>
              </div>
              <div className={styles.infoCont}>
                <div className={styles.title}>
                  <Header tag="div" gradient>{ title }</Header>
                </div>
                <div className={styles.text}>
                  {text && (
                    <span>{ text }</span>
                  )}
                </div>
              </div>
            </div>
          </a>
        </Link>
      )}      
    </div>
  );
}

export default EventCard;
