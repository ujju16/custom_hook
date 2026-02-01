import React from 'react'

const OrderBook = ({ bids = [], asks = [], spread = 0 }) => {
  // Show top 15 bids and asks
  const displayBids = bids.slice(0, 15)
  const displayAsks = asks.slice(0, 15).reverse()

  const formatPrice = (price) => price?.toFixed(5) || '0.00000'
  const formatSize = (size) => size?.toFixed(2) || '0.00'

  return (
    <div className="orderbook">
      <div className="orderbook-header">
        <span>Order Book</span>
        <span style={{ color: spread >= 0 ? 'var(--green)' : 'var(--red)' }}>
          Spread: {formatPrice(spread)}
        </span>
      </div>

      {/* Asks (Sell orders) */}
      <div className="orderbook-asks">
        {displayAsks.map((ask, index) => (
          <div key={`ask-${index}`} className="orderbook-row ask">
            <span style={{ color: 'var(--red)' }}>{formatPrice(ask.price)}</span>
            <span>{formatSize(ask.size)}</span>
            <span style={{ color: 'var(--text-secondary)' }}>{formatSize(ask.total)}</span>
          </div>
        ))}
      </div>

      {/* Spread Indicator */}
      <div style={{
        padding: '8px 12px',
        background: 'var(--bg-tertiary)',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '13px'
      }}>
        Spread: {formatPrice(spread)}
      </div>

      {/* Bids (Buy orders) */}
      <div className="orderbook-bids">
        {displayBids.map((bid, index) => (
          <div key={`bid-${index}`} className="orderbook-row bid">
            <span style={{ color: 'var(--green)' }}>{formatPrice(bid.price)}</span>
            <span>{formatSize(bid.size)}</span>
            <span style={{ color: 'var(--text-secondary)' }}>{formatSize(bid.total)}</span>
          </div>
        ))}
      </div>

      <div style={{ padding: '8px 12px', background: 'var(--bg-tertiary)', fontSize: '11px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
          <span>Price</span>
          <span>Size</span>
          <span>Total</span>
        </div>
      </div>
    </div>
  )
}

export default OrderBook
