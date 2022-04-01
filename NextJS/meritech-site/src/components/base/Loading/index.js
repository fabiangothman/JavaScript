import PropTypes from 'prop-types';
import * as styles from './Loading.module.scss';

const Loading = ({ noData }) => (
  <div className={styles.loadingWrapper}>
    <div className={styles.loading}>
      {!noData ? (
        <div>
          <h3>Loading Data</h3>
        </div>
      ) : (
        <div>
          <h3>No Data</h3>
          <p>
            There is no data available for your query. <br />
            Adjust the filters to try a new query.
          </p>
        </div>
      )}
    </div>
  </div>
);

export default Loading;
Loading.defaultProps = {
  noData: false,
};
Loading.propTypes = {
  noData: PropTypes.bool,
};
