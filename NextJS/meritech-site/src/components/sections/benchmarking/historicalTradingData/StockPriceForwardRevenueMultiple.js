import { useState, useMemo, useEffect } from 'react';
import uniq from 'lodash/uniq';
import subMonths from 'date-fns/subMonths';
import { BenchmarkingChartType } from 'types';
import isAfter from 'date-fns/isAfter';
import useSWRImmutable from 'swr/immutable';

import LinesMultiplesY from '~charts/LinesMultiplesY';
import ChartWrapper from '~sections/ChartWrapper';

const StockPriceForwardRevenueMultiple = ({
  title,
  sharedChartFootnotes,
  slug,
  dataUpdatedAt,
  additionalFootnotes,
  mainFootnotes,
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

  const allCompanies = [
    ...(data?.ltmGrowth?.map(({ name }) => name) ?? []),
    ...(data?.multiplesPrices?.map(({ name }) => name) ?? []),
    ...(data?.stockPrices?.map(({ name }) => name) ?? []),
  ].sort((a, b) => {
    const nameA = a.toUpperCase();
    const nameB = b.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    return 0;
  });

  const uniqueCompanies = uniq(allCompanies);
  const defaultCompany =
    uniqueCompanies?.findIndex((company) => company === 'Datadog') > -1
      ? 'Datadog'
      : uniqueCompanies[0];
  const filteredByDate = useMemo(() => {
    const now = new Date();
    const plus = subMonths(now, filters?.period ?? 0);
    const companyToFilter = filters?.singleCompany ?? defaultCompany;

    const allData = [
      ...(data?.ltmGrowth
        .filter(({ date }) =>
          filters?.period ? isAfter(new Date(date), plus) : true,
        )
        .filter(({ name }) => {
          return name === companyToFilter;
        })
        .map((d) => {
          return {
            name: 'LTM Revenue Growth',
            date: new Date(d.date),
            percentageValue: d.value,
            original: d.originalValue,
          };
        }) ?? []),
      ...(data?.multiplesPrices
        .filter(({ date }) =>
          filters?.period ? isAfter(new Date(date), plus) : true,
        )
        .filter(({ name }) => {
          return name === companyToFilter;
        })
        .map((d) => {
          return {
            name: 'EV / NTM Revenue',
            date: new Date(d.date),
            value: d.value,
            original: d.originalValue,
          };
        }) ?? []),
      ...(data?.stockPrices
        .filter(({ date }) =>
          filters?.period ? isAfter(new Date(date), plus) : true,
        )
        .filter(({ name }) => {
          return name === companyToFilter;
        })
        .map((d) => {
          return {
            name: 'Stock Price',
            date: new Date(d.date),
            currencyValue: d.value,
            original: d.originalValue,
          };
        }) ?? []),
    ];

    return allData;
  }, [
    filters?.period,
    filters?.singleCompany,
    data?.ltmGrowth,
    data?.multiplesPrices,
    data?.stockPrices,
    defaultCompany,
  ]);
  useEffect(() => {
    setFilterDefinitions([
      {
        label: 'Period',
        type: 'buttonToggle',
        key: 'period',
        //   storageKey: 'period',
        options: [
          {
            value: 3,
            label: '3M',
          },
          {
            value: 6,
            label: '6M',
          },
          {
            value: 12,
            label: '1Y',
          },
          {
            value: 12 * 3,
            label: '3Y',
          },
          {
            value: 12 * 5,
            label: '5Y',
          },
        ],
        multiSelect: false,
        separator: true,
        defaultValue: null,
      },
      {
        label: 'Company',
        type: 'dropdown',
        key: 'singleCompany',
        //   storageKey: 'singleCompany',
        options: uniqueCompanies.map((item) => ({
          value: item,
          label: item || 'Empty',
        })),
        multiSelect: false,
        emptyLabel: 'None',
        separator: false,
        defaultValue: defaultCompany,
      },
    ]);
    // eslint-disable-next-line
  }, [data]);

  return (
    <ChartWrapper
      chartSlug={slug}
      filteredData={!!data}
      chartTitle={title}
      filters={filters}
      error={(!filteredByDate?.length && !!data) || error}
      setFilters={setFilters}
      filterDefinitions={filterDefinitions}
      mainFootnotes={mainFootnotes}
      additionalFootnotes={additionalFootnotes}
      chartNotes={sharedChartFootnotes}
      dataUpdateDate={dataUpdatedAt}
    >
      <LinesMultiplesY
        data={filteredByDate}
        marginRight={70}
        marginLeft={60}
        xFormat={filters.period < 12 ? 'longer' : 'shorter'}
      />
    </ChartWrapper>
  );
};

export default StockPriceForwardRevenueMultiple;

StockPriceForwardRevenueMultiple.defaultProps = {
  sharedChartFootnotes: null,
  mainFootnotes: null,
  additionalFootnotes: null,
};

StockPriceForwardRevenueMultiple.propTypes = BenchmarkingChartType;
