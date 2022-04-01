import React from 'react'

const IconSmallLeftArrow = (props) => {
  const { height = '8', width = '5' } = props
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 5 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1L3.92997 3.83662C3.95217 3.85805 3.96978 3.88352 3.9818 3.91155C3.99382 3.93959 4 3.96965 4 4C4 4.03035 3.99382 4.06041 3.9818 4.08845C3.96978 4.11648 3.95217 4.14195 3.92997 4.16339L1 7"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default IconSmallLeftArrow
