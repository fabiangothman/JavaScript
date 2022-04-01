import React from 'react'
import MainLayout from 'layouts/MainLayout'
import PrivacyPolicy from 'components/sections/PrivacyPolicy'
import { getDefaultSettings } from 'api/utils'

const PrivacyPolicyPage = ({ settings }) => {
  // console.log(`ProductsPage settings: `, settings);
  // return null;
  return (
    <MainLayout {...settings} headerBackground="gray-light">
      <PrivacyPolicy/>
    </MainLayout>
  )
}

export default PrivacyPolicyPage;

export async function getStaticProps() {
  const settings = await getDefaultSettings();

  return {
    props: {
      settings,
    },
  };
}
