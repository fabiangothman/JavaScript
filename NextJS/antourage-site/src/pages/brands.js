import PropTypes from 'prop-types';
import {
  formatCarouselLoop,
  formatCaseStudy,
  formatContactForm,
  formatDataCarousel,
  formatHeroForm,
  formatSteps,
  getPageFieldsAndSettings,
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

const BrandsPage = ({
  settings,
  hero,
  carouselLoop,
  dataCarousel,
  steps,
  caseStudy,
  contactForm,
  ...props
}) => {
  // console.log(`BrandsPage props: `, props);
  // console.log(`BrandsPage settings: `, settings);
  // return null;
  return (
    <MainLayout headerType="fixed" headerColor="transparent" {...settings}>
      <div {...props}>
        <HeroSection baseColors="RedWhite_hover" {...hero} />
        <CarouselLoopSection {...carouselLoop} />
        <DataSection {...dataCarousel} />
        <StepsSection steps={steps} />
        {caseStudy && (
          <CaseStudySection baseColors="RedWhite_hover" {...caseStudy} />
        )}
        <ContactFormSection
          blobsColor="red"
          baseColors="RedWhite_hover"
          formId="brandsContactForm"
          {...contactForm}
        />
      </div>
    </MainLayout>
  );
};

export default BrandsPage;

BrandsPage.defaultProps = {
  caseStudy: null,
};

BrandsPage.propTypes = {
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
    content_type: 'pageBrands',
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
