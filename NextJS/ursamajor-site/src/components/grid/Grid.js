import React from 'react'

const Grid = ({ children, className, fluid = false }) => {
  return (
    <div className={`${fluid ? 'container-fluid' : 'container'} ${className || ''}`}>
      {children}
    </div>
  )
}

export default Grid
