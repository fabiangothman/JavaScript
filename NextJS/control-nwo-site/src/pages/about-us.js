import React from 'react';
import MainLayout from 'layouts/MainLayout';
import MissionStatement from 'components/sections/MissionStatement';
import ProfilesList from 'components/sections/ProfilesList';
import leadership from 'data/leadership';
import advisory from 'data/advisory';
import Careers from 'components/sections/Careers';
import OpenPositions from 'components/sections/OpenPositions';
import { getDefaultSettings, getFieldsFromArray } from 'api/utils';
import { getAllEntries } from 'api';

const AboutUs = ({
  positionPosts,
  settings,
}) => {
  // console.log(`AboutUs positionPosts: `, positionPosts);
  // console.log(`AboutUs settings: `, settings);
  // return null;

  return (
    <MainLayout {...settings} headerBackground="gray-lighter">
      <MissionStatement id="mission" />
      <ProfilesList
        id="leadership"
        title="Leadership"
        data={leadership}
      />
      <ProfilesList
        id="advisory-board"
        title="Advisory Board"
        data={advisory}
      />
      <Careers id="careers" />
      <OpenPositions
        id="open-positions"
        data={positionPosts}
      />
    </MainLayout>
  )
}

export default AboutUs;

export async function getStaticProps() {
  const data = await getAllEntries({
    content_type: 'templateOpenPosition',
    include: 4,
  });
  const settings = await getDefaultSettings();
  const positionPosts = getFieldsFromArray(data.items).map((post) => {
    return {
      ...post,
      date: Date.parse(post?.date)
    };
  });

  return {
    props: {
      settings,
      positionPosts,
    },
  };
}
