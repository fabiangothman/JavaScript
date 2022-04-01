import PropTypes from 'prop-types';
import {
  getPageFieldsAndSettings,
  formatCaseStudy,
  formatContactForm,
  formatSteps,
  formatHeroForm,
  formatCarouselLoop,
  formatDataCarousel,
} from 'api/utils';
import MainLayout, { MainLayoutType } from '~layouts/MainLayout';
import HeroSection, {
  HeroSectionType,
} from '~baseComponents/Sections/HeroSection/HeroSection';
import CarouselLoopSection, {
  CarouselLoopType,
} from '~baseComponents/Sections/CarouselLoopSection/CarouselLoopSection';
import DataSection, {
  DataSectionType,
} from '~baseComponents/Sections/DataSection';
import StepsSection, {
  StepsSectionType,
} from '~baseComponents/Sections/StepsSection/StepsSection';
import CaseStudySection, {
  CaseStudyType,
} from '~baseComponents/Sections/CaseStudySection/CaseStudySection';
import ContactFormSection, {
  ContactFormType,
} from '~baseComponents/Sections/ContactForm/ContactFormSection';

const TeamsPage = ({
  settings,
  hero,
  carouselLoop,
  dataCarousel,
  steps,
  caseStudy,
  contactForm,
  ...props
}) => {
  // console.log(`TeamsPage props: `, props);
  // console.log(`TeamsPage settings: `, settings);
  // return null;
  return (
    <MainLayout headerType="fixed" headerColor="transparent" {...settings}>
      <div {...props}>
        <HeroSection baseColors="BlueWhite_hover" {...hero} />
        <CarouselLoopSection {...carouselLoop} />
        <DataSection {...dataCarousel} />
        <StepsSection steps={steps} />
        {caseStudy && (
          <CaseStudySection baseColors="BlueWhite_hover" {...caseStudy} />
        )}
        <ContactFormSection
          blobsColor="blue"
          baseColors="BlueWhite_hover"
          formId="teamsContactForm"
          {...contactForm}
        />
      </div>
    </MainLayout>
  );
};

export default TeamsPage;

TeamsPage.defaultProps = {
  caseStudy: null,
};

TeamsPage.propTypes = {
  settings: PropTypes.shape(MainLayoutType).isRequired,
  hero: HeroSectionType.isRequired,
  carouselLoop: CarouselLoopType.isRequired,
  dataCarousel: DataSectionType.isRequired,
  steps: PropTypes.arrayOf(StepsSectionType).isRequired,
  caseStudy: CaseStudyType,
  contactForm: ContactFormType.isRequired,
};

export async function getStaticProps() {
  const data = await getPageFieldsAndSettings({
    content_type: 'pageTeams',
    include: 4,
  });
  const hero = formatHeroForm(data.hero);
  const carouselLoop = formatCarouselLoop(data.carouselLoop);
  const dataCarousel = formatDataCarousel(data.dataCarousel);
  const steps = formatSteps(data.steps);
  const caseStudy = data.caseStudy?.fields
    ? formatCaseStudy(data.caseStudy)
    : null;
  const contactForm = formatContactForm(data.contactForm);

  return {
    props: {
      settings: data.settings,
      hero,
      carouselLoop,
      dataCarousel,
      steps,
      caseStudy,
      contactForm,
    },
  };
}
