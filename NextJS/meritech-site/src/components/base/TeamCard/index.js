import cx from 'classnames';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LeftArrow } from 'components/icons';
import PropTypes from 'prop-types';
import * as styles from './TeamCard.module.scss';
import { ImageType } from '~types';

export default function TeamCard({ image, role, slug, fullName }) {
  const [firstName, ...lastName] = fullName.split(' ');
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className={cx(styles.component)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Link href={`/team-members/${slug}`}>
        <a>
          <div
            className={cx(styles.image, { [styles.imageScaled]: isHovering })}
          >
            <Image
              alt={image.alt}
              src={image.url}
              objectFit="cover"
              layout="fill"
            />
            <div className={styles.content}>
              <div className={styles.social_container}>
                <div className={styles.socialMedia}>
                  <LeftArrow />
                </div>
              </div>
            </div>
          </div>
        </a>
      </Link>
      <div className={styles.bottom_text}>
        <p className={cx(styles.name, { [styles.nameActived]: isHovering })}>
          {firstName} {lastName}
          {/* {!!lastName.length && <strong>{lastName.join(' ')}</strong>} */}
        </p>
        <p className={styles.role}>{role}</p>
      </div>
    </div>
  );
}

export const TeamCardType = {
  fullName: PropTypes.string.isRequired,
  image: ImageType.isRequired,
  role: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

TeamCard.propTypes = TeamCardType;
