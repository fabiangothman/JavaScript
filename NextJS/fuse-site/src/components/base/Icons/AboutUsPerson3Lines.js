import PropTypes from 'prop-types';

const AboutUsPerson3Lines = ({ className }) => {
  return (
    <svg
      className={className}
      width="55"
      height="122"
      viewBox="0 0 55 122"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M53.6836 0.597656L53.6836 120.834"
        stroke="#565353"
        strokeWidth="1.09306"
        strokeLinecap="round"
      />
      <path
        d="M27.4502 0.597656L27.4502 120.834"
        stroke="#565353"
        strokeWidth="1.09306"
        strokeLinecap="round"
      />
      <path
        d="M1.2168 0.597656L1.2168 120.834"
        stroke="#565353"
        strokeWidth="1.09306"
        strokeLinecap="round"
      />
    </svg>
  );
};

AboutUsPerson3Lines.defaultProps = {
  className: null,
};

AboutUsPerson3Lines.propTypes = {
  className: PropTypes.string,
};

export default AboutUsPerson3Lines;
