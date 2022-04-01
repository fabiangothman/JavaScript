import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
// import Lines from 'components/charts/Lines';
// import Dots from 'components/charts/Dots';
import {
  getPageFieldsAndSettings,
  getFieldsFromArray,
  parseCSV2JSON,
} from 'api/utils';
import MainLayout, { MainLayoutType } from '~layouts/MainLayout';

const BenchmarkingLandingPage = dynamic(
  () => import('~baseComponents/BenchmarkingLandingPage'),
  { ssr: false },
);

const Benchmarking = ({ settings, ...props }) => {
  // console.log(props);
  // return null;
  return (
    <MainLayout {...settings}>
      <BenchmarkingLandingPage {...props} />
    </MainLayout>
  );
};

export default Benchmarking;

Benchmarking.propTypes = {
  settings: PropTypes.shape(MainLayoutType).isRequired,
};

export async function getStaticProps() {
  const page = await getPageFieldsAndSettings({
    content_type: 'pageBenchmarking',
    include: 3,
  });

  const charts = getFieldsFromArray(page.charts).map((chart) => ({
    ...chart,
    url: `https:${chart.file.url}`,
  }));

  const parsedCharts = await Promise.all(
    charts.map(({ url }) => parseCSV2JSON(url)),
  );

  return {
    props: {
      ...page,
      charts,
      parsedCharts,
    },
  };
}
