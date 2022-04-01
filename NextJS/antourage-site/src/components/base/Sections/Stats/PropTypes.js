import PropTypes from 'prop-types';

export const StatsPropTypes = PropTypes.shape({
  image: PropTypes.shape({
    url: PropTypes.string,
  }),
  headline: PropTypes.string,
  description: PropTypes.string,
});

export const StatsDefaultProps = {
  image: null,
  headline: null,
  description: null,
};
