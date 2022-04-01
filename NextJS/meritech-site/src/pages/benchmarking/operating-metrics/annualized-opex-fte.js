import PropTypes from 'prop-types';
import MainLayout, { MainLayoutType } from '~layouts/MainLayout';
import { getChartPageData } from '~api/benchmarking';
import ValuationMetricsBarChart from '~sections/benchmarking/valuationMetrics/ValuationMetricsBarChart';
import buildChartData from '~api/benchmarking-data/operating-metrics/annualized-opex-fte';

const AnnualizedOpexFte = ({ settings, ...props }) => {
  return (
    <MainLayout {...settings}>
      <ValuationMetricsBarChart
        {...props}
        chartSettings={{ medianType: 'currency' }}
      />
    </MainLayout>
  );
};

export default AnnualizedOpexFte;

AnnualizedOpexFte.propTypes = {
  settings: PropTypes.shape(MainLayoutType).isRequired,
};

export async function getStaticProps() {
  return getChartPageData(
    '/operating-metrics/annualized-opex-fte',
    buildChartData,
  );
}
