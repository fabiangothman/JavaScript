export default function Mouse(props) {
  return (
    <svg
      width="16"
      height="24"
      viewBox="0 0 16 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="0.5" y="0.5" width="15" height="23" rx="6.5" stroke="#F1F1EE" />
      <line x1="8" y1="7" x2="8" y2="12" stroke="#F1F1EE" />
    </svg>
  );
}
