import React from 'react'

const IconPlayer = (props) => {
  const { height = '26', width = '22', fill = '#fff' } = props
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 22 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M21.7336 12.898L0.245753 25.304L0.245754 0.491974L21.7336 12.898Z" fill={fill} />
    </svg>
  )
}
export default IconPlayer
