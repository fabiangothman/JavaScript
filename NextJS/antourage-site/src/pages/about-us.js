import PropTypes from 'prop-types';
import {
  getPageFieldsAndSettings,
  formatPeople,
  getFieldsFromObject,
  formatMissionVission,
  formatCareerModule,
} from 'api/utils';
import MainLayout, { MainLayoutType } from '~layouts/MainLayout';
import PeopleSection, {
  PeopleType,
} from '~baseComponents/Sections/PeopleSection/PeopleSection';
import CareerModule, {
  CareerModulePropTypes,
} from '~baseComponents/CareerModule';
import HeroMediaSection, {
  HeroMediaSectionType,
} from '~baseComponents/Sections/HeroMediaSection/HeroMediaSection';
import MissionVisionSection, {
  MissionVisionSectionType,
} from '~baseComponents/Sections/MissionVisionSection/MissionVisionSection';

const AboutPage = ({
  settings,
  hero,
  missionVision,
  people,
  careerModule,
  ...props
}) => {
  // console.log(`AboutPage props: `, props);
  // console.log(`AboutPage settings: `, settings);
  // return null;
  return (
    <MainLayout headerType="fixed" headerColor="transparent" {...settings}>
      <div {...props}>
        <HeroMediaSection {...hero} />
        <MissionVisionSection {...missionVision} />
        <PeopleSection {...people} useTwoShapes />
        <CareerModule {...careerModule} />
      </div>
    </MainLayout>
  );
};

export default AboutPage;

AboutPage.propTypes = {
  settings: PropTypes.shape(MainLayoutType).isRequired,
  hero: HeroMediaSectionType.isRequired,
  missionVision: MissionVisionSectionType.isRequired,
  people: PeopleType.isRequired,
  careerModule: PropTypes.shape(CareerModulePropTypes).isRequired,
};

export async function getStaticProps() {
  const data = await getPageFieldsAndSettings({
    content_type: 'pageAbout',
    include: 4,
  });
  const hero = getFieldsFromObject(data.hero);
  const missionVision = formatMissionVission(data.missionVision);
  const people = formatPeople(data.people);
  const careerModule = formatCareerModule(data.careerModule);

  return {
    props: {
      settings: data.settings,
      hero,
      missionVision,
      people,
      careerModule,
    },
  };
}
