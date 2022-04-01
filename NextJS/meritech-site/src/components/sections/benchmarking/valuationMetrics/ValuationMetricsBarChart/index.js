import { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import Bars from '~charts/Bars';
import Table from '~charts/Table';
import ChartWrapper from '~sections/ChartWrapper';
import useChartData from '~hooks/useChartData';
import {
  defaultValuationMetricsFiltersDefinitions,
  defaultValuationMetricsFilterRow,
} from '~sections/benchmarking/valuationMetrics/utils';
import { RichTextTypes } from '~baseComponents/RichText';
import TwoBars from '~charts/TwoBars';

const ValuationMetricsBarChart = ({
  slug,
  title,
  bottomFootnotes,
  mainFootnotes,
  additionalFootnotes,
  dataUpdatedAt,
  chartType,
  chartSettings,
  persistentFilters,
}) => {
  const [filters, setFilters] = useState({});
  const [filterDefinitions, setFilterDefinitions] = useState([]);
  const { error, data, filteredData } = useChartData({
    slug,
    filters,
    filterRow: defaultValuationMetricsFilterRow,
  });

  const updateFilterDefinitions = () => {
    const definitions = defaultValuationMetricsFiltersDefinitions(data);
    if (!persistentFilters) {
      // eslint-disable-next-line
      definitions.map((entry) => delete entry.storageKey);
    }
    setFilterDefinitions(definitions);
  };
  useEffect(() => {
    updateFilterDefinitions();
    // eslint-disable-next-line
  }, [data, persistentFilters]);

  return (
    <ChartWrapper
      error={(!filteredData?.length && !!data) || error}
      chartSlug={slug}
      filteredData={!!filteredData?.length}
      chartTitle={title}
      filters={filters}
      setFilters={setFilters}
      filterDefinitions={filterDefinitions}
      mainFootnotes={mainFootnotes}
      additionalFootnotes={additionalFootnotes}
      chartNotes={bottomFootnotes}
      dataUpdateDate={dataUpdatedAt}
    >
      {chartType === 'table' && (
        <Table data={filteredData} {...chartSettings} />
      )}
      {chartType === 'two-bars' && (
        <TwoBars data={filteredData} {...chartSettings} />
      )}
      {chartType === 'bar' && <Bars data={filteredData} {...chartSettings} />}
    </ChartWrapper>
  );
};

ValuationMetricsBarChart.defaultProps = {
  mainFootnotes: null,
  additionalFootnotes: null,
  bottomFootnotes: null,
  chartType: 'bar',
  chartSettings: {
    marginRight: 70,
    marginLeft: 60,
    medianType: null,
    valueType: null,
    tooltipDataType: null,
  },
  persistentFilters: true,
};

ValuationMetricsBarChart.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  chartSettings: PropTypes.shape({}),
  bottomFootnotes: RichTextTypes,
  mainFootnotes: RichTextTypes,
  additionalFootnotes: RichTextTypes,
  dataUpdatedAt: PropTypes.string.isRequired,
  persistentFilters: PropTypes.bool,
  chartType: PropTypes.oneOf(['bar', 'table', 'two-bars']),
};

export default ValuationMetricsBarChart;
