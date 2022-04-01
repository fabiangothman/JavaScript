export default function HamburgerIcon(props) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M2 2H14" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <path d="M2 8H14" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <path d="M2 14H14" stroke="white" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
