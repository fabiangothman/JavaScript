/* eslint-disable jsx-a11y/anchor-is-valid, no-unused-expressions, jsx-a11y/click-events-have-key-events, jsx-a11y/interactive-supports-focus */
import React, { useState, useEffect } from 'react';
import { SecondaryNavMobileArrow, DownArrow } from 'components/icons';
import Link from 'next/link';
import cx from 'classnames';
import useIsMobile from '~hooks/useIsMobile';
import styles from './SecondaryNavigation.module.scss';
import navigation from './data';

function SecondaryNavigation() {
  const isMobile = useIsMobile();
  const [selectedParent, setSelectedParent] = useState(null);
  const [selectedChild, setSelectedChild] = useState(null);
  const [expandedParent, setExpandedParent] = useState(null);
  const unsetExpanded = (e) => {
    e.preventDefault();
    setExpandedParent(null);
  };
  const expandSecondaryNav = (e) => {
    setExpandedParent(selectedParent);
    e.preventDefault();
    e.stopPropagation();
  };

  useEffect(() => {
    if (window.location.pathname) {
      navigation.forEach((navigationItem) => {
        if (!navigationItem.subNavigation) {
          if (window.location.pathname === `${navigationItem.link}`) {
            setSelectedParent(navigationItem);
          }
        } else {
          navigationItem.subNavigation?.forEach((subNavigationItem) => {
            if (
              window.location.pathname ===
              `/benchmarking/${navigationItem.subLinkPrefix}/${subNavigationItem.link}`
            ) {
              setSelectedParent(navigationItem);
              setSelectedChild(subNavigationItem);
            }
          });
        }
      });
    } else {
      // Selecting First Nav Parent and Item by default
      setSelectedParent(navigation[0]);
      setSelectedChild(navigation[0].subNavigation[0]);
    }
    window.addEventListener('click', unsetExpanded);
    return () => {
      window.removeEventListener('click', unsetExpanded);
    };
  }, []);

  const setExpandedHandler = (e, navItem) => {
    setExpandedParent(navItem);
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div
      className={cx(styles.wrapper, {
        [styles.wrapperWithRelative]: !!expandedParent,
      })}
    >
      {isMobile && !expandedParent && selectedParent ? (
        <>
          <ul className={cx('container', styles.selectedNav)}>
            <li>
              <Link href={selectedParent.link}>
                <a>
                  <span>{selectedParent.text}</span>{' '}
                  <SecondaryNavMobileArrow onClick={expandSecondaryNav} />
                </a>
              </Link>
            </li>
            {selectedParent.text === 'Comps Table' && (
              <li>
                <Link href={selectedParent.link}>
                  <a>
                    <span>{selectedParent.text}</span>{' '}
                  </a>
                </Link>
              </li>
            )}
            {selectedChild && (
              <li>
                <Link href={selectedChild.link}>
                  <a>
                    <span>{selectedChild.text}</span>{' '}
                  </a>
                </Link>
              </li>
            )}
          </ul>
        </>
      ) : (
        //   This is desktop view
        <>
          <SecondaryNavMobileArrow
            className={styles.closeArrow}
            onClick={() => setExpandedParent(null)}
          />
          <ul className="container">
            {navigation.map((navigationItem, index) => (
              <li
                onMouseLeave={() => {
                  !isMobile && setExpandedParent(null);
                }}
                key={`navigation-item-${index + 1}`}
                className={cx(
                  {
                    [styles.active]:
                      navigationItem.text === selectedParent?.text,
                  },
                  {
                    [styles.expanded]:
                      navigationItem.text === expandedParent?.text,
                  },
                )}
              >
                <Link href={navigationItem.link}>
                  <a
                    role="link"
                    onMouseEnter={(e) =>
                      !isMobile &&
                      navigationItem.subNavigation &&
                      setExpandedHandler(e, navigationItem)
                    }
                    onClick={(e) =>
                      navigationItem.subNavigation &&
                      setExpandedHandler(e, navigationItem)
                    }
                  >
                    <span>{navigationItem.text}</span>{' '}
                    {navigationItem.subNavigation && <DownArrow />}
                  </a>
                </Link>
                {navigationItem.subNavigation && (
                  <ul>
                    {navigationItem.subNavigation.map(
                      (subNavigationItem, subIndex) => (
                        <li
                          key={`sub-navigation-item-${subIndex + 1}`}
                          className={cx({
                            [styles.active]:
                              navigationItem.text === selectedParent?.text &&
                              subNavigationItem.text === selectedChild?.text,
                          })}
                        >
                          <Link
                            href={`/benchmarking/${navigationItem.subLinkPrefix}/${subNavigationItem.link}`}
                          >
                            <a
                              role="link"
                              onClick={() => {
                                setSelectedParent(navigationItem);
                                setSelectedChild(subNavigationItem);
                              }}
                            >
                              {subNavigationItem.text}
                            </a>
                          </Link>
                        </li>
                      ),
                    )}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

SecondaryNavigation.propTypes = {};

export default SecondaryNavigation;
