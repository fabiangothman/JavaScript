import PropTypes from 'prop-types';

const BlogHeroArticleLinesLeft = ({ className }) => {
  return (
    <svg
      width="129"
      height="309"
      viewBox="0 0 129 309"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <line x1="128.5" y1="309" x2="128.5" y2="-3.97623e-08" stroke="#8F1F1B" />
      <line x1="91.5" y1="309" x2="91.5" y2="-3.97623e-08" stroke="#8F1F1B" />
      <line x1="17.5" y1="309" x2="17.5" y2="-3.97623e-08" stroke="#8F1F1B" />
    </svg>
  );
};

BlogHeroArticleLinesLeft.defaultProps = {
  className: null,
};

BlogHeroArticleLinesLeft.propTypes = {
  className: PropTypes.string,
};

export default BlogHeroArticleLinesLeft;
