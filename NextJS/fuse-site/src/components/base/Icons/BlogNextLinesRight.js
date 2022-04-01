import PropTypes from 'prop-types';

const BlogNextLinesRight = ({ className }) => {
  return (
    <svg
      width="129"
      height="309"
      viewBox="0 0 129 309"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <line
        y1="-0.5"
        x2="309"
        y2="-0.5"
        transform="matrix(-2.40264e-08 -1 -1 7.95245e-08 0 309)"
        stroke="#8F1F1B"
      />
      <line
        y1="-0.5"
        x2="309"
        y2="-0.5"
        transform="matrix(-2.40264e-08 -1 -1 7.95245e-08 37 309)"
        stroke="#8F1F1B"
      />
      <line
        y1="-0.5"
        x2="309"
        y2="-0.5"
        transform="matrix(-2.40264e-08 -1 -1 7.95245e-08 111 309)"
        stroke="#8F1F1B"
      />
    </svg>
  );
};

BlogNextLinesRight.defaultProps = {
  className: null,
};

BlogNextLinesRight.propTypes = {
  className: PropTypes.string,
};

export default BlogNextLinesRight;
