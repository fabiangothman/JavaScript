import React from 'react';
import MainLayout from 'layouts/MainLayout';
import { formatCard, formatImage, getPageFieldsAndSettings } from 'api/utils';
import CatalogHero from 'components/heros/CatalogHero';
import CatalogList from 'components/sections/CatalogList';
import { getAllEntries } from 'api';

const CatalogTemplate = ({ settings, catalog }) => {
  // console.log(`CatalogTemplate settings: `, settings);
  // console.log(`CatalogTemplate catalog: `, catalog);
  // return null;

  return (
    <MainLayout {...settings} headerBackground="gray-lighter">
      { catalog.title && catalog.text && (
        <CatalogHero id="hero" title={catalog.title} text={catalog.text} />
      )}
      { catalog.itemsList.length > 0 && (
        <CatalogList id="catalog-list" itemsList={catalog.itemsList} />
      )}
    </MainLayout>
  )
}

export default CatalogTemplate;

export async function getStaticPaths() {
  const data = await getAllEntries({
    content_type: 'templateCatalog',
  });
  const paths = data.items.map(({ fields }) => ({
    params: { slug: fields.slug },
  }));

  return { paths, fallback: false };
}
export async function getStaticProps({ params }) {
  const data = await getPageFieldsAndSettings({
    content_type: 'templateCatalog',
    'fields.slug': params.slug,
    include: 4,
  });
  const catalog = {
    itemsList: data?.itemsList.map(({ fields }) => ({
      ...fields,
      cardsInfo: fields?.cardsInfo.map(card => formatCard(card)),
      detailImage: formatImage(fields?.detailImage),
      detailText: fields?.detailText,
      featuredCardImage: formatImage(fields?.featuredCardImage),
      featuredCardText: fields?.featuredCardText,
      path: fields?.path,
      slug: fields?.slug,
      title: fields?.title,
    })),
    path: data?.path,
    slug: data?.slug,
    text: data?.text,
    title: data?.title,
  };

  return {
    props: {
      settings: data?.settings,
      catalog,
    },
    revalidate: 1,
  };
}