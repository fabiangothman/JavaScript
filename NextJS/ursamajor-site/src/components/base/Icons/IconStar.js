import React from 'react'

const IconStar = (props) => {
  const { height = '32', width = '32', fill = '#fff' } = props
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.1996 0H12.7996V8.2739L6.94941 2.42374L2.42393 6.94922L8.27471 12.8L0 12.8V19.2H8.2744L2.42316 25.0512L6.94864 29.5767L12.7996 23.7258V32H19.1996V23.7249L25.0513 29.5766L29.5768 25.0512L23.7257 19.2H32V12.8L23.7254 12.8L29.5761 6.94931L25.0506 2.42383L19.1996 8.27483V0Z"
        fill={fill}
      />
    </svg>
  )
}
export default IconStar
