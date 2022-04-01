export default function Hamburguer(props) {
  return (
    <svg
      width="28"
      height="20"
      viewBox="0 0 28 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <line y1="1" x2="28" y2="1" stroke="#538BF1" strokeWidth="2"/>
      <line y1="10" x2="28" y2="10" stroke="#538BF1" strokeWidth="2"/>
      <line y1="19" x2="28" y2="19" stroke="#538BF1" strokeWidth="2"/>
    </svg>
  );
}
