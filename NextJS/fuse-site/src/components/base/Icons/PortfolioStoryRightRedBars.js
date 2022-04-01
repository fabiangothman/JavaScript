import PropTypes from 'prop-types';

function PortfolioStoryRightRedBars({ className }) {
  return (
    <svg
      width="623"
      height="364"
      viewBox="0 0 623 364"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M436 150V364" stroke="#8F1F1B" />
      <path d="M481 150V364" stroke="#8F1F1B" />
      <path d="M539 150V364" stroke="#8F1F1B" />
      <path d="M622 150V364" stroke="#8F1F1B" />
      <path d="M410 225V364" stroke="#F51400" strokeWidth="4" />
      <path d="M377 75V150" stroke="#F51400" strokeWidth="4" />
      <path d="M359 75V150" stroke="#8F1F1B" />
      <path d="M331 75V150" stroke="#8F1F1B" />
      <path d="M300 75V150" stroke="#8F1F1B" />
      <path d="M263 75V150" stroke="#8F1F1B" />
      <path d="M226 75V150" stroke="#8F1F1B" />
      <path d="M189 75V150" stroke="#8F1F1B" />
      <path d="M152 75V150" stroke="#8F1F1B" />
      <path d="M115 0L115 150" stroke="#8F1F1B" />
      <path d="M77 0V150" stroke="#8F1F1B" />
      <path d="M39 0V150" stroke="#8F1F1B" />
      <path d="M1 0V150" stroke="#8F1F1B" />
    </svg>
  );
}

PortfolioStoryRightRedBars.defaultProps = {
  className: null,
};

PortfolioStoryRightRedBars.propTypes = {
  className: PropTypes.string,
};

export default PortfolioStoryRightRedBars;
