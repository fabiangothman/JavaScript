import { useState, useMemo, useEffect } from 'react';
import map from 'lodash/map';
import uniq from 'lodash/uniq';
import subMonths from 'date-fns/subMonths';
import { BenchmarkingChartType } from 'types';
import isAfter from 'date-fns/isAfter';
import useSWRImmutable from 'swr/immutable';
import { replaceTagWithCompanies } from '~charts/utils';
import Lines from '~charts/Lines';
import ChartWrapper from '~sections/ChartWrapper';

const GrowthAdjustedEVNTMRevenue = ({
  title,
  bottomFootnotes,
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

  const global = useMemo(() => {
    return (
      data?.default.filter((entry) => {
        if (filters?.sector?.some((s) => entry.name === s)) {
          return true;
        }

        if (filters?.revenueGrowth?.some((s) => entry.name === s)) {
          return true;
        }

        if (
          (filters?.revenueGrowth?.includes('All') ||
            filters?.sector?.includes('All')) &&
          [
            'Equity Value Weighted Growth Adjusted Multiple',
            'Average Growth Adjusted Multiple',
            'Median Growth Adjusted Multiple',
          ].includes(entry.name)
        ) {
          return true;
        }

        return false;
      }) ?? []
    );
  }, [data?.default, filters?.sector, filters?.revenueGrowth]);

  const justCompanies = useMemo(() => {
    return data?.justCompanies.filter((company) => company != null);
  }, [data?.justCompanies]);

  const companiesFiltered = useMemo(() => {
    if (!data?.companies || !filters?.company?.length) {
      return [];
    }

    return data.companies.filter(({ name }) => {
      return filters.company.some((n) => name === n);
    });
  }, [data?.companies, filters?.company]);

  const filteredByDate = useMemo(() => {
    const now = new Date();
    const allData = [...(global ?? []), ...companiesFiltered];
    const plus = subMonths(now, filters?.period ?? 0);
    if (!filters?.period) {
      return allData;
    }

    return allData.filter(({ date }) => {
      return isAfter(new Date(date), plus);
    });
  }, [companiesFiltered, global, filters?.period]);

  useEffect(() => {
    const companies = uniq(map(data?.companies, 'name'));
    setFilterDefinitions([
      {
        label: 'YOY LTM Revenue Growth',
        type: 'buttonToggle',
        key: 'revenueGrowth',
        //   storageKey: 'revenueGrowth',
        options: [
          { label: 'All', value: 'All' },

          {
            label: '<30%',
            value:
              'Equity Value Weighted Growth Adjusted Multiple (LTM Growth Less Than 30%)',
          },
          {
            label: '30%-50%',
            value:
              'Equity Value Weighted Growth Adjusted Multiple (LTM Growth Between 30% and 50%)',
          },
          {
            label: '>50%',
            value:
              'Equity Value Weighted Growth Adjusted Multiple (LTM Growth Greater Than 50%)',
          },
        ],
        multiSelect: true,
        separator: false,
        autoAll: true,
        allLabel: '',
        fallbackValue: ['All'],
        defaultValue: ['All'],
      },
      {
        label: 'Sector',
        type: 'buttonToggle',
        key: 'sector',
        //   storageKey: 'sector',
        options: [
          { label: 'All', value: 'All' },
          {
            label: 'Application',
            value:
              'Equity Value Weighted Growth Adjusted Multiple (Application)',
          },
          {
            label: 'Infrastructure',
            value:
              'Equity Value Weighted Growth Adjusted Multiple (Infrastructure)',
          },
          {
            label: 'Freemium / Bottoms-Up',
            value:
              'Equity Value Weighted Growth Adjusted Multiple (Freemium / Bottoms-Up)',
          },
        ],
        multiSelect: true,
        separator: true,
        autoAll: true,
        allLabel: '',
        fallbackValue: ['All'],
        defaultValue: ['All'],
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
      {
        label: 'Company',
        type: 'dropdown',
        key: 'company',
        //   storageKey: 'company',
        options: companies.map((item) => ({
          value: item,
          label: item || 'Empty',
        })),
        multiSelect: true,
        emptyLabel: 'None',
        separator: false,
        defaultValue: [],
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
      <Lines
        data={filteredByDate}
        marginRight={70}
        marginLeft={60}
        xFormat={filters.period < 12 ? 'longer' : 'shorter'}
      />
    </ChartWrapper>
  );
};

export default GrowthAdjustedEVNTMRevenue;

GrowthAdjustedEVNTMRevenue.defaultProps = {
  bottomFootnotes: null,
  additionalFootnotes: null,
  mainFootnotes: null,
};

GrowthAdjustedEVNTMRevenue.propTypes = BenchmarkingChartType;
