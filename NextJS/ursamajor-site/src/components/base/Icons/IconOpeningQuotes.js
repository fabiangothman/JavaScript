import React from 'react'

const IconOpeningQuotes = (props) => {
  const { height = '22', width = '33', fill = '#fff', ...rest } = props
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 33 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M18.76 10.44V21.32L19.4 21.96H30.92L31.56 21.32V11.08L30.92 10.44H27.72L27.08 9.8V9.16L32.2 1.48V0.199997H27.08L25.8 0.839996L19.4 8.52L18.76 10.44ZM0.84 10.44V21.32L1.48 21.96H13L13.64 21.32V11.08L13 10.44H9.8L9.16 9.8V9.16L14.28 1.48V0.199997H9.16L7.88 0.839996L1.48 8.52L0.84 10.44Z"
        fill={fill}
      />
    </svg>
  )
}

export default IconOpeningQuotes
