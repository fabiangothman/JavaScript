import PropTypes from 'prop-types';
import MainLayout, { MainLayoutType } from '~layouts/MainLayout';
import { getChartPageData } from '~api/benchmarking';
import ValuationMetricsBarChart from '~sections/benchmarking/valuationMetrics/ValuationMetricsBarChart';
import buildChartData from '~api/benchmarking-data/financial-metrics/opex-of-revenue-ltm';

const OpexOfRevenueLtm = ({ settings, ...props }) => {
  return (
    <MainLayout {...settings}>
      <ValuationMetricsBarChart
        {...props}
        chartSettings={{ medianType: 'percentageInteger' }}
      />
    </MainLayout>
  );
};

export default OpexOfRevenueLtm;

OpexOfRevenueLtm.propTypes = {
  settings: PropTypes.shape(MainLayoutType).isRequired,
};

export async function getStaticProps() {
  return getChartPageData(
    '/financial-metrics/opex-of-revenue-ltm',
    buildChartData,
  );
}
