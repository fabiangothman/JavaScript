export default function SecondaryNavMobileArrow(props) {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle
        cx="18"
        cy="18"
        r="17.5"
        transform="rotate(180 18 18)"
        stroke="#DCDCD4"
      />
      <path
        d="M23 15.8944L18.2356 20.6584C18.2046 20.6894 18.1679 20.7139 18.1275 20.7307C18.0871 20.7475 18.0438 20.7561 18 20.7561C17.9562 20.7561 17.9129 20.7475 17.8725 20.7307C17.8321 20.7139 17.7954 20.6894 17.7644 20.6584L13 15.8944"
        stroke="#231F20"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
