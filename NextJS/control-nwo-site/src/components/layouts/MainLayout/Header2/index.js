import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import HeaderDesktop from './HeaderDesktop';
import HeaderMobile from './HeaderMobile';
//  Styles
import styles from './Header2.module.scss';

export const HamburguerMenuContext = createContext({
  hamburguerMenu: false,
  setHamburguerMenu: () => {},
});

const Header2 = ({
  headerMenu = [],
  headerBackground = "gray-light",
}) => {
  // console.log(`Header2 headerMenu: `, headerMenu);
  // return null;

  const [hamburguerMenu, setHamburguerMenu] = useState(false);
  const value = { hamburguerMenu, setHamburguerMenu };

  useEffect(() => {
    async function checkUser() {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
          withCredentials: true,
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0',
          }
        })
        if (response?.data?.profile) {
          window.location.href = process.env.NEXT_PUBLIC_APP_URL
        }
      } catch (e) {
        // console.log("Result checking authenticated used on API: ", e);
      }
    }
    if(process.env.ENVIRONMENT==="production"){
      checkUser();
    }
  }, [])

  return (
    <header className={styles.component}>
      <div className={styles.contHeader}>
        <HamburguerMenuContext.Provider value={value}>
          <HeaderDesktop
            className={styles.showOnDesktop}
            headerMenu={headerMenu}
            headerBackground={headerBackground}
          />
          <HeaderMobile
            className={styles.showOnMobile}
            headerMenu={headerMenu}
            headerBackground={headerBackground}
          />
        </HamburguerMenuContext.Provider>
      </div>
    </header>
  );
}

export default Header2;
