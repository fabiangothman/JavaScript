import React from 'react';
import PropTypes from 'prop-types';
import {
  getPageFieldsAndSettings,
  formatCaseStudiesHero,
  formatFiftyFifty,
  formatObjectives,
  formatStats,
  formatTestimonials,
  formatImageWithTextAndTabs,
} from 'api/utils';
import { getAllEntries } from 'api';
import MainLayout, { MainLayoutType } from '~layouts/MainLayout';

import FiftyFifty, {
  FiftyFiftyPropTypes,
} from '~baseComponents/Sections/FiftyFifty';
import TheObjectives, {
  ObjectivesPropTypes,
} from '~baseComponents/Sections/Objectives';
import ImageWithTextAndTabs, {
  ImageWithTextAndTabsPropTypes,
} from '~baseComponents/Sections/ImageWithTextAndTabs';
import Stats, { StatsPropTypes } from '~baseComponents/Sections/Stats';
import Testimonials, {
  TestimonialsPropTypes,
} from '~baseComponents/Sections/Testimonials';
import HeroBlock, { HeroPropTypes } from '~baseComponents/Sections/HeroBlock';

const CaseStudyPage = ({
  settings,
  hero,
  fiftyFifty,
  objectives,
  stats,
  testimonials,
  solution,
  path,
}) => {
  // console.log(`CaseStudyPage props: `, props);
  // console.log(`CaseStudyPage hero: `, hero);
  // return null;
  return (
    <MainLayout headerType="fixed" headerColor="transparent" {...settings}>
      <div style={{ overflow: 'hidden' }} path={path}>
        <HeroBlock {...hero} />
        <FiftyFifty {...fiftyFifty} />
        <TheObjectives {...objectives} />
        <ImageWithTextAndTabs {...solution} />
        <Stats {...stats} />
        <Testimonials {...testimonials} />
      </div>
    </MainLayout>
  );
};

export default CaseStudyPage;

CaseStudyPage.defaultProps = {
  settings: null,
  hero: null,
  fiftyFifty: null,
  objectives: null,
  stats: null,
  testimonials: null,
  solution: null,
  path: 'case-study',
};

CaseStudyPage.propTypes = {
  settings: PropTypes.shape(MainLayoutType),
  hero: PropTypes.shape(HeroPropTypes),
  fiftyFifty: PropTypes.shape(FiftyFiftyPropTypes),
  objectives: PropTypes.shape(ObjectivesPropTypes),
  stats: StatsPropTypes,
  testimonials: PropTypes.shape(TestimonialsPropTypes),
  solution: PropTypes.shape(ImageWithTextAndTabsPropTypes),
  path: PropTypes.string,
};

export async function getStaticPaths() {
  const data = await getAllEntries({
    content_type: 'pageCaseStudies',
  });
  const paths = data.items.map(({ fields }) => ({
    params: { slug: fields.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  // console.log(`params: `, params);
  const data = await getPageFieldsAndSettings({
    content_type: 'pageCaseStudies',
    'fields.slug': params.slug,
    include: 4,
  });
  const hero = formatCaseStudiesHero(data.hero);
  const fiftyFifty = formatFiftyFifty(data.fiftyFifty);
  const objectives = formatObjectives(data.objectives);
  const stats = formatStats(data.theResults);
  const testimonials = formatTestimonials(data.testimonials);
  const solution = formatImageWithTextAndTabs(data.imageWithTextAndTags);
  const { path } = data;

  return {
    props: {
      settings: data.settings,
      hero,
      fiftyFifty,
      objectives,
      stats,
      testimonials,
      solution,
      path,
    },
    revalidate: 1,
  };
}
