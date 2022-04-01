import Image from 'next/image';
import { BlogPostType } from 'types';
import Link from 'next/link';
import { parseISO } from 'date-fns';
import isDate from 'date-fns/isDate';
import { format, utcToZonedTime } from 'date-fns-tz';
import * as styles from './FeatureBlogPostCard.module.scss';

export default function FeatureBlogPostCard({
  landingPageImage,
  categories,
  publishDate,
  title,
  author,
  slug,
  className,
}) {
  const [firstName, ...lastName] = (author || '').split(' ');
  const dateFormat = parseISO(publishDate);

  return (
    <Link href={`/blog/${slug}`}>
      <a className={className} aria-label={`Open ${title} blog post`}>
        <div className={styles.component}>
          <div className={styles.cardContainer}>
            {landingPageImage?.url && (
              <Image
                alt={landingPageImage.alt}
                src={landingPageImage.url}
                width={landingPageImage.width}
                height={landingPageImage.height}
                layout="intrinsic"
                className={styles.header}
              />
            )}
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
              <h3 className={styles.title}>{title}</h3>
              <p className={styles.author}>
                {`By ${firstName} `}
                {!!lastName.length && <span>{lastName.join(' ')}</span>}
              </p>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}

FeatureBlogPostCard.propTypes = BlogPostType;
