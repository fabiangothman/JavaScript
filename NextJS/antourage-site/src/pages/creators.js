import PropTypes from 'prop-types';
import {
  getPageFieldsAndSettings,
  formatCarousel,
  formatDataCarousel,
  formatHeroForm,
  formatCaseStudy,
  formatSteps,
  formatVideoForm,
} from 'api/utils';
import MainLayout, { MainLayoutType } from '~layouts/MainLayout';
import { CarouselType } from '~baseComponents/Sections/CarouselSection/CarouselSection';
import BioSection from '~baseComponents/Sections/BioSection/BioSection';
import DataSection, {
  DataSectionType,
} from '~baseComponents/Sections/DataSection';
import HeroSection, {
  HeroSectionType,
} from '~baseComponents/Sections/HeroSection/HeroSection';
import StepsSection, {
  StepsSectionType,
} from '~baseComponents/Sections/StepsSection/StepsSection';
import CaseStudySection, {
  CaseStudyType,
} from '~baseComponents/Sections/CaseStudySection/CaseStudySection';
import VideoFormSection, {
  VideoFormSectionType,
} from '~baseComponents/Sections/VideoFormSection/VideoFormSection';

const CreatorsPage = ({
  settings,
  hero,
  carousel,
  dataCarousel,
  steps,
  caseStudy,
  videoForm,
  cameraTagAppId,
  ...props
}) => {
  // console.log(`CreatorsPage props: `, props);
  // console.log(`CreatorsPage settings: `, settings);
  // return null;
  return (
    <MainLayout headerType="fixed" headerColor="transparent" {...settings}>
      <div {...props}>
        <HeroSection baseColors="PurpleWhite_hover" {...hero} />
        <BioSection carousel={carousel} />
        <DataSection {...dataCarousel} />
        <StepsSection steps={steps} />
        {caseStudy && (
          <CaseStudySection baseColors="PurpleWhite_hover" {...caseStudy} />
        )}
        <VideoFormSection
          appId={cameraTagAppId}
          blobsColor="purple"
          baseColors="PurpleWhite_hover"
          formId="creatorsContactForm"
          {...videoForm}
        />
      </div>
    </MainLayout>
  );
};

export default CreatorsPage;

CreatorsPage.defaultProps = {
  caseStudy: null,
};

CreatorsPage.propTypes = {
  settings: PropTypes.shape(MainLayoutType).isRequired,
  hero: HeroSectionType.isRequired,
  carousel: CarouselType.isRequired,
  dataCarousel: DataSectionType.isRequired,
  steps: PropTypes.arrayOf(StepsSectionType).isRequired,
  caseStudy: CaseStudyType,
  videoForm: VideoFormSectionType.isRequired,
  cameraTagAppId: PropTypes.string.isRequired,
};

export async function getStaticProps() {
  const data = await getPageFieldsAndSettings({
    content_type: 'pageCreators',
    include: 4,
  });
  const hero = formatHeroForm(data.hero);
  const carousel = formatCarousel(data.carousel);
  const dataCarousel = formatDataCarousel(data.dataCarousel);
  const steps = formatSteps(data.steps);
  const caseStudy = data.caseStudy?.fields
    ? formatCaseStudy(data.caseStudy)
    : null;
  const videoForm = formatVideoForm(data.videoForm);

  return {
    props: {
      settings: data.settings,
      hero,
      carousel,
      dataCarousel,
      steps,
      caseStudy,
      videoForm,
      cameraTagAppId: process.env.CAMERATAG_APP_ID,
    },
  };
}
