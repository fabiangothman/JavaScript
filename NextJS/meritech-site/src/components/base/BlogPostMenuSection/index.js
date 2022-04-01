import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import cx from 'classnames';
import { UpArrow } from 'components/icons';
import { BlogPostType } from 'types';
import * as styles from './BlogPostMenuSection.module.scss';
import { formatClassName } from '~charts/utils';

export default function BlogPostMenuSection({ slug, summary }) {
  // console.log("BlogPostMenuSection slug: ", slug);

  const [showSection, setShowSection] = useState(false);
  const [titles, setTitles] = useState([]);
  const [activedContent, setActivedContent] = useState();
  const [menuPosition, setMenuPosition] = useState(0);
  const router = useRouter();
  const menuItemsArea = useRef();

  const checkMenuPosition = (activedContentText = '') => {
    const menuArea = document.getElementById('menuItems') || null;
    let isAllVisible = true;
    if (menuArea)
      isAllVisible =
        menuArea.getBoundingClientRect().top + menuArea.clientHeight <
        window.innerHeight;

    if (!isAllVisible) {
      const menuItems = [...document.querySelectorAll('ul#menuItems li')] || [];
      // console.log(`menuItemsArea: `, menuItemsArea.current.getBoundingClientRect());
      setMenuPosition(0);
      menuItems.reverse().forEach((el) => {
        if (activedContentText === el.innerText) {
          // const activeItemProps = el.getBoundingClientRect();
          setMenuPosition(-el.offsetTop / 2);
        }
      });
    }
  };

  const verifyActivedMenu = () => {
    // It changes the actived menu when the H2 titles
    // reaches the middle of the screen during the scroll.
    const h2s = [...document.querySelectorAll('h2')] || [];
    const clientHeight = window.innerHeight;
    let closestToCenter = null;
    h2s.reverse().forEach((el) => {
      const bottomPosition = el.getBoundingClientRect().bottom;
      if (closestToCenter) {
        return null;
      }

      if (
        clientHeight > bottomPosition &&
        bottomPosition - clientHeight / 2 <= 0
      ) {
        closestToCenter = el.innerText;
      }
      return null;
    });

    setActivedContent(closestToCenter);
    checkMenuPosition(closestToCenter);
  };

  const handleRedirections = (e, hash) => {
    e.preventDefault();
    let path = router.pathname;
    path = `${path.replace('[slug]', slug)}/#${hash}`;
    router.replace(path);
  };

  useEffect(() => {
    setActivedContent();
    checkMenuPosition(0);
    setTitles([]);
    setShowSection(false);

    const h2s = document.querySelectorAll('.blog-content h2');
    const html = document.querySelector('html');
    if (h2s.length) {
      // It adds an ID for each H2 title.
      h2s.forEach((el) => {
        el.setAttribute('id', formatClassName(el.innerText));
      });

      // It creates a menu with all H2 title as a link.
      setTitles(() =>
        [...h2s].map(({ innerText }) => ({
          text: innerText,
          url: innerText.toLowerCase().replace(/ /g, '-'),
        })),
      );
      html.style.scrollBehavior = 'smooth';
    }

    const onScrollHandler = () => {
      verifyActivedMenu();
    };
    window.addEventListener('scroll', onScrollHandler);
    return () => window.addEventListener('scroll', onScrollHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  if (!titles.length) {
    return null;
  }

  return (
    <div className={cx(styles.component, 'blog-content-menu')}>
      <div className={styles.header}>
        <div className={styles.contentText}>
          <span className={styles.titleText}>ARTICLE CONTENTS</span>
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
          { [styles.withBorderBottom]: showSection },
          showSection ? styles.showContent : styles.hideContent,
        )}
      >
        <nav className={styles.nav}>
          <ul
            id="menuItems"
            ref={menuItemsArea}
            className={styles.items}
            style={{ transform: `translate(0, ${menuPosition}px)` }}
          >
            {summary && (
              <li className={cx(styles.list)}>
                {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
                <nav
                  onClick={(e) =>
                    handleRedirections(e, formatClassName('overview'))
                  }
                  onKeyDown={(e) =>
                    handleRedirections(e, formatClassName('overview'))
                  }
                  className={cx(styles.listItem, {
                    [styles.listItemActived]: !activedContent,
                  })}
                >
                  Overview
                </nav>
              </li>
            )}
            {titles.map((title, index) => {
              return (
                <li className={styles.list} key={index}>
                  {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
                  <nav
                    onClick={(e) =>
                      handleRedirections(e, formatClassName(title.url))
                    }
                    onKeyDown={(e) =>
                      handleRedirections(e, formatClassName(title.url))
                    }
                    className={cx(styles.listItem, {
                      [styles.listItemActived]: title.text === activedContent,
                    })}
                  >
                    {title.text}
                  </nav>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
BlogPostMenuSection.propTypes = BlogPostType;
