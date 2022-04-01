import PropTypes from 'prop-types';
import MainLayout, { MainLayoutType } from '~layouts/MainLayout';
import { getChartPageData } from '~api/benchmarking';
import ValuationMetricsBarChart from '~sections/benchmarking/valuationMetrics/ValuationMetricsBarChart';
import buildChartData from '~api/benchmarking-data/financial-metrics/fcf-margin-ltm';

const FcfMarginLtm = ({ settings, ...props }) => {
  return (
    <MainLayout {...settings}>
      <ValuationMetricsBarChart
        {...props}
        chartSettings={{
          medianType: 'percentageInteger',
          tooltipDataType: 'percentageInteger',
          valueType: 'percentageInteger',
        }}
      />
    </MainLayout>
  );
};

export default FcfMarginLtm;

FcfMarginLtm.propTypes = {
  settings: PropTypes.shape(MainLayoutType).isRequired,
};

export async function getStaticProps() {
  return getChartPageData('/financial-metrics/fcf-margin-ltm', buildChartData);
}
