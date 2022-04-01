import PropTypes from 'prop-types';
import MainLayout, { MainLayoutType } from '~layouts/MainLayout';
import { getChartPageData } from '~api/benchmarking';
import ValuationMetricsBarChart from '~sections/benchmarking/valuationMetrics/ValuationMetricsBarChart';
import buildChartData from '~api/benchmarking-data/operating-metrics/arr-fte';

const ArrFte = ({ settings, ...props }) => {
  return (
    <MainLayout {...settings}>
      <ValuationMetricsBarChart
        {...props}
        chartSettings={{ medianType: 'currency' }}
      />
    </MainLayout>
  );
};

export default ArrFte;

ArrFte.propTypes = {
  settings: PropTypes.shape(MainLayoutType).isRequired,
};

export async function getStaticProps() {
  return getChartPageData('/operating-metrics/arr-fte', buildChartData);
}
