import PropTypes from 'prop-types';
import MainLayout, { MainLayoutType } from '~layouts/MainLayout';
import CumulativeEquityValue from '~sections/benchmarking/historicalTradingData/CumulativeEquityValue';
import { getChartPageData } from '~api/benchmarking';
import buildChartData from '~api/benchmarking-data/historical-trading-data/cumulative-equity-value';

const CumulativeEquityValuePage = ({ settings, ...props }) => {
  return (
    <MainLayout {...settings}>
      <CumulativeEquityValue {...props} />
    </MainLayout>
  );
};

export default CumulativeEquityValuePage;

CumulativeEquityValuePage.propTypes = {
  settings: PropTypes.shape(MainLayoutType).isRequired,
};

export async function getStaticProps() {
  return getChartPageData(
    '/historical-trading-data/cumulative-equity-value',
    buildChartData,
  );
}
