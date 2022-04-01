/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from 'prop-types';
import cx from 'classnames';
import { useState, useEffect } from 'react';
import { groupBy } from 'lodash';
import { Link } from 'react-scroll';

import {
  DropdownOpenIcon,
  DropdownCloseIcon,
  TripleVerticalRedBar,
  DropdownCategoryDivider,
} from '~baseComponents/Icons';
import { CompanyType } from '~shared';
import styles from './PortfolioSidebarMobile.module.scss';
import { useNavbarProvider } from '~contexts/NavbarMenuProvider';

const PortfolioSidebarMobile = ({
  content,
  setSelectedCategory,
  resetCurrentAudio,
}) => {
  // eslint-disable-next-line prettier/prettier
  const { portfolioDropdownIsOpen, setIsPortfolioDropdownOpen } =
    useNavbarProvider();
  const [sidebarItems, setSidebarItems] = useState({});
  const [selectedOption, setSelectedOption] = useState({});
  const [selectedMenuCategory, setSelectedMenuCategory] = useState(null);

  const toggling = () => setIsPortfolioDropdownOpen(!portfolioDropdownIsOpen);

  useEffect(() => {
    const items = {
      ...groupBy(content, 'category'),
      All: content,
    };
    setSidebarItems(items);
  }, [content]);

  const onSelectCategoryAtSidebar = (menuName) => {
    setSelectedMenuCategory(menuName);
    setSelectedCategory(menuName);
    resetCurrentAudio();
  };

  const onSelectCompanyAtSidebar = (value) => {
    setIsPortfolioDropdownOpen(false);
    setSelectedOption(value);
    resetCurrentAudio();
  };

  return (
    <div className={styles.dropdown}>
      <div className={styles.dropdownContainer}>
        <div className={styles.dropdownHeader}>
          <span>
            <TripleVerticalRedBar />
          </span>
          <span className={styles.dropdownHeaderSelected} onClick={toggling}>
            {selectedOption?.companyName || content[0].companyName}
          </span>
          {portfolioDropdownIsOpen ? (
            <DropdownCloseIcon onClick={toggling} />
          ) : (
            <DropdownOpenIcon onClick={toggling} />
          )}
          <span>
            <TripleVerticalRedBar />
          </span>
        </div>
        {portfolioDropdownIsOpen && (
          <div className={styles.dropdownListContainer}>
            <div className={styles.dropdownCategories}>
              {Object.keys(sidebarItems).map((category, index) => (
                <>
                  <span
                    className={cx(styles.dropdownCategoriesItem, {
                      [styles.dropdownCategoriesItemActive]:
                        selectedMenuCategory === category,
                    })}
                    onClick={() => onSelectCategoryAtSidebar(category)}
                  >
                    {category}
                  </span>
                  {index !== Object.keys(sidebarItems).length - 1 && (
                    <DropdownCategoryDivider />
                  )}
                </>
              ))}
            </div>
            {selectedMenuCategory && (
              <ul className={styles.dropdownList}>
                {sidebarItems[selectedMenuCategory].map((item) => {
                  return (
                    <li
                      key={item.sysId}
                      className={cx(styles.dropdownListItem, {
                        [styles.dropdownListItemActive]:
                          selectedOption.companyName === item.companyName,
                      })}
                    >
                      <Link
                        onClick={() => onSelectCompanyAtSidebar(item)}
                        to={item.identifier}
                        offset={-50}
                      >
                        {item.companyName}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

PortfolioSidebarMobile.propTypes = {
  content: PropTypes.arrayOf(CompanyType).isRequired,
  resetCurrentAudio: PropTypes.func.isRequired,
  setSelectedCategory: PropTypes.func.isRequired,
};

export default PortfolioSidebarMobile;
