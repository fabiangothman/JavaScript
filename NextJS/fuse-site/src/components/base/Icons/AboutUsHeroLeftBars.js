import PropTypes from 'prop-types';

function AboutUsHeroLeftBars({ className }) {
  return (
    <svg
      width="337"
      height="344"
      viewBox="0 0 337 344"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g opacity="0.7">
        <rect x="309.78" width="26.4154" height="233.536" fill="#8F1F1B" />
        <rect x="258.15" width="26.4154" height="233.536" fill="#8F1F1B" />
        <rect x="206.52" width="26.4154" height="233.536" fill="#8F1F1B" />
        <rect x="154.89" width="26.4154" height="233.536" fill="#8F1F1B" />
        <rect x="103.26" width="26.4154" height="344" fill="#8F1F1B" />
        <rect
          x="77.4451"
          y="231.734"
          width="9.60558"
          height="112.265"
          fill="#8F1F1B"
        />
        <rect
          x="51.63"
          y="231.734"
          width="9.60558"
          height="112.265"
          fill="#8F1F1B"
        />
        <rect
          x="25.8151"
          y="231.734"
          width="9.60558"
          height="112.265"
          fill="#8F1F1B"
        />
        <rect y="231.734" width="9.60558" height="112.265" fill="#8F1F1B" />
      </g>
    </svg>
  );
}

AboutUsHeroLeftBars.defaultProps = {
  className: null,
};

AboutUsHeroLeftBars.propTypes = {
  className: PropTypes.string,
};

export default AboutUsHeroLeftBars;
