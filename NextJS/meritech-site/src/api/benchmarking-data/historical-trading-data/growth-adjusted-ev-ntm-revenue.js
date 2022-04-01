import numeral from 'numeral';
import _get from 'lodash/get';
import { getChartData } from '../../benchmarkingApi';

export default async function handler() {
  const data = await getChartData('overTimeMasterCsv');
  const companies = await getChartData('overTimeCsvGrAdjMultiples');
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
        'Equity Value Weighted Growth Adjusted Multiple': _get(
          entry,
          'Equity Value Weighted Growth Adjusted Multiple',
          0,
        ),
        'Equity Value Weighted Growth Adjusted Multiple (LTM Growth Less Than 30%)':
          _get(
            entry,
            'Equity Value Weighted Growth Adjusted Multiple (LTM Growth Less Than 30%)',
            0,
          ),
        'Equity Value Weighted Growth Adjusted Multiple (LTM Growth Between 30% and 50%)':
          _get(
            entry,
            'Equity Value Weighted Growth Adjusted Multiple (LTM Growth Between 30% and 50%)',
            0,
          ),
        'Equity Value Weighted Growth Adjusted Multiple (LTM Growth Greater Than 50%)':
          _get(
            entry,
            'Equity Value Weighted Growth Adjusted Multiple (LTM Growth Greater Than 50%)',
            0,
          ),
        'Equity Value Weighted Growth Adjusted Multiple (Application)': _get(
          entry,
          'Equity Value Weighted Growth Adjusted Multiple (Application)',
          0,
        ),
        'Equity Value Weighted Growth Adjusted Multiple (Infrastructure)': _get(
          entry,
          'Equity Value Weighted Growth Adjusted Multiple (Infrastructure)',
          0,
        ),
        'Equity Value Weighted Growth Adjusted Multiple (Freemium / Bottoms-Up)':
          _get(
            entry,
            'Equity Value Weighted Growth Adjusted Multiple (Freemium / Bottoms-Up)',
            0,
          ),
        'Average Growth Adjusted Multiple': _get(
          entry,
          'Average Growth Adjusted Multiple',
          0,
        ),
        'Median Growth Adjusted Multiple': _get(
          entry,
          'Median Growth Adjusted Multiple',
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

  defaultValues = defaultValues.filter(({ y, date }) => y && date);

  let formattedCompanies = [];
  companies.forEach((d, i) => {
    Object.entries(d).forEach(([k, v]) => {
      formattedCompanies.push({
        name: k,
        date: data[i]?.Date,
        y: numeral(v).value(),
        yLabel: v,
        value: numeral(v).value(),
      });
    });
  });

  formattedCompanies = formattedCompanies
    .filter(({ y, date }) => y && date)
    .filter(({ name }) => name !== 'Date');

  return {
    default: defaultValues,
    companies: formattedCompanies,
    justCompanies,
  };
}
