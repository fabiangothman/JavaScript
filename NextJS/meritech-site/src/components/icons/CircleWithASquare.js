export default function CircleWithASquare(props) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="12" cy="12" r="11.5" stroke="#F1F1EE" />
      <rect
        x="8.70711"
        y="12"
        width="5.1005"
        height="5.1005"
        rx="0.5"
        transform="rotate(-45 8.70711 12)"
        fill="#F1F1EE"
        stroke="#F1F1EE"
      />
    </svg>
  );
}
