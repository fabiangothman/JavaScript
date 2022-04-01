import { useState, useMemo, useEffect } from 'react';
import uniq from 'lodash/uniq';
import map from 'lodash/map';
import useSWRImmutable from 'swr/immutable';
import PropTypes from 'prop-types';
import Bars from '~charts/Dots';
import ChartWrapper from '~sections/ChartWrapper';
import { RichTextTypes } from '~baseComponents/RichText';
import { convertStringIntoNumber, formatDataValue } from '~charts/utils';

const RegressionAnalysisDotChart = ({
  slug,
  title,
  bottomFootnotes,
  mainFootnotes,
  additionalFootnotes,
  dataUpdatedAt,
}) => {
  const [filters, setFilters] = useState({});
  const [filterDefinitions, setFilterDefinitions] = useState([]);
  const { data, error } = useSWRImmutable(
    `/data/benchmarking${slug}.json`,
    async (url) => {
      const response = await fetch(url);

      if (!response.ok) {
        throw Error(response.statusText);
      }

      return response.json();
    },
  );

  const ranges = uniq(data?.map(({ range }) => range)).filter(Boolean);
  const sectors = uniq(data?.map(({ sector }) => sector)).filter(Boolean);
  // eslint-disable-next-line
  uniq(map(data, 'freemium'))?.length && sectors.push('Freemium / Bottoms-Up');

  const yAxisDefinition = [
    { name: 'EV / NTM Revenue', format: 'timesWithConditionalDecimal' },
    { name: 'EV / ARR', format: 'timesWithConditionalDecimal' },
    {
      name: 'Growth Adjusted EV / NTM Revenue',
      format: 'timesWithConditionalDecimal',
    },
    { name: 'EV / NTM Gross Profit', format: 'timesWithConditionalDecimal' },
    // { name: '% YoY Implied ARR Growth', format: 'percentageInteger' },
    // { name: '% YoY NTM Revenue Growth', format: 'percentageInteger' },
    // { name: 'EV / Last Quarter Implied ARR', format: 'times' },
    // { name: 'Rule of 40', format: 'percentageInteger' },
    // { name: 'Growth Adjusted Revenue Multiple', format: 'number' },
  ];

  const xAxisDefinition = [
    { name: '% YoY NTM Revenue Growth', format: 'percentageInteger' },
    { name: '% YoY LTM Revenue Growth', format: 'percentageInteger' },
    { name: '% YoY Implied ARR Growth', format: 'percentageInteger' },
    { name: 'Rule of 40', format: 'percentageInteger' },
    { name: '% LTM Gross Margin', format: 'percentageInteger' },
    { name: 'Magic Number', format: 'float' },
    { name: 'Payback Period', format: 'number' },
    {
      name: 'Net Dollar Retention / Dollar-Based Net Expansion Rate',
      format: 'percentageInteger',
    },
    { name: 'Implied ARR / FTE', format: 'price' },
    { name: 'Annualized OpEx / FTE', format: 'price' },
  ];

  const keys = Object.keys(data?.[0] ?? {});
  const xAxis = [];
  const yAxis = [];
  xAxisDefinition.forEach((d) => {
    if (keys.includes(d.name)) {
      xAxis.push(d);
    }
  });
  yAxisDefinition.forEach((d) => {
    if (keys.includes(d.name)) {
      yAxis.push(d);
    }
  });
  useEffect(() => {
    setFilterDefinitions([
      {
        label: 'YOY LTM Revenue Growth',
        type: 'buttonToggle',
        key: 'revenueGrowth',
        storageKey: 'revenueGrowth',
        options: ranges.map((range) => {
          return {
            label: range,
            value: range,
          };
        }),
        multiSelect: true,
        separator: false,
        defaultValue: [],
      },
      {
        label: 'Sector',
        type: 'buttonToggle',
        key: 'sector',
        storageKey: 'sector',
        options: sectors.map((range) => {
          return {
            label: range,
            value: range,
          };
        }),
        multiSelect: true,
        separator: true,
        defaultValue: [],
      },
      {
        label: null,
        type: 'axisSelector',
        key: 'axis',
        reducedHeight: true,
        storageKey: 'axis',
        sortOptions: false,
        xOptions: xAxis.map((item) => ({
          value: item.name,
          label: item.name,
        })),
        yOptions: yAxis.map((item) => ({
          value: item.name,
          label: item.name,
        })),
        defaultValue: {
          x: '% YoY NTM Revenue Growth',
          y: 'EV / NTM Revenue',
        },
        separator: true,
      },
    ]);
    // eslint-disable-next-line
  }, [data]);

  const filtered = useMemo(() => {
    if (!data) {
      return [];
    }

    const { x, y } = filters?.axis ?? {};

    return data
      .map((d) => {
        return {
          ...d,
          name: d.name,
          xFormatedValue: formatDataValue(d[x]),
          yFormatedValue: formatDataValue(d[y]),
          xValue: convertStringIntoNumber(d[x]),
          yValue: convertStringIntoNumber(d[y]),
        };
      })
      .filter((item) => {
        return filters?.sector?.length
          ? filters.sector.indexOf(item.sector) > -1 ||
              filters.sector.indexOf(item.freemium) > -1
          : true;
      })
      .filter((item) => {
        return filters?.revenueGrowth?.length
          ? filters.revenueGrowth.includes(item.range)
          : true;
      });
  }, [data, filters]);

  //   if (filters.sector?.length) {
  //     include =
  //       include &&
  //       (filters.sector.indexOf(row.sector) > -1 ||
  //         filters.sector.indexOf(row.freemium) > -1);
  //   }

  const getAxisFormat = (arr, name) => {
    return arr.filter((elm) => elm.name === name)[0]?.format;
  };

  return (
    <ChartWrapper
      error={(!filtered?.length && !!data) || error}
      chartSlug={slug}
      filteredData={!!filtered?.length}
      chartTitle={title}
      filters={filters}
      setFilters={setFilters}
      filterDefinitions={filterDefinitions}
      mainFootnotes={mainFootnotes}
      additionalFootnotes={additionalFootnotes}
      chartNotes={bottomFootnotes}
      dataUpdateDate={dataUpdatedAt}
    >
      {/* {JSON.stringify(filterDefinitions)} */}
      <Bars
        yLabel={filters?.axis?.y ?? ''}
        xLabel={filters?.axis?.x ?? ''}
        xFormat={
          filters?.axis?.x && getAxisFormat(xAxisDefinition, filters?.axis?.x)
        }
        yFormat={
          filters?.axis?.y && getAxisFormat(yAxisDefinition, filters?.axis?.y)
        }
        data={filtered}
        marginRight={70}
        marginLeft={60}
      />
    </ChartWrapper>
  );
};

RegressionAnalysisDotChart.defaultProps = {
  mainFootnotes: null,
  additionalFootnotes: null,
  bottomFootnotes: null,
};

RegressionAnalysisDotChart.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  bottomFootnotes: RichTextTypes,
  mainFootnotes: RichTextTypes,
  additionalFootnotes: RichTextTypes,
  dataUpdatedAt: PropTypes.string.isRequired,
};

export default RegressionAnalysisDotChart;
