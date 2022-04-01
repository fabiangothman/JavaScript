import PropTypes from 'prop-types';
import { useContext, createContext } from 'react';

const ThemeContext = createContext({ theme: 'light' });

export const ThemeContextProvider = ({ theme, children }) => {
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

const useThemeContext = () => {
  return useContext(ThemeContext);
};

export default useThemeContext;

ThemeContextProvider.propTypes = {
  theme: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
