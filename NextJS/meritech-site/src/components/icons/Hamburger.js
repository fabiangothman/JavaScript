export default function Hamburger(props) {
  return (
    <svg
      width="18"
      height="12"
      viewBox="0 0 18 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <line
        x1="0.75"
        y1="0.75"
        x2="17.25"
        y2="0.75"
        stroke="#12846B"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="17.25"
        y1="11.25"
        x2="0.75"
        y2="11.25"
        stroke="#12846B"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
