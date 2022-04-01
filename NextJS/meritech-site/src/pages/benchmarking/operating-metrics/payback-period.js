import PropTypes from 'prop-types';
import MainLayout, { MainLayoutType } from '~layouts/MainLayout';
import { getChartPageData } from '~api/benchmarking';
import ValuationMetricsBarChart from '~sections/benchmarking/valuationMetrics/ValuationMetricsBarChart';
import buildChartData from '~api/benchmarking-data/operating-metrics/payback-period';

const PaybackPeriod = ({ settings, ...props }) => {
  return (
    <MainLayout {...settings}>
      <ValuationMetricsBarChart
        {...props}
        chartSettings={{
          tooltipDataType: 'float',
          medianType: 'float',
          valueType: 'float',
          singleDecimal: true,
        }}
      />
    </MainLayout>
  );
};

export default PaybackPeriod;

PaybackPeriod.propTypes = {
  settings: PropTypes.shape(MainLayoutType).isRequired,
};

export async function getStaticProps() {
  return getChartPageData('/operating-metrics/payback-period', buildChartData);
}
