import PropTypes from 'prop-types';
import {
  getPageFieldsAndSettings,
  getFieldsFromArray,
  getImageFields,
} from 'api/utils';
import { getAllEntries } from 'api/';
import _get from 'lodash/get';
import MainLayout, { MainLayoutType } from '~layouts/MainLayout';
import TeamContent from '~baseComponents/TeamMemberSummary';

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

export async function getStaticPaths() {
  const data = await getAllEntries({
    content_type: 'componentTeamMember',
  });

  const paths = data.items.map(({ fields }) => {
    return {
      params: { slug: fields.slug },
    };
  });

  return { paths, fallback: false };
}

export async function getStaticProps(req) {
  const data = await getPageFieldsAndSettings({
    content_type: 'pageTeam',
  });

  let member = await getAllEntries({
    content_type: 'componentTeamMember',
    'fields.slug': req.params.slug,
  });

  member = _get(member, 'items[0].fields', {});
  member.currentCompanyLinks = getFieldsFromArray(
    member?.currentCompanyLinks,
  ).map((page) => {
    const slug =
      page?.internalPage?.fields?.slug &&
      `/${page?.internalPage?.fields?.slug}`;
    return {
      ...page,
      slug: slug ?? page?.externalUrl ?? '',
    };
  });
  member.enduringBrandsLinks = getFieldsFromArray(
    member?.enduringBrandsLinks,
  ).map((page) => {
    const slug =
      page?.internalPage?.fields?.slug &&
      `/${page?.internalPage?.fields?.slug}`;
    return {
      ...page,
      slug: slug ?? page?.externalUrl ?? '',
    };
  });

  const teamMembers = getFieldsFromArray(data.teamMembers).map((members) => ({
    ...members,
    image: getImageFields(members.image),
  }));

  return {
    props: {
      ...data,
      ...member,
      image: getImageFields(member?.image),
      teamMembers,
    },
  };
}
