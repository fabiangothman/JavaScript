import PropTypes from 'prop-types';

const BlogHeroArticleLinesRightMobile = ({ className }) => {
  return (
    <svg
      width="127"
      height="227"
      viewBox="0 0 127 227"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <line
        y1="-0.5"
        x2="227"
        y2="-0.5"
        transform="matrix(-1.67921e-08 -1 -1 1.13785e-07 0 227)"
        stroke="#8F1F1B"
      />
      <line
        y1="-0.5"
        x2="227"
        y2="-0.5"
        transform="matrix(-1.67921e-08 -1 -1 1.13785e-07 18.9971 227)"
        stroke="#8F1F1B"
      />
      <line
        y1="-0.5"
        x2="227"
        y2="-0.5"
        transform="matrix(-1.67921e-08 -1 -1 1.13785e-07 56.9912 227)"
        stroke="#8F1F1B"
      />
      <line
        y1="-0.5"
        x2="227"
        y2="-0.5"
        transform="matrix(-2.58043e-08 -1 -1 7.40451e-08 111.929 227)"
        stroke="#8F1F1B"
      />
    </svg>
  );
};

BlogHeroArticleLinesRightMobile.defaultProps = {
  className: null,
};

BlogHeroArticleLinesRightMobile.propTypes = {
  className: PropTypes.string,
};

export default BlogHeroArticleLinesRightMobile;
