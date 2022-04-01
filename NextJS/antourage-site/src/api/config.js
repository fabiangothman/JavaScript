import * as contentful from 'contentful';

const client = contentful.createClient({
  space: process.env.SPACE,
  accessToken: process.env.TOKEN,
});

export default client;
