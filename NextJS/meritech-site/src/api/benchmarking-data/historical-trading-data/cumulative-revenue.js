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
        'Cumulative NTM Revenue': _get(entry, 'Cumulative NTM Revenue', 0),
        'Cumulative NTM Revenue (LTM Growth Less Than 30%)': _get(
          entry,
          'Cumulative NTM Revenue (LTM Growth Less Than 30%)',
          0,
        ),
        'Cumulative NTM Revenue (LTM Growth Between 30% and 50%)': _get(
          entry,
          'Cumulative NTM Revenue (LTM Growth Between 30% and 50%)',
          0,
        ),
        'Cumulative NTM Revenue (LTM Growth Greater Than 50%)': _get(
          entry,
          'Cumulative NTM Revenue (LTM Growth Greater Than 50%)',
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

  defaultValues = defaultValues.filter(({ value, date }) => value && date);

  return {
    default: defaultValues,
    justCompanies,
  };
}
