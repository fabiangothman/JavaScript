import PropTypes from 'prop-types';
import {
  getPageFieldsAndSettings,
  getFieldsFromArray,
  getImageFields,
} from 'api/utils';
import MainLayout, { MainLayoutType } from '~layouts/MainLayout';
import TeamContent from '~baseComponents/TeamContent';

const IndexPage = ({ settings, ...props }) => {
  return (
    <MainLayout {...settings}>
      <TeamContent {...props} />
    </MainLayout>
  );
};

export default IndexPage;

IndexPage.propTypes = {
  settings: PropTypes.shape(MainLayoutType).isRequired,
};

export async function getStaticProps() {
  const data = await getPageFieldsAndSettings({
    content_type: 'pageTeam',
  });
  const teamMembers = getFieldsFromArray(data.teamMembers).map((member) => ({
    ...member,
    image: getImageFields(member.image),
  }));

  return {
    props: {
      ...data,
      teamMembers,
    },
  };
}
