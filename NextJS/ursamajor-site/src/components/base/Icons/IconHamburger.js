import React from 'react'

const IconClose = (props) => {
  const { size = '32' } = props
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="24" height="2" fill="white" />
      <rect y="10" width="24" height="2" fill="white" />
    </svg>
  )
}
export default IconClose
