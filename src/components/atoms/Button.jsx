import React from 'react'

const Button = ({ children, variant = 'primary', size = 'medium', onClick, disabled, className = '' }) => {
  const classes = `btn btn-${variant} btn-${size} ${className}`

  return (
    <button className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}

export default Button
