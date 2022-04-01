import React from 'react'

const IconPlus = (props) => {
  const { height = '37', width = '38', fill = '#fff' } = props
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="11" width="2" height="24" fill={fill} />
      <rect y="11" width="24" height="2" fill={fill} />
    </svg>
  )
}
export default IconPlus
