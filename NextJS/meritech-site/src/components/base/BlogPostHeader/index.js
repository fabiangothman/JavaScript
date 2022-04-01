import { BlogPostType } from 'types';
import dynamic from 'next/dynamic';
import { parseISO } from 'date-fns';
import isDate from 'date-fns/isDate';
import { format, utcToZonedTime } from 'date-fns-tz';
import Image from 'next/image';
import * as styles from './BlogPostHeader.module.scss';
import RichText from '~baseComponents/RichText';

const BlogPostShareBar = dynamic(
  () => import('~baseComponents/BlogPostShareBar'),
  { ssr: false },
);

export default function BlogPostHeader({
  featuredPostImage,
  publishDate,
  author,
  summary,
  title,
  categories,
}) {
  // Loading time in UTC to avoid time differences
  const dateFormat = parseISO(publishDate);

  return (
    <div className={styles.component}>
      {!!categories.length && (
        <p className={styles.categories}>
          {categories.map((category) => category.title).join(', ')}
        </p>
      )}

      {isDate(dateFormat) && (
        <p className={styles.publishedAt}>
          {format(utcToZonedTime(dateFormat), 'MMM dd, yyyy', {
            timeZone: 'UTC',
          })}
        </p>
      )}

      <h1 id="overview" className={styles.title}>
        {title}
      </h1>
      <BlogPostShareBar author={author} title={title} />
      {featuredPostImage.url && (
        <figure className={styles.thumbnail}>
          <Image
            src={featuredPostImage.url}
            width={featuredPostImage.width}
            height={featuredPostImage.height}
            // objectFit="contain"
            layout="intrinsic"
            alt={featuredPostImage.alt}
          />
        </figure>
      )}
      {summary && (
        <div className={styles.description}>
          <RichText content={summary} />
        </div>
      )}
    </div>
  );
}

BlogPostHeader.propTypes = BlogPostType;
