/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useEffect } from 'react';
import { groupBy } from 'lodash';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-scroll';

import { TripleVerticalRedBar } from '~baseComponents/Icons';
import styles from './PortfolioSidebar.module.scss';
import { CompanyType } from '~shared';

const PortfolioSidebar = ({
  content,
  setSelectedCategory,
  resetCurrentAudio,
}) => {
  const [sidebarItems, setSidebarItems] = useState({});
  const [selectedMenuCategory, setSelectedMenuCategory] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    const items = {
      ...groupBy(content, 'category'),
      All: content,
    };
    setSidebarItems(items);
  }, [content]);

  const onSelectCategoryAtSidebar = (item) => {
    setSelectedCategory(item);
    setSelectedMenuCategory(item);
    resetCurrentAudio();
  };

  const onSelectCompanyAtSidebar = (company) => {
    setSelectedCompany(company);
  };

  return (
    <nav className={styles.sidebar}>
      <ul>
        {Object.keys(sidebarItems).map((item) => (
          <li
            className={styles.sidebarItem}
            onClick={() => onSelectCategoryAtSidebar(item)}
          >
            {item}
            {selectedMenuCategory === item && sidebarItems[item].length && (
              <ul className={cx(styles.sidebarSlide)}>
                {sidebarItems[item].map((sub) => (
                  <li
                    className={cx(styles.sidebarSubItem, {
                      [styles.sidebarSubItemActive]:
                        selectedCompany &&
                        sub.companyName === selectedCompany.companyName,
                    })}
                  >
                    {selectedCompany &&
                      sub.companyName === selectedCompany.companyName && (
                        <TripleVerticalRedBar />
                      )}
                    <Link
                      onClick={() => onSelectCompanyAtSidebar(sub)}
                      to={sub.identifier}
                      offset={-220}
                    >
                      {sub.companyName}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

PortfolioSidebar.propTypes = {
  content: PropTypes.arrayOf(CompanyType).isRequired,
  resetCurrentAudio: PropTypes.func.isRequired,
  setSelectedCategory: PropTypes.func.isRequired,
};

export default PortfolioSidebar;
