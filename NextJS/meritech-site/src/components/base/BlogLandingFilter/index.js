import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Link from 'next/link';
import cx from 'classnames';
import { UpArrow } from 'components/icons';
import * as styles from './BlogLandingFilter.module.scss';
import useIsMobile from '~hooks/useIsMobile';

export default function BlogLandingFilter({ categories }) {
  const [showSection, setShowSection] = useState(false);
  const router = useRouter();
  const category = router?.query?.category;
  const isMobile = useIsMobile(992);

  useEffect(() => {
    setShowSection(!isMobile);
  }, [isMobile]);

  if (!categories?.length) {
    return null;
  }

  return (
    <div className={styles.component}>
      <div className={styles.header}>
        <div className={styles.contentText}>
          <span className={styles.titleText}>FILTER</span>
        </div>
        <button
          className={styles.contentButton}
          type="button"
          onClick={() => setShowSection(!showSection)}
        >
          {showSection ? (
            <UpArrow />
          ) : (
            <UpArrow style={{ transform: 'rotate(180deg)' }} />
          )}
        </button>
      </div>
      <div
        className={cx(
          styles.menuContainer,
          showSection ? styles.showContent : styles.hideContent,
        )}
      >
        <nav className={styles.nav}>
          <ul>
            <li className={cx(styles.list)}>
              <Link href="/research">
                <a
                  className={cx(styles.listItem, {
                    [styles.listItemActived]: !category,
                  })}
                >
                  All
                </a>
              </Link>
            </li>
            {categories.map((title, index) => {
              return (
                <li className={styles.list} key={index}>
                  <Link href={`/research/category/${title.slug}`}>
                    <a
                      className={cx(styles.listItem, {
                        [styles.listItemActived]: title.slug === category,
                      })}
                    >
                      {title.title}
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}

BlogLandingFilter.defaultProps = {
  categories: [],
};

BlogLandingFilter.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string,
      title: PropTypes.string,
    }),
  ),
};
