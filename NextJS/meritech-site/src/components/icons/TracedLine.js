export default function TracedLine(props) {
  return (
    <svg
      width="3"
      height="52"
      viewBox="0 0 3 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <line
        opacity="0.5"
        x1="1.5"
        y1="4.37114e-08"
        x2="1.5"
        y2="52"
        stroke="url(#paint0_linear_125_28351)"
        strokeWidth="2"
        strokeDasharray="2 4"
      />
      <defs>
        <linearGradient
          id="paint0_linear_125_28351"
          x1="0.99999"
          y1="62.5"
          x2="0.999975"
          y2="-8.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
      </defs>
    </svg>
  );
}
