import React from 'react'
import MainLayout from 'layouts/MainLayout'
import Terms from 'components/sections/Terms'
import { getDefaultSettings } from 'api/utils'

const TermsConditionsPage = ({ settings }) => {
  // console.log(`ProductsPage settings: `, settings);
  // return null;
  return (
    <MainLayout {...settings} headerBackground="gray-light">
      <Terms/>
    </MainLayout>
  )
}

export default TermsConditionsPage;

export async function getStaticProps() {
  const settings = await getDefaultSettings();

  return {
    props: {
      settings,
    },
  };
}
