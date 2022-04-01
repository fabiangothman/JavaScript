export default function Clock(props) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        opacity="0.25"
        d="M1 25C1 31.3652 3.52856 37.4697 8.02944 41.9706C12.5303 46.4714 18.6348 49 25 49C31.3652 49 37.4697 46.4714 41.9706 41.9706C46.4714 37.4697 49 31.3652 49 25C49 18.6348 46.4714 12.5303 41.9706 8.02944C37.4697 3.52856 31.3652 1 25 1C18.6348 1 12.5303 3.52856 8.02944 8.02944C3.52856 12.5303 1 18.6348 1 25V25Z"
        stroke="#494643"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25 25.0001V16.4286"
        stroke="#494643"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25 25L35.7131 35.7154"
        stroke="#494643"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
