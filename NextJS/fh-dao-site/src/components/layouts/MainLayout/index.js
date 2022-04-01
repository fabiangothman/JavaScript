import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import cx from "classnames";
import SEO from "./SEO";
import Footer from "./Footer";
import Header from "./Header";
import HeaderMessage from "./HeaderMessage";
// Styles
import styles from "./MainLayout.module.scss";
import NatureBackground from "./NatureBackground";

const MainLayout = ({ id, className, children, ...props }) => {
  // console.log(`MainLayout props: `, props);
  // return null;

  const headerMessage =
    "Limited pre-launch preview. Please do not share. Things will still change before launch.";
  const sitelogoName = "Future Quest";
  const menu = [
    { label: "The list", url: "https://www.google.com/", openInNewTab: true },
    { label: "The paper", url: "https://www.google.com/", openInNewTab: true },
    {
      label: "Medium",
      url: "https://medium.com/futurequest",
      openInNewTab: true,
    },
  ];
  const discordUrl = "https://discord.gg/kbe7gVZ45q";
  const twitterUrl = "https://twitter.com/futurequestdao";

  return (
    <div id={id} className={cx(styles.component, className)} {...props}>
      <SEO />
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <HeaderMessage headerMessage={headerMessage} />
      <NatureBackground>
        <Header
          sitelogoName={sitelogoName}
          headerMenu={menu}
          discordUrl={discordUrl}
          twitterUrl={twitterUrl}
        />
        {children}
      </NatureBackground>
      <Footer
        sitelogoName={sitelogoName}
        footerMenu={menu}
        discordUrl={discordUrl}
        twitterUrl={twitterUrl}
      />
    </div>
  );
};

export default MainLayout;

export const MainLayoutType = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
};
MainLayout.defaultProps = {
  className: "",
  children: null,
};
MainLayout.propTypes = MainLayoutType;
