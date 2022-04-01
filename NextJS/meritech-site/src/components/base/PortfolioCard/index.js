import { useState } from 'react';
import cx from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import PropTypes from 'prop-types';
import * as styles from './PortfolioCard.module.scss';
import { ImageType } from '~types';

export default function PortfolioCard({
  className,
  logo,
  //   foundYear,
  tileBackground,
  //   index,
  //   totalItems,
  companysWebsite,
}) {
  const [isHovering, setIsHovering] = useState(false);

  //   const formatedIndex = index <= 9 ? `0${index}` : index;
  return (
    <Link href={companysWebsite ?? ''}>
      <a
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        target="_blank"
        rel="noreferrer noopener"
      >
        <div className={cx(styles.component, className)}>
          <div className={styles.card}>
            {/* <div className={styles.header}>
              <p className={styles.position}>{formatedIndex}</p>
              <p className={styles.number}>_{totalItems}</p>
            </div> */}
            <div
              className={cx(styles.imageContainer, {
                [styles.imageContainerHovered]: isHovering,
              })}
              style={{
                backgroundColor: isHovering
                  ? tileBackground || '#000000'
                  : '#ffffff',
              }}
            >
              {logo.url && (
                <Image
                  alt={logo.alt}
                  src={logo.url}
                  width={logo.width}
                  height={logo.height}
                  objectFit="inherit"
                />
              )}
            </div>
            {/* <div className={styles.footer}>
              <p className={styles.founded}>FOUNDED {foundYear}</p>
            </div> */}
          </div>
        </div>
      </a>
    </Link>
  );
}

PortfolioCard.defaultProps = {
  className: '',
  tileBackground: '#000000',
  companysWebsite: '',
};

export const PortfolioCardType = {
  className: PropTypes.string,
  //   totalItems: PropTypes.number.isRequired,
  logo: ImageType.isRequired,
  tileBackground: PropTypes.string,
  //   foundYear: PropTypes.number.isRequired,
  //   index: PropTypes.number.isRequired,
  companysWebsite: PropTypes.string,
};

PortfolioCard.propTypes = PortfolioCardType;
