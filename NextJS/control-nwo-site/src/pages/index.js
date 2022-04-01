import React from 'react';
import MainLayout from 'layouts/MainLayout';
import MainHero2 from 'components/heros/MainHero2';
import Description2 from 'components/sections/Description2';
import Stats from 'components/sections/Stats';
import Goal from 'components/sections/Goal';
import Mission from 'components/sections/Mission';
import SignUp from 'components/sections/SignUp';
import RequestDemo2 from 'components/sections/RequestDemo2';
import { getDefaultSettings } from 'api/utils';
import Consumer from './erase/Consumer';

const IndexPage = ({ settings }) => {
  // console.log(`ProductsPage settings: `, settings);
  // return null;
  return (
    <MainLayout {...settings} headerBackground="gray-light">
      <MainHero2 id="hero"/>
      <Description2 id="description" />
      <Stats id="stats" />
      <Goal id="goal" />
      <Mission id="mission" />
      <SignUp id="signup" />
      <RequestDemo2 slug="request-demo"/>
    </MainLayout>
  );
}

export default IndexPage;

export async function getStaticProps() {
  const settings = await getDefaultSettings();

  return {
    props: {
      settings,
    },
  };
}
