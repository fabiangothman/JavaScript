import React, { useState, createContext, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

const NavbarMenuContext = createContext({});

export default function NavbarMenuProvider({ children }) {
  const [isNavbarMenuOpen, setIsNavbarMenuOpen] = useState(false);
  const [isPortfolioDropdownOpen, setIsPortfolioDropdownOpen] = useState(false);

  useEffect(() => {
    const bodyEl = document.getElementsByTagName('body')[0];
    if (bodyEl) {
      bodyEl.style.overflowY = isNavbarMenuOpen ? 'hidden' : 'auto';
    }
  }, [isNavbarMenuOpen]);

  useEffect(() => {
    const bodyEl = document.getElementsByTagName('body')[0];
    if (bodyEl) {
      bodyEl.style.overflowY = isPortfolioDropdownOpen ? 'hidden' : 'auto';
    }
  }, [isPortfolioDropdownOpen]);

  return (
    <NavbarMenuContext.Provider
      value={{
        menuIsOpen: isNavbarMenuOpen,
        setIsNavbarMenuOpen,
        portfolioDropdownIsOpen: isPortfolioDropdownOpen,
        setIsPortfolioDropdownOpen,
      }}
    >
      {children}
    </NavbarMenuContext.Provider>
  );
}

NavbarMenuProvider.defaultProps = {
  children: {},
};

NavbarMenuProvider.propTypes = {
  children: PropTypes.node,
};

export const useNavbarProvider = () => {
  const context = useContext(NavbarMenuContext);

  if (!context) {
    throw new Error(
      'useNavbarProvider must be used within an NavbarMenuProvider.',
    );
  }

  return context;
};
