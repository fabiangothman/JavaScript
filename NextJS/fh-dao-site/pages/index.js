import React from "react";
import PropTypes from "prop-types";
import MainLayout from "~layouts/MainLayout";
import Hero from "~sections/Hero";
import AboutGame from "~sections/AboutGame";
import GradientDividerLine from "~baseComponents/GradientDividerLine";
import TheTruth from "~sections/TheTruth";
import GradientBackground from "~baseComponents/GradientBackground";
import TheQuest from "~sections/TheQuest";
import NotJust from "~sections/NotJust";
import Impact from "~sections/Impact";
import Advisors from "~sections/Advisors";
import Team from "~sections/Team";
import Partners from "~sections/Partners";
import FAQ from "~sections/FAQ";

const Home = ({ id }) => {
  return (
    <MainLayout id={id}>
      <Hero id="mainHero" />
      <AboutGame />
      <GradientDividerLine showOnlyOnMobile />
      <TheTruth />
      <GradientDividerLine showOnlyOnMobile />
      <GradientBackground id="backgroundContent" useGreen>
        <TheQuest />
        <NotJust />
        <Impact />
        <Advisors />
        <Team />
        <Partners />
      </GradientBackground>
      <GradientDividerLine showOnlyOnMobile />
      <GradientBackground id="backgroundFooter" useBlue includeFooter>
        <FAQ />
      </GradientBackground>
    </MainLayout>
  );
};

export default Home;

export const HomeType = {
  id: PropTypes.string,
};
Home.defaultProps = {
  id: "HomePage",
};
Home.propTypes = HomeType;
