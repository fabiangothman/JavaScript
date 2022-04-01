import PropTypes from 'prop-types';
import MainLayout, { MainLayoutType } from '~layouts/MainLayout';
import StockPriceForwardRevenueMultiple from '~sections/benchmarking/historicalTradingData/StockPriceForwardRevenueMultiple';
import { getChartPageData } from '~api/benchmarking';
import buildChartData from '~api/benchmarking-data/historical-trading-data/stock-price-and-forward-revenue-multiple';

const StockPriceAndForwardRevenueMultiple = ({ settings, ...props }) => {
  return (
    <MainLayout {...settings}>
      <StockPriceForwardRevenueMultiple {...props} />
    </MainLayout>
  );
};

export default StockPriceAndForwardRevenueMultiple;

StockPriceAndForwardRevenueMultiple.propTypes = {
  settings: PropTypes.shape(MainLayoutType).isRequired,
};

export async function getStaticProps() {
  return getChartPageData(
    '/historical-trading-data/stock-price-and-forward-revenue-multiple',
    buildChartData,
  );
}
