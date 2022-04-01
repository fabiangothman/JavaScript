import { useState } from 'react';

import PropTypes from 'prop-types';
import ChartWrapper from '~sections/ChartWrapper';
import useChartData from '~hooks/useChartData';
import {
  defaultValuationMetricsFiltersDefinitions,
  defaultValuationMetricsFilterRow,
} from '~sections/benchmarking/valuationMetrics/utils';
import { RichTextTypes } from '~baseComponents/RichText';

const ValuationMetricsBarChart = ({
  slug,
  title,
  bottomFootnotes,
  mainFootnotes,
  additionalFootnotes,
  dataUpdatedAt,
}) => {
  const [filters, setFilters] = useState({});

  const { error, data, filteredData } = useChartData({
    slug,
    filters,
    filterRow: defaultValuationMetricsFilterRow,
  });

  const filterDefinitions = defaultValuationMetricsFiltersDefinitions(data);

  return (
    <ChartWrapper
      error={error}
      chartSlug={slug}
      filteredData={filteredData}
      chartTitle={title}
      filters={filters}
      setFilters={setFilters}
      filterDefinitions={filterDefinitions}
      mainFootnotes={mainFootnotes}
      additionalFootnotes={additionalFootnotes}
      chartNotes={bottomFootnotes}
      dataUpdateDate={dataUpdatedAt}
    />
  );
};

ValuationMetricsBarChart.defaultProps = {
  mainFootnotes: null,
  additionalFootnotes: null,
  bottomFootnotes: null,
};

ValuationMetricsBarChart.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  bottomFootnotes: RichTextTypes,
  mainFootnotes: RichTextTypes,
  additionalFootnotes: RichTextTypes,
  dataUpdatedAt: PropTypes.string.isRequired,
};

export default ValuationMetricsBarChart;
