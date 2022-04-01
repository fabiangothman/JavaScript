import PropTypes from 'prop-types';
import MainLayout, { MainLayoutType } from '~layouts/MainLayout';
import CumulativeRevenue from '~sections/benchmarking/historicalTradingData/CumulativeRevenue';
import { getChartPageData } from '~api/benchmarking';
import buildChartData from '~api/benchmarking-data/historical-trading-data/cumulative-revenue';

const CumulativeRevenuePage = ({ settings, ...props }) => {
  return (
    <MainLayout {...settings}>
      <CumulativeRevenue {...props} />
    </MainLayout>
  );
};

export default CumulativeRevenuePage;

CumulativeRevenuePage.propTypes = {
  settings: PropTypes.shape(MainLayoutType).isRequired,
};

export async function getStaticProps() {
  return getChartPageData(
    '/historical-trading-data/cumulative-revenue',
    buildChartData,
  );
}
