import React from 'react'

const Card = ({ title, children, action, className = '' }) => {
  return (
    <div className={`card ${className}`}>
      {title && (
        <div className="card-header">
          <span>{title}</span>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="card-body">{children}</div>
    </div>
  )
}

export default Card
