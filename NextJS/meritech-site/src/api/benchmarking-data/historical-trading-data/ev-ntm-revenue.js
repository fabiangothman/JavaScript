import numeral from 'numeral';
import _get from 'lodash/get';
import { getChartData } from '../../benchmarkingApi';

export function formatCurrency(n) {
  return numeral(n).format('$0,0.00');
}

export function formatPercentage(n) {
  return numeral(n).format('0%');
}

export function formatNumber(n) {
  return `${numeral(n).format('0,0.0')}x`;
}

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
        'Equity Value Weighted (Application)': _get(
          entry,
          'Equity Value Weighted EV / NTM Revenue (Application)',
          0,
        ),
        'Equity Value Weighted (Freemium / Bottoms-Up)': _get(
          entry,
          'Equity Value Weighted EV / NTM Revenue (Freemium / Bottoms-Up)',
          0,
        ),
        'Equity Value Weighted (Infrastructure)': _get(
          entry,
          'Equity Value Weighted EV / NTM Revenue (Infrastructure)',
          0,
        ),
        'Equity Value Weighted Average (30% - 50%)': _get(
          entry,
          'Equity Value Weighted EV / NTM Revenue (LTM Growth Between 30% and 50%)',
          0,
        ),
        'Equity Value Weighted Average (>50%)': _get(
          entry,
          'Equity Value Weighted EV / NTM Revenue (LTM Growth Greater Than 50%)',
          0,
        ),
        'Equity Value Weighted Average (<30%)': _get(
          entry,
          'Equity Value Weighted EV / NTM Revenue (LTM Growth Less Than 30%)',
          0,
        ),
        median: _get(entry, 'Median EV / NTM Revenue', 0),
        'Equity Value Weighted Average (All)': _get(
          entry,
          'All Public SaaS Companies Equity Value Weighted Indexed Stock Price Returns',
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
          yLabel: formatNumber(v),
          value: numeral(v).value(),
        });
      });
    });

  defaultValues = defaultValues.filter(({ y }) => y);

  // Companies

  let formattedCompanies = [];
  companies.forEach((d, i) => {
    Object.entries(d).forEach(([k, v]) => {
      formattedCompanies.push({
        name: k,
        date: data[i]?.Date,
        y: numeral(v).value(),
        yLabel: formatNumber(v),
        value: numeral(v).value(),
      });
    });
  });

  formattedCompanies = formattedCompanies
    .filter(({ y }) => y)
    .filter(({ name }) => name !== 'Date');
  // .filter(({ name }) =>
  //   [
  //     'SuccessFactors',
  //     'Salesforce',
  //     // 'Demandware',
  //     // 'Alteryx',
  //     // 'Anaplan',
  //   ].includes(name),
  // );

  return {
    default: defaultValues,
    companies: formattedCompanies,
    justCompanies,
  };
}
