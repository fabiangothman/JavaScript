import filter from 'lodash/filter';
import numeral from 'numeral';
import { getChartData } from '~api/benchmarkingApi';

export default async function handler() {
  const data = await getChartData('publicCompsCsv');

  if (!data) {
    return null;
  }

  const parsedData = data.map((row) => {
    return {
      yoyLtmRevenueGrowth: row['Sector 1'],
      sector: row['Sector 2'],
      freemium: row['Sector 3'] || null,
      y: row.Ticker,
      yLabel: row.Company,
      x: numeral(row['Multiple Return Since IPO']).value(),
      xLabel: row['Multiple Return Since IPO'],
    };
  });

  const filteredData = filter(parsedData, (item) => !!item.x);

  return filteredData;
}
