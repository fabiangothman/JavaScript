import numeral from 'numeral';
import { getChartData } from '~api/benchmarkingApi';

import { formatNumber } from '~charts/utils';

export default async function handler() {
  const stockPricesData = await getChartData('overTimeStockPriceCsv');
  const multiplesData = await getChartData('overTimeMultiplesCsv');
  const ltmGrowthData = await getChartData('overTimeLtmGrowthCsv');

  if (!stockPricesData || !multiplesData || !ltmGrowthData) {
    return null;
  }

  let ltmGrowth = [];
  ltmGrowthData.forEach((d, i) => {
    Object.entries(d).forEach(([k, v]) => {
      ltmGrowth.push({
        name: k,
        date: ltmGrowthData[i]?.Date,
        y: numeral(v).value() * 100,
        yLabel: formatNumber(v),
        value: numeral(v).value() * 100,
        originalValue: v,
      });
    });
  });

  ltmGrowth = ltmGrowth
    .filter(({ y }) => y)
    .filter(({ name }) => name !== 'Date');

  let stockPrices = [];
  stockPricesData.forEach((d, i) => {
    Object.entries(d).forEach(([k, v]) => {
      stockPrices.push({
        name: k,
        date: stockPricesData[i]?.Date,
        y: numeral(v).value(),
        yLabel: formatNumber(v),
        value: numeral(v).value(),
        originalValue: v,
      });
    });
  });

  stockPrices = stockPrices
    .filter(({ y }) => y)
    .filter(({ name }) => name !== 'Date');

  let multiplesPrices = [];
  multiplesData.forEach((d, i) => {
    Object.entries(d).forEach(([k, v]) => {
      multiplesPrices.push({
        name: k,
        date: multiplesData[i]?.Date,
        y: numeral(v).value(),
        yLabel: formatNumber(v),
        value: numeral(v).value(),
        originalValue: v,
      });
    });
  });

  multiplesPrices = multiplesPrices
    .filter(({ y }) => y)
    .filter(({ name }) => name !== 'Date');

  return {
    multiplesPrices,
    stockPrices,
    ltmGrowth,
  };
}
