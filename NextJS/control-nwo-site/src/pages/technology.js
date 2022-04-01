import React from 'react';
import MainLayout from 'layouts/MainLayout';
import TechnologyHero2 from 'components/heros/TechnologyHero2';
import TechnologyTiles2 from 'components/sections/TechnologyTiles2';
import TechnologySlider2 from 'components/sections/TechnologySlider2';
import ProcessSteps from 'components/sections/ProcessSteps';
import { getDefaultSettings } from 'api/utils';

function TechnologyPage ({ settings }) {
  return (
    <MainLayout {...settings} headerBackground="gray-light">
      <TechnologyHero2 id="hero" />
      <TechnologyTiles2 id="overview" />
      <TechnologySlider2 id="key-strengths" />
      <ProcessSteps id="steps" />
    </MainLayout>
  )
}

export default TechnologyPage;

export async function getStaticProps() {
  const settings = await getDefaultSettings();

  return {
    props: {
      settings,
    },
  };
}
