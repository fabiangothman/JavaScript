import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  formatCaseStudy,
  formatEngageSection,
  formatHero2Form,
  formatQuoteTabs,
  getPageFieldsAndSettings,
  formatEcosystem,
  formatBigFans,
} from 'api/utils';
import MainLayout, { MainLayoutType } from '~layouts/MainLayout';
import HomepageSlideshowAnimation, {
  formatSlideShow,
} from '~baseComponents/HomepageSlideshowAnimation';
import QuoteSection, {
  QuoteSectionType,
} from '~baseComponents/Sections/QuoteSection/QuoteSection';
import CaseStudySection, {
  CaseStudyType,
} from '~baseComponents/Sections/CaseStudySection/CaseStudySection';
import EngageSection, {
  EngageSectionType,
} from '~baseComponents/Sections/EngageSection/EngageSection';
import HeroStainsSection, {
  HeroStainsSectionType,
} from '~baseComponents/Sections/HeroStainsSection/HeroStainsSection';
import Ecosystem from '~sections/Ecosystem';

const IndexPage = ({
  settings,
  hero,
  tabs,
  engage,
  caseStudy,
  ecosystem,
  bigFans,
  introAnimation,
  ...props
}) => {
  // console.log(`CreatorsPage props: `, props);
  // console.log(`CreatorsPage settings: `, settings);
  // return null;
  const [introPlayed, setIntroPlayed] = useState(false);

  useEffect(() => {
    const didIntroPlay = !!window.localStorage.getItem('ANTOURAGE_INTRO');
    setIntroPlayed(didIntroPlay);
    if (!didIntroPlay) {
      window.localStorage.setItem('ANTOURAGE_INTRO', 'true');
    }
  }, []);

  return (
    <MainLayout
      headerType="fixed"
      headerColor="transparent"
      introAnimation={!introPlayed}
      {...settings}
    >
      <div {...props}>
        {!introPlayed && (
          <HomepageSlideshowAnimation images={introAnimation} speed={500} />
        )}
        <HeroStainsSection {...hero} />
        <Ecosystem blocks={ecosystem} bigfans={bigFans} />
        <QuoteSection tabs={tabs} />
        {caseStudy && (
          <CaseStudySection baseColors="BlueWhite_hover" {...caseStudy} />
        )}
        <EngageSection {...engage} />
      </div>
    </MainLayout>
  );
};

export default IndexPage;

IndexPage.defaultProps = {
  caseStudy: null,
};

IndexPage.propTypes = {
  settings: PropTypes.shape(MainLayoutType).isRequired,
  hero: HeroStainsSectionType.isRequired,
  caseStudy: CaseStudyType,
  engage: EngageSectionType.isRequired,
  tabs: PropTypes.arrayOf(QuoteSectionType).isRequired,
  ecosystem: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  bigFans: PropTypes.shape({}).isRequired,
  introAnimation: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export async function getStaticProps() {
  const data = await getPageFieldsAndSettings({
    content_type: 'pageHomepage',
    include: 4,
  });
  const hero = formatHero2Form(data.hero);
  const caseStudy = data.caseStudy?.fields
    ? formatCaseStudy(data.caseStudy)
    : null;
  const engage = formatEngageSection(data.engage);
  const tabs = formatQuoteTabs(data.tabs);
  const ecosystem = formatEcosystem(data.ecosystem);
  const bigFans = formatBigFans(data.bigFans);
  const introAnimation = formatSlideShow(data.introAnimation);

  return {
    props: {
      settings: data.settings,
      hero,
      engage,
      caseStudy,
      tabs,
      ecosystem,
      bigFans,
      introAnimation,
    },
  };
}
