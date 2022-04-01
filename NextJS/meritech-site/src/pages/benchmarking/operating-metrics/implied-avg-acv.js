import PropTypes from 'prop-types';
import MainLayout, { MainLayoutType } from '~layouts/MainLayout';
import { getChartPageData } from '~api/benchmarking';
import ValuationMetricsBarChart from '~sections/benchmarking/valuationMetrics/ValuationMetricsBarChart';
import buildChartData from '~api/benchmarking-data/operating-metrics/implied-avg-acv';

const ImpliedAvgAcv = ({ settings, ...props }) => {
  return (
    <MainLayout {...settings}>
      <ValuationMetricsBarChart
        {...props}
        chartSettings={{
          medianType: 'currencyWithDecimalOnLessThanOne',
          valueType: 'currencyWithDecimalOnLessThanOne',
          tooltipDataType: 'currencyWithDecimalOnLessThanOne',
        }}
      />
    </MainLayout>
  );
};

export default ImpliedAvgAcv;

ImpliedAvgAcv.propTypes = {
  settings: PropTypes.shape(MainLayoutType).isRequired,
};

export async function getStaticProps() {
  return getChartPageData('/operating-metrics/implied-avg-acv', buildChartData);
}
