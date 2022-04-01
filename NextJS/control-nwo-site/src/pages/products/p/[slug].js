import React from 'react';
import MainLayout from 'layouts/MainLayout';
import { formatCard, formatImage, getPageFieldsAndSettings } from 'api/utils';
import { getAllEntries } from 'api';
import CatalogItemDetail from 'components/sections/CatalogItemDetail';

const CatalogItemTemplate = ({ settings, detail }) => {
  // console.log(`CatalogItemTemplate settings: `, settings);
  // console.log(`CatalogItemTemplate detail: `, detail);
  // return null;

  return (
    <MainLayout {...settings} headerBackground="gray-light">
      <CatalogItemDetail id="item-detail" {...detail} />
    </MainLayout>
  )
}

export default CatalogItemTemplate;

export async function getStaticPaths() {
  const data = await getAllEntries({
    content_type: 'templateCatalogItem',
  });
  const paths = data.items.map(({ fields }) => ({
    params: { slug: fields.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  // console.log(`params: `, params);
  const data = await getPageFieldsAndSettings({
    content_type: 'templateCatalogItem',
    'fields.slug': params.slug,
    include: 4,
  });
  const detail = {
    cardsInfo: data?.cardsInfo.map((card) => formatCard(card)),
    detailImage: formatImage(data?.detailImage),
    detailText: data?.detailText,
    title: data?.title,
  };

  return {
    props: {
      settings: data?.settings,
      detail,
    },
    revalidate: 1,
  };
}
