import { useState } from 'react';
import Image from 'next/image';
import { BlogPostType } from 'types';
import Link from 'next/link';
import { parseISO } from 'date-fns';
import isDate from 'date-fns/isDate';
import { format, utcToZonedTime } from 'date-fns-tz';
import cx from 'classnames';

import * as styles from './BlogPostCard.module.scss';

export default function BlogPostCard({
  categories,
  publishDate,
  thumbnail,
  title,
  author,
  slug,
  className,
}) {
  const [firstName, ...lastName] = (author || '').split(' ');
  const [isHovering, setIsHovering] = useState(false);
  const dateFormat = parseISO(publishDate);

  return (
    <Link href={`/blog/${slug}`}>
      <a
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className={className}
        aria-label={`Open ${title} blog post`}
      >
        <div className={styles.component}>
          <div className={styles.cardContainer}>
            <div
              className={cx(styles.thumbnailContainer, {
                [styles.thumbnailContainerScaled]: isHovering,
              })}
            >
              {thumbnail?.url && (
                <Image
                  alt={thumbnail.alt}
                  src={thumbnail.url}
                  layout="fill"
                  objectFit="cover"
                  className={styles.header}
                />
              )}
            </div>
            <div className={styles.body}>
              {!!categories.length && (
                <p className={styles.category}>
                  {categories.map((category) => category.title).join(', ')}
                </p>
              )}

              {isDate(dateFormat) && (
                <p className={styles.date}>
                  {format(utcToZonedTime(dateFormat), 'MMM dd, yyyy', {
                    timeZone: 'UTC',
                  })}
                </p>
              )}
              <h3
                className={cx(styles.title, {
                  [styles.titleHovered]: isHovering,
                })}
              >
                {title}
              </h3>
              <p className={styles.author}>
                {`By ${firstName} ${lastName}`}
                {/* {!!lastName.length && <strong>{lastName.join(' ')}</strong>} */}
              </p>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}

BlogPostCard.propTypes = BlogPostType;
