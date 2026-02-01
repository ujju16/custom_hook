import React from 'react'

const MarketInfo = ({ data }) => {
  const items = [
    { label: '24h High', value: data?.high24h, format: 'price' },
    { label: '24h Low', value: data?.low24h, format: 'price' },
    { label: '24h Volume', value: data?.volume24h, format: 'volume' },
    { label: 'Spread', value: data?.spread, format: 'price' },
  ]

  const formatValue = (value, format) => {
    if (!value) return 'N/A'
    if (format === 'price') return value.toFixed(5)
    if (format === 'volume') return value.toLocaleString()
    return value
  }

  return (
    <div className="market-info">
      {items.map((item, index) => (
        <div key={index} className="info-item">
          <div className="info-label">{item.label}</div>
          <div className="info-value">{formatValue(item.value, item.format)}</div>
        </div>
      ))}
    </div>
  )
}

export default MarketInfo
