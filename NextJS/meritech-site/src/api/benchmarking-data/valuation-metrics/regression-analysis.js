import _get from 'lodash/get';
import { getChartData } from '~api/benchmarkingApi';

export default async function handler() {
  const data = await getChartData('publicCompsCsv');

  if (!data) {
    return null;
  }

  const parsedData = data
    .map((r) => {
      return {
        name: _get(r, 'Company', ''),
        ticker: _get(r, 'Ticker', ''),
        range: _get(r, 'Sector 1', ''),
        sector: _get(r, 'Sector 2', ''),
        freemium: _get(r, 'Sector 3', null),
        'Magic Number': _get(r, 'Magic Number', 0),
        '% LTM Gross Margin': _get(r, '% LTM Gross Margin', 0),
        '% YoY LTM Revenue Growth': _get(r, '% YoY LTM Revenue Growth', 0),
        '% YoY Implied ARR Growth': _get(r, '% YoY Implied ARR Growth', 0),
        'Annualized OpEx / FTE': _get(r, 'Annualized OpEx / FTE', 0),
        'Rule of 40': _get(r, 'Rule of 40', 0),
        'Payback Period': _get(r, 'Payback Period', 0),
        'Net Dollar Retention / Dollar-Based Net Expansion Rate': _get(
          r,
          'Net Dollar Retention / Dollar-Based Net Expansion Rate',
          0,
        ),
        'Implied ARR / FTE': _get(r, 'Implied ARR / FTE', 0),
        'EV / NTM Revenue': _get(r, 'EV / NTM Revenue', 0),
        'EV / Last Quarter Implied ARR': _get(
          r,
          'EV / Last Quarter Implied ARR',
          0,
        ),
        '% YoY NTM Revenue Growth': _get(r, '% YoY NTM Revenue Growth', 0),
        'EV / ARR': _get(r, 'EV / Last Quarter Implied ARR', 0),
        'Growth Adjusted EV / NTM Revenue': _get(
          r,
          'Growth Adjusted EV / NTM Revenue',
          0,
        ),
        'EV / NTM Gross Profit': _get(r, 'EV / NTM Gross Profit', 0),
      };
    })
    .filter(({ sector }) => sector !== '0');

  return parsedData;
}
