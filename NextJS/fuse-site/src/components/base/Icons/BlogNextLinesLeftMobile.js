import PropTypes from 'prop-types';

const BlogNextLinesLeftMobile = ({ className }) => {
  return (
    <svg
      width="103"
      height="227"
      viewBox="0 0 103 227"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <line
        y1="-0.5"
        x2="227"
        y2="-0.5"
        transform="matrix(-1.58053e-07 1 1 6.10607e-08 103 0)"
        stroke="#8F1F1B"
      />
      <line
        y1="-0.5"
        x2="227"
        y2="-0.5"
        transform="matrix(-1.58053e-07 1 1 6.10607e-08 84.0029 0)"
        stroke="#8F1F1B"
      />
      <line
        y1="-0.5"
        x2="227"
        y2="-0.5"
        transform="matrix(-1.58053e-07 1 1 6.10607e-08 46.0093 0)"
        stroke="#8F1F1B"
      />
    </svg>
  );
};

BlogNextLinesLeftMobile.defaultProps = {
  className: null,
};

BlogNextLinesLeftMobile.propTypes = {
  className: PropTypes.string,
};

export default BlogNextLinesLeftMobile;
