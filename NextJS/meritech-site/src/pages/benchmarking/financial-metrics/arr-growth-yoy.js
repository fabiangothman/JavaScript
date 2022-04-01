import PropTypes from 'prop-types';
import MainLayout, { MainLayoutType } from '~layouts/MainLayout';
import { getChartPageData } from '~api/benchmarking';
import ValuationMetricsBarChart from '~sections/benchmarking/valuationMetrics/ValuationMetricsBarChart';
import buildChartData from '~api/benchmarking-data/financial-metrics/arr-growth-yoy';

const ArrGrowthYoY = ({ settings, ...props }) => {
  return (
    <MainLayout {...settings}>
      <ValuationMetricsBarChart
        {...props}
        chartSettings={{ medianType: 'percentageInteger' }}
      />
    </MainLayout>
  );
};

export default ArrGrowthYoY;

ArrGrowthYoY.propTypes = {
  settings: PropTypes.shape(MainLayoutType).isRequired,
};

export async function getStaticProps() {
  return getChartPageData('/financial-metrics/arr-growth-yoy', buildChartData);
}
