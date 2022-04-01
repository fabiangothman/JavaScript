import PropTypes from 'prop-types';
import MainLayout, { MainLayoutType } from '~layouts/MainLayout';
import GrowthAdjustedEVNTMRevenue from '~sections/benchmarking/historicalTradingData/GrowthAdjustedEVNTMRevenue';
import { getChartPageData } from '~api/benchmarking';
import buildChartData from '~api/benchmarking-data/historical-trading-data/growth-adjusted-ev-ntm-revenue';

const GrowthAdjustedEVNTMRevenuePage = ({ settings, ...props }) => {
  return (
    <MainLayout {...settings}>
      <GrowthAdjustedEVNTMRevenue {...props} />
    </MainLayout>
  );
};

export default GrowthAdjustedEVNTMRevenuePage;

GrowthAdjustedEVNTMRevenuePage.propTypes = {
  settings: PropTypes.shape(MainLayoutType).isRequired,
};

export async function getStaticProps() {
  return getChartPageData(
    '/historical-trading-data/growth-adjusted-ev-ntm-revenue',
    buildChartData,
  );
}
