import uniq from 'lodash/uniq';
import map from 'lodash/map';

export const defaultValuationMetricsFiltersDefinitions = (data) => {
  const yoyLtmRevenueGrowthValues = uniq(map(data, 'yoyLtmRevenueGrowth'));
  const sectors = uniq(map(data, 'sector'));
  // eslint-disable-next-line
  uniq(map(data, 'freemium'))?.length && sectors.push('Freemium / Bottoms-Up');

  return [
    {
      label: 'YOY LTM Revenue Growth',
      type: 'buttonToggle',
      key: 'revenueGrowth',
      storageKey: 'revenueGrowth',
      options: yoyLtmRevenueGrowthValues.map((item) => ({
        value: item,
        label: item || 'Empty',
      })),
      multiSelect: true,
      separator: false,
      defaultValue: [],
    },
    {
      label: 'Sector',
      type: 'buttonToggle',
      key: 'sector',
      storageKey: 'sector',
      options: sectors.map((item) => ({
        value: item,
        label: item || 'Empty',
      })),
      multiSelect: true,
      separator: true,
      defaultValue: [],
    },
    // {
    //   label: 'Sector 2',
    //   type: 'buttonToggle',
    //   key: 'freemium',
    //   storageKey: 'freemium',
    //   options: ['Freemium / Bottoms-Up'].map((item) => ({
    //     value: item,
    //     label: item || 'Empty',
    //   })),
    //   multiSelect: true,
    //   separator: true,
    //   defaultValue: [],
    // },
  ];
};

export const defaultValuationMetricsFilterRow = (row, filters) => {
  let include = true;
  if (filters.revenueGrowth?.length) {
    include =
      include && filters.revenueGrowth.indexOf(row.yoyLtmRevenueGrowth) > -1;
  }

  if (filters.sector?.length) {
    include =
      include &&
      (filters.sector.indexOf(row.sector) > -1 ||
        filters.sector.indexOf(row.freemium) > -1);
  }
  //   if (
  //     filters.sector?.length &&
  //     filters.sector.indexOf('Freemium / Bottoms-Up') > -1
  //   ) {
  //     include = include && filters.sector.indexOf(row.freemium) > -1;
  //   }

  return include;
};
