import React from 'react';
import MainLayout from 'layouts/MainLayout';
import { formatEvent, getPageFieldsAndSettings } from 'api/utils';
import PostsHero from 'components/heros/PostsHero';
import EventsList from 'components/sections/EventsList';

const EventsPage = ({ settings, events }) => {
  // console.log(`EventsPage events: `, events);
  // return null;

  return (
    <MainLayout {...settings} headerBackground="gray-light">
      {events.title && (
        <PostsHero id="hero" title={events.title} />
      )}
      {events.eventsList && (
        <EventsList
          id="events-list"
          eventsList={events.eventsList}
        />
      )}
    </MainLayout>
  )
}

export default EventsPage;

export async function getStaticProps() {
  const data = await getPageFieldsAndSettings({
    content_type: 'pageEvents',
    include: 4,
  });
  const events = {
    title: data?.title,
    eventsList: data?.eventsList.map(post => formatEvent(post?.fields)),
  };

  return {
    props: {
      settings: data?.settings,
      events,
    },
  };
}