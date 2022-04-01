import { useState, useMemo, useEffect } from 'react';
import subMonths from 'date-fns/subMonths';
import { BenchmarkingChartType } from 'types';
import isAfter from 'date-fns/isAfter';
import useSWRImmutable from 'swr/immutable';
import Area from '~charts/Area';
import ChartWrapper from '~sections/ChartWrapper';
import { replaceTagWithCompanies } from '~charts/utils';

const cumulativeOptions = [
  { label: 'Total', value: 'All' },
  {
    label: '<30%',
    value: 'Cumulative NTM Revenue (LTM Growth Less Than 30%)',
  },
  {
    label: '30%-50%',
    value: 'Cumulative NTM Revenue (LTM Growth Between 30% and 50%)',
  },
  {
    label: '>50%',
    value: 'Cumulative NTM Revenue (LTM Growth Greater Than 50%)',
  },
];

const CumulativeRevenue = ({
  slug,
  title,
  additionalFootnotes,
  mainFootnotes,
  bottomFootnotes,
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

  const justCompanies = useMemo(() => {
    return data?.justCompanies.filter((company) => company != null);
  }, [data?.justCompanies]);

  const filteredByDate = useMemo(() => {
    const allData = (data?.default ?? [])
      .map((e) => ({
        ...e,
        date: new Date(e.date),
      }))
      .filter((n) => {
        if (
          filters?.revenueGrowth.includes('All') &&
          n.name === 'Cumulative NTM Revenue'
        ) {
          return true;
        }
        return filters?.revenueGrowth?.some((a) => n.name === a);
      });

    const now = new Date();

    const plus = subMonths(now, filters?.period ?? 0);
    if (!filters?.period) {
      return allData;
    }

    return allData.filter(({ date }) => {
      return isAfter(new Date(date), plus);
    });
  }, [data?.default, filters]);

  useEffect(() => {
    setFilterDefinitions([
      {
        label: 'YOY LTM Revenue Growth',
        type: 'buttonToggle',
        key: 'revenueGrowth',
        //   storageKey: 'revenueGrowth',
        options: cumulativeOptions,
        multiSelect: true,
        separator: false,
        defaultValue: ['All'],
        autoAll: false,
        allLabel: '',
        fallbackValue: ['All'],
      },
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
    ]);
  }, [data]);

  return (
    <ChartWrapper
      error={(!filteredByDate?.length && !!data) || error}
      chartSlug={slug}
      filteredData={!!filteredByDate?.length}
      chartTitle={title}
      filters={filters}
      setFilters={setFilters}
      filterDefinitions={filterDefinitions}
      mainFootnotes={mainFootnotes}
      additionalFootnotes={additionalFootnotes}
      chartNotes={replaceTagWithCompanies(justCompanies, bottomFootnotes)}
      dataUpdateDate={dataUpdatedAt}
    >
      <Area
        data={filteredByDate}
        marginLeft={90}
        xFormat={filters.period < 12 ? 'longer' : 'shorter'}
        cumulativeLabels={cumulativeOptions.map((d) => d.value)}
      />
    </ChartWrapper>
  );
};

export default CumulativeRevenue;

CumulativeRevenue.propTypes = BenchmarkingChartType;
