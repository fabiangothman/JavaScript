import PropTypes from 'prop-types';
import { getChartPageData } from '~api/benchmarking';
import MainLayout, { MainLayoutType } from '~layouts/MainLayout';
import RegressionAnalysisDotChat from '~sections/benchmarking/valuationMetrics/regression-analysis';
import buildChartData from '~api/benchmarking-data/valuation-metrics/regression-analysis';

const RegressionAnalysisPage = ({ settings, ...props }) => {
  // return null;
  return (
    <MainLayout {...settings}>
      <RegressionAnalysisDotChat {...props} />
    </MainLayout>
  );
};

export default RegressionAnalysisPage;

RegressionAnalysisPage.propTypes = {
  settings: PropTypes.shape(MainLayoutType).isRequired,
};

export async function getStaticProps() {
  return getChartPageData(
    '/valuation-metrics/regression-analysis',
    buildChartData,
  );
}
