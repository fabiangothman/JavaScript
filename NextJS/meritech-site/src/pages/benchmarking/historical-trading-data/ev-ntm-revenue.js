import PropTypes from 'prop-types';
import MainLayout, { MainLayoutType } from '~layouts/MainLayout';
import EvNtmRevenue from '~sections/benchmarking/historicalTradingData/EvNtmRevenue';
import { getChartPageData } from '~api/benchmarking';
import buildChartData from '~api/benchmarking-data/historical-trading-data/ev-ntm-revenue';

const EvNtmRevenuePage = ({ settings, ...props }) => {
  return (
    <MainLayout {...settings}>
      <EvNtmRevenue {...props} />
    </MainLayout>
  );
};

export default EvNtmRevenuePage;

EvNtmRevenuePage.propTypes = {
  settings: PropTypes.shape(MainLayoutType).isRequired,
};

export async function getStaticProps() {
  return getChartPageData(
    '/historical-trading-data/ev-ntm-revenue',
    buildChartData,
  );
}
