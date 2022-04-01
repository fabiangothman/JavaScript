import PropTypes from 'prop-types';
import MainLayout, { MainLayoutType } from '~layouts/MainLayout';
import { getChartPageData } from '~api/benchmarking';
import ValuationMetricsBarChart from '~sections/benchmarking/valuationMetrics/ValuationMetricsBarChart';
import buildChartData from '~api/benchmarking-data/valuation-metrics/growth-adjusted-ev-ntm-revenue';

const GrowthAdjustedEvNtmRevenuePage = ({ settings, ...props }) => {
  return (
    <MainLayout {...settings}>
      <ValuationMetricsBarChart
        {...props}
        chartSettings={{ medianType: 'times' }}
      />
    </MainLayout>
  );
};

export default GrowthAdjustedEvNtmRevenuePage;

GrowthAdjustedEvNtmRevenuePage.propTypes = {
  settings: PropTypes.shape(MainLayoutType).isRequired,
};

export async function getStaticProps() {
  return getChartPageData(
    '/valuation-metrics/growth-adjusted-ev-ntm-revenue',
    buildChartData,
  );
}
