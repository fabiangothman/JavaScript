import React from 'react'

const IconLink = (props) => {
  const { height = '24', width = '24' } = props
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.04492 10.7941L17.0005 1"
        stroke="#FC4C21"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.9994 6.59716V1H11.3105"
        stroke="#FC4C21"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.0889 4.55554H1.62222C1.4572 4.55554 1.29893 4.6211 1.18224 4.73779C1.06556 4.85448 1 5.01274 1 5.17776V16.3778C1 16.5428 1.06556 16.7011 1.18224 16.8178C1.29893 16.9344 1.4572 17 1.62222 17H12.8222C12.9873 17 13.1455 16.9344 13.2622 16.8178C13.3789 16.7011 13.4445 16.5428 13.4445 16.3778V8.9111"
        stroke="#FC4C21"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
export default IconLink
