import React from 'react';
import MainLayout from 'layouts/MainLayout';
import { getPageFieldsAndSettings } from 'api/utils';
import { getAllEntries } from 'api';
import OpenPositionDetails from 'components/sections/OpenPositionDetails';

const OpenPositionTemplate = ({ settings, mailto, data }) => {
  // console.log(`OpenPositionTemplate data: `, data);
  // return null;

  return (
    <MainLayout {...settings} headerBackground="gray-lighter">
      <OpenPositionDetails
        id="position-details"
        mailto={mailto}
        {...data}
      />
    </MainLayout>
  )
}

export default OpenPositionTemplate;

export async function getStaticPaths() {
  const data = await getAllEntries({
    content_type: 'templateOpenPosition',
  });
  const paths = data.items.map(({ fields }) => ({
    params: { slug: fields.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  // console.log(`params: `, params);
  const data = await getPageFieldsAndSettings({
    content_type: 'templateOpenPosition',
    'fields.slug': params.slug,
    include: 4,
  });

  return {
    props: {
      settings: data?.settings,
      mailto: data?.settings.mailto,
      data,
    },
    revalidate: 1,
  };
}
