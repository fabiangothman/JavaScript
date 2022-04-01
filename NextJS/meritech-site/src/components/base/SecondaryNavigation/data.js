const navigation = [
  {
    text: 'Valuation Metrics',
    link: '',
    subLinkPrefix: 'valuation-metrics',
    subNavigation: [
      { text: 'Regression Analysis', link: 'regression-analysis' },
      {
        text: 'Multiple Return Since IPO',
        link: 'multiple-return-since-ipo',
      },
      { text: 'Equity Value ', link: 'equity-value' },
      { text: 'EV / NTM Revenue', link: 'ev-ntm-revenue' },
      {
        text: 'Growth Adjusted EV / NTM Revenue',
        link: 'growth-adjusted-ev-ntm-revenue',
      },
      { text: 'EV / ARR', link: 'ev-arr' },
      { text: 'EV / NTM Gross Profit', link: 'ev-ntm-gross-profit' },
    ],
  },
  {
    text: 'Operating Metrics',
    link: '#',
    subLinkPrefix: 'operating-metrics',
    subNavigation: [
      { text: 'Magic Number', link: 'magic-number' },
      { text: 'Payback Period', link: 'payback-period' },
      { text: 'Implied Average ACV', link: 'implied-avg-acv' },
      { text: 'Implied ARR / FTE', link: 'arr-fte' },
      { text: 'Annualized OpEx / FTE', link: 'annualized-opex-fte' },
      { text: 'Net Dollar retention', link: 'net-dollar-retention' },
      { text: 'Company age', link: 'company-age' },
    ],
  },
  {
    text: 'Financial Metrics',
    link: '#',
    subLinkPrefix: 'financial-metrics',
    subNavigation: [
      { text: 'Implied ARR', link: 'arr' },
      { text: 'ARR Growth (YoY)', link: 'arr-growth-yoy' },
      { text: 'Gross Margin (LTM)', link: 'gross-margin-ltm' },
      { text: 'S&M % of Revenue (LTM)', link: 's-and-m-of-revenue-ltm' },
      { text: 'R&D % of Revenue (LTM)', link: 'r-and-d-of-revenue-ltm' },
      { text: 'G&A % of Revenue (LTM)', link: 'g-and-a-of-revenue-ltm' },
      { text: 'OpEx % of Revenue (LTM)', link: 'opex-of-revenue-ltm' },
      { text: 'Free Cash Flow Margin (LTM)', link: 'fcf-margin-ltm' },
      { text: 'Rule of 40', link: 'rule-of-40' },
    ],
  },
  {
    text: 'Trading Data',
    link: '#',
    subLinkPrefix: 'historical-trading-data',
    subNavigation: [
      { text: 'EV / NTM Revenue', link: 'ev-ntm-revenue' },
      {
        text: 'Combined Stock Price, Multiple, and Growth',
        link: 'stock-price-and-forward-revenue-multiple',
      },
      {
        text: 'Growth Adjusted EV / NTM Revenue',
        link: 'growth-adjusted-ev-ntm-revenue',
      },
      {
        text: 'Cumulative equity value',
        link: 'cumulative-equity-value',
      },
      {
        text: 'Cumulative revenue',
        link: 'cumulative-revenue',
      },
    ],
  },
  { text: 'Comps Table', link: '/benchmarking/comps-table' },
];
export default navigation;
