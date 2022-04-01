import PropTypes from 'prop-types';
import MainLayout, { MainLayoutType } from '~layouts/MainLayout';
import { getChartPageData } from '~api/benchmarking';
import ValuationMetricsBarChart from '~sections/benchmarking/valuationMetrics/ValuationMetricsBarChart';
import buildChartData from '~api/benchmarking-data/valuation-metrics/multiple-return-since-ipo';

const MultipleReturnSinceIpoPage = ({ settings, ...props }) => {
  return (
    <MainLayout {...settings}>
      <ValuationMetricsBarChart
        {...props}
        chartSettings={{ medianType: 'times' }}
      />
    </MainLayout>
  );
};

export default MultipleReturnSinceIpoPage;

MultipleReturnSinceIpoPage.propTypes = {
  settings: PropTypes.shape(MainLayoutType).isRequired,
};

export async function getStaticProps() {
  return getChartPageData(
    '/valuation-metrics/multiple-return-since-ipo',
    buildChartData,
  );
}
