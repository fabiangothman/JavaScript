/* eslint-disable import/prefer-default-export */
import fs from 'fs';
import path from 'path';
import { getAllEntries } from './index';
import { getFieldsFromArray, getPageFieldsAndSettings } from './utils';

export const getChartPageData = async (chartSlug, buildChartDataHandler) => {
  const page = await getPageFieldsAndSettings({
    content_type: 'pageBenchmarking',
    include: 3,
  });

  const chartPage = await getAllEntries({
    content_type: 'pageBenchmarkingChart',
    'fields.slug': chartSlug,
    include: 3,
  });

  const chartPageFields = getFieldsFromArray(chartPage.items);

  if (buildChartDataHandler) {
    const chartData = await buildChartDataHandler();
    if (chartData !== null) {
      const filename = `./public/data/benchmarking/${chartSlug}.json`;
      const dirname = path.dirname(filename);

      if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname, { recursive: true });
      }
      fs.writeFileSync(filename, JSON.stringify(chartData));
    }
  }

  return {
    props: {
      ...page,
      ...chartPageFields[0],
    },
  };
};
