import React from 'react'

const Badge = ({ children, variant = 'success' }) => {
  return <span className={`badge badge-${variant}`}>{children}</span>
}

export default Badge
