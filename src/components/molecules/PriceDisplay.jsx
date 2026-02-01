import React from 'react'

const PriceDisplay = ({ price, change, changePercent, symbol = 'USD' }) => {
  const isPositive = change >= 0
  const priceClass = `price-display ${isPositive ? 'price-up' : 'price-down'}`

  return (
    <div>
      <div className={priceClass}>
        {symbol} {price?.toFixed(5) || '0.00000'}
      </div>
      {change !== undefined && (
        <div className="price-change">
          <span style={{ color: isPositive ? 'var(--green)' : 'var(--red)' }}>
            {isPositive ? '▲' : '▼'} {Math.abs(change).toFixed(5)} ({changePercent?.toFixed(2)}%)
          </span>
        </div>
      )}
    </div>
  )
}

export default PriceDisplay
