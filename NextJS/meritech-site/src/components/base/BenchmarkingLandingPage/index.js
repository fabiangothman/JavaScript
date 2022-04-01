import cx from 'classnames';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Bars from 'components/charts/Bars';
import { Grid, Row, Col } from '~grid';
import * as styles from './BenchmarkingLandingPage.module.scss';
import SecondaryNavigation from '~baseComponents/SecondaryNavigation';
import FootnotesText from '~benchmarkingComponents/FootnotesText';
import Footnotes from '~benchmarkingComponents/Footnotes';
import Filters from '~benchmarkingComponents/Filters';

export default function BenchmarkingLandingPage({ parsedCharts }) {
  const valueField = 'frequency';
  const allData = parsedCharts[4]
    // eslint-disable-next-line react/prop-types
    .map((data) => {
      const parsedValue = parseFloat(
        data['LTM G&A % of Revenue'].replace(/%/g, ''),
      );
      return {
        // ...data,
        name: data.Company,
        abbreviation: `${data.Ticker}`,
        [valueField]: Number.isNaN(parsedValue) ? 0 : parsedValue,
      };
    })
    .filter(({ name }) => !!name);

  const [filters, setFilters] = useState({});
  const [data, setData] = useState(allData);

  useEffect(() => {
    const ranges = filters.revenueGrowth;

    setData(() => {
      if (!ranges?.length) {
        return allData;
      }

      let filtered = [];

      const rangeMethods = {
        '<30%': (v) => v[valueField] <= 30,
        '30%-50%': (v) => v[valueField] >= 30 && v[valueField] <= 50,
        '>50%': (v) => v[valueField] >= 50,
      };

      // eslint-disable-next-line no-restricted-syntax
      for (const range of ranges) {
        filtered = [...filtered, ...allData.filter(rangeMethods[range])];
      }
      return filtered;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const filterDefinitions = [
    {
      label: 'YOY LTM Revenue Growth',
      type: 'buttonToggle',
      key: 'revenueGrowth',
      storageKey: 'revenueGrowth',
      options: [
        { label: '>50%', value: '>50%' },
        { label: '30%-50%', value: '30%-50%' },
        { label: '<30%', value: '<30%' },
      ],
      multiSelect: true,
      separator: false,
      defaultValue: [],
    },
    {
      label: 'Sector',
      type: 'buttonToggle',
      key: 'sector',
      storageKey: 'sector',
      options: [
        { label: 'Application', value: 'application' },
        { label: 'Infrastructure', value: 'infrastructure' },
        { label: 'Freemium / Bottoms-Up', value: 'freemium' },
      ],
      multiSelect: true,
      separator: true,
      defaultValue: [],
    },
    {
      label: 'Company',
      type: 'dropdown',
      key: 'company',
      storageKey: 'company',
      options: [
        { label: '>50%', value: '>50%' },
        { label: '30%-50%', value: '30%-50%' },
        { label: '<30%', value: '<30%' },
        { label: '>50%a', value: '>50%a' },
        {
          label: '30%-50%a 30%-50%a 30%-50%a 30%-50%a 30%-50%a ',
          value: '30%-50%a',
        },
        { label: '<30%a', value: '<30%a' },
        { label: '>50%b', value: '>50%b' },
        { label: '30%-50%b', value: '30%-50%b' },
        { label: '<30%b', value: '<30%b' },
      ],
      multiSelect: true,
      emptyLabel: 'None',
      separator: false,
      defaultValue: [],
    },
    {
      label: null,
      type: 'axisSelector',
      key: 'axis',
      storageKey: 'axis',
      xOptions: [
        { label: 'EV \\ NTM Revenue', value: 'ev_ntm' },
        { label: 'Rule of 40', value: 'rule_of_40' },
      ],
      yOptions: [
        { label: 'EV \\ NTM Revenue', value: 'ev_ntm' },
        { label: 'Rule of 40', value: 'rule_of_40' },
      ],
      defaultValue: {
        x: 'ev_ntm',
        y: 'rule_of_40',
      },
      separator: true,
    },
  ];

  return (
    <div className={styles.component}>
      <SecondaryNavigation />
      <Grid>
        <Row>
          <Col className={styles.chartWrapper} xs={12} lg={9}>
            <h2 className={cx('full-width', styles.title)}>Benchmarking</h2>
            <Bars
              data={data}
              x={(d) => d[valueField]}
              y={(d) => d.name}
              formatRightText={(v) => `${v}%`}
              formatTooltipValue={(v) => `${v}%`}
              marginRight={70}
              marginLeft={60}
            />
          </Col>
          <Col className={styles.filterWrapper} xs={12} lg={3}>
            <Filters
              filters={filters}
              setFilters={setFilters}
              filterDefinitions={filterDefinitions}
            />
            <Footnotes
              mainNotes={[
                'Data updated on {DATE}.',
                'Dollars in millions.',
                'ARR represents annualized revenue run-rate and calculated as latest quarter total revenue multiplied by four.',
              ]}
              extraNotes={[
                '* Indicates current Meritech Capital Partners portfolio company.',
              ]}
              date={new Date()}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} lg={9}>
            <FootnotesText className={styles.chartNotes}>
              Historical trading data includes all high-growth SaaS / cloud IPOs
              since Salesforce’s IPO in 2004 including those which were
              subsequently acquired: Agora, Alkami, Alteryx, Amplitude, Anaplan,
              AppFolio, Appian, Apptio, Asana, Atlassian, Avalara, Axon,
              BigCommerce, Bill.com, BlackLine, Blend Labs, Box, C3.ai, CS
              Disco, Carbon Black, Cloudera, Cloudflare, Confluent, Cornerstone
              OnDemand, Couchbase, Coupa, CrowdStrike, Cvent, Darktrace,
              Datadog, Demandware, DigitalOcean, DocuSign, Domo, Dropbox,
              Dynatrace, Elastic, Eloqua, ExactTarget, Fastly, Five9,
              Fleetmatics, Freshworks, HubSpot, Instructure, Intapp, JFrog,
              Jamf, Kaltura, KnowBe4, Lightspeed POS, LogMeIn, Marketo,
              Medallia, Mimecast, Mindbody, Momentive Global, Monday.com,
              MongoDB, MuleSoft, NetSuite, New Relic, OPOWER, Okta, Olo,
              PagerDuty, Palantir, Paycom, Paylocity, Ping Identity, Pivotal,
              Pluralsight, Procore, Q2, Qualtrics, Qualys, Rally, Responsys,
              RingCentral, Riskified, Salesforce, SendGrid, SentinelOne,
              ServiceNow, Shopify, Slack, Smartsheet, Snowflake, Splunk,
              Sprinklr, Sprout Social, Squarespace, SuccessFactors, Sumo Logic,
              Tableau, Tenable, Twilio, UiPath, Unity, Veeva, WalkMe, Wix,
              Workday, Workiva, Yext, Zendesk, Zoom, ZoomInfo, Zscaler, Zuora,
              nCino.
            </FootnotesText>
          </Col>
        </Row>
      </Grid>
    </div>
  );
}

BenchmarkingLandingPage.propTypes = {
  parsedCharts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
