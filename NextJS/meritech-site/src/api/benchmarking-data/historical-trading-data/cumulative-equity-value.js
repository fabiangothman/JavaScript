import numeral from 'numeral';
import _get from 'lodash/get';
import { getChartData } from '../../benchmarkingApi';

export default async function handler() {
  const data = await getChartData('overTimeMasterCsv');
  const companies = await getChartData('overTimeMultiplesCsv');
  const justCompanies =
    companies &&
    Object.keys(companies[0]).map((key) => (key !== 'Date' ? key : null));
  if (!data) {
    return null;
  }

  let defaultValues = [];
  data
    .map((entry) => {
      return {
        'Cumulative Market Cap': _get(entry, 'Cumulative Market Cap', 0),
        'Cumulative Market Cap (LTM Growth Greater Than 50%)': _get(
          entry,
          'Cumulative Market Cap (LTM Growth Greater Than 50%)',
          0,
        ),

        'Cumulative Market Cap (LTM Growth Between 30% and 50%)': _get(
          entry,
          'Cumulative Market Cap (LTM Growth Between 30% and 50%)',
          0,
        ),

        'Cumulative Market Cap (LTM Growth Less Than 30%)': _get(
          entry,
          'Cumulative Market Cap (LTM Growth Less Than 30%)',
          0,
        ),
      };
    })
    .forEach((d, i) => {
      Object.entries(d).forEach(([k, v]) => {
        defaultValues.push({
          name: k,
          date: data[i]?.Date,
          y: numeral(v).value(),
          yLabel: v,
          value: numeral(v).value(),
        });
      });
    });

  defaultValues = defaultValues
    .filter(({ y, date }) => y && date)
    .map((e) => {
      return {
        ...e,
        date: new Date(e.date),
      };
    });

  return {
    default: defaultValues,
    justCompanies,
  };
}
