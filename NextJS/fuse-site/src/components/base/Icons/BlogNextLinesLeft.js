import PropTypes from 'prop-types';

const BlogNextLinesLeft = ({ className }) => {
  return (
    <svg
      width="336"
      height="309"
      viewBox="0 0 336 309"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <line x1="335.5" y1="309" x2="335.5" y2="-3.97623e-08" stroke="#8F1F1B" />
      <line x1="298.5" y1="309" x2="298.5" y2="-3.97623e-08" stroke="#8F1F1B" />
      <line x1="224.5" y1="309" x2="224.5" y2="-3.97623e-08" stroke="#8F1F1B" />
      <line x1="117.5" y1="309" x2="117.5" y2="-2.58751e-08" stroke="#8F1F1B" />
      <line
        x1="0.5"
        y1="309"
        x2="0.500011"
        y2="-2.58751e-08"
        stroke="#8F1F1B"
      />
    </svg>
  );
};

BlogNextLinesLeft.defaultProps = {
  className: null,
};

BlogNextLinesLeft.propTypes = {
  className: PropTypes.string,
};

export default BlogNextLinesLeft;
