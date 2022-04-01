import React from 'react'

const IconArrow = (props) => {
  const { height = '30', width = '21', fill = '#fff' } = props
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 21 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 3L19 15L3 27"
        stroke={fill}
        strokeWidth="4"
        strokeLinecap="square"
        strokeLinejoin="bevel"
      />
    </svg>
  )
}
export default IconArrow
