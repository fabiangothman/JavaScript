import { getSettings } from 'api/utils';
import _get from 'lodash/get';
import { getAllEntries, getSingleEntry } from '~api';

import MainLayout from '~layouts/MainLayout';
import Home from '~sections/Home';

const IndexPage = (props) => {
  return (
    <MainLayout {...props}>
      <Home {...props} />
    </MainLayout>
  );
};

export default IndexPage;

export async function getStaticProps() {
  const data = await getAllEntries({
    content_type: 'pageBoilerplate',
  });

  const { defaultSEO, menu, GoogleAnalyticsID } = await getSettings();

  const path = 'items[0].fields';
  const depsRef = _get(data, `${path}.dependencies.fields.dependencies`);
  const structure = _get(data, `${path}.structure.fields.structure`);
  const thumbnail = _get(data, `${path}.thumbnail.fields`);

  const dependencies = await Promise.all(
    depsRef.map(({ sys }) => getSingleEntry(sys.id)),
  );

  return {
    props: {
      defaultSEO,
      GoogleAnalyticsID,
      menu,
      dependencies,
      structure,
      thumbnail,
    },
  };
}
