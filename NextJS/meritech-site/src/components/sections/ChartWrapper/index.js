/* eslint-disable no-nested-ternary */
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './ChartWrapper.module.scss';
import { Grid, Row, Col } from '~grid';
import FootnotesText from '~benchmarkingComponents/FootnotesText';
import Footnotes from '~benchmarkingComponents/Footnotes';
import Filters from '~benchmarkingComponents/Filters';
import SecondaryNavigation from '~baseComponents/SecondaryNavigation';
import { RichTextTypes } from '~baseComponents/RichText';
import Loading from '~baseComponents/Loading';

const ChartWrapper = ({
  chartTitle,
  chartSlug,
  filteredData,
  error,
  filters,
  setFilters,
  filterDefinitions,
  mainFootnotes,
  additionalFootnotes,
  dataUpdateDate,
  chartNotes,
  children,
}) => {
  return (
    <div className={styles.component}>
      <SecondaryNavigation chartSlug={chartSlug} />
      <Grid>
        <Row>
          <Col className={styles.chartWrapper} xs={12} lg={9}>
            <h2 className={cx('full-width', styles.title)}>{chartTitle}</h2>
            {error ? <Loading noData /> : filteredData ? children : <Loading />}
          </Col>
          <Col className={styles.filterWrapper} xs={12} lg={3}>
            <Filters
              filters={filters}
              setFilters={setFilters}
              filterDefinitions={filterDefinitions}
            />
            <Footnotes
              mainNotes={mainFootnotes}
              extraNotes={additionalFootnotes}
              date={dataUpdateDate}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} lg={9}>
            <FootnotesText className={styles.chartNotes}>
              {chartNotes}
            </FootnotesText>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

ChartWrapper.defaultProps = {
  filteredData: null,
  error: null,
  mainFootnotes: null,
  additionalFootnotes: null,
  dataUpdateDate: new Date(),
  chartNotes: null,
};

ChartWrapper.propTypes = {
  chartTitle: PropTypes.string.isRequired,
  chartSlug: PropTypes.string.isRequired,
  filteredData: PropTypes.bool,
  error: PropTypes.shape(),
  filters: PropTypes.shape().isRequired,
  setFilters: PropTypes.func.isRequired,
  filterDefinitions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  mainFootnotes: RichTextTypes,
  additionalFootnotes: RichTextTypes,
  dataUpdateDate: PropTypes.string,
  chartNotes: RichTextTypes,
  children: PropTypes.node.isRequired,
};

export default ChartWrapper;
