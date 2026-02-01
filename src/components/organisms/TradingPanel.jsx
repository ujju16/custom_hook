import React, { useState } from 'react'
import Button from '../atoms/Button'
import Badge from '../atoms/Badge'

const TradingPanel = ({ symbol = 'EUR/USD', onTrade }) => {
  const [orderType, setOrderType] = useState('market')
  const [side, setSide] = useState('buy')
  const [amount, setAmount] = useState('')
  const [price, setPrice] = useState('')
  const [stopLoss, setStopLoss] = useState('')
  const [takeProfit, setTakeProfit] = useState('')
  const [leverage, setLeverage] = useState(1)

  const handleSubmit = (e) => {
    e.preventDefault()
    const order = {
      symbol,
      side,
      orderType,
      amount: parseFloat(amount),
      price: orderType === 'limit' ? parseFloat(price) : null,
      stopLoss: stopLoss ? parseFloat(stopLoss) : null,
      takeProfit: takeProfit ? parseFloat(takeProfit) : null,
      leverage,
      timestamp: new Date().toISOString(),
    }
    onTrade && onTrade(order)
    console.log('Order submitted:', order)
  }

  return (
    <div className="trading-panel">
      <div className="card-header">
        <span>Trade {symbol}</span>
        <Badge variant={side === 'buy' ? 'success' : 'danger'}>
          {side.toUpperCase()}
        </Badge>
      </div>

      <div className="trading-tabs">
        <button
          className={`tab ${orderType === 'market' ? 'active' : ''}`}
          onClick={() => setOrderType('market')}
        >
          Market
        </button>
        <button
          className={`tab ${orderType === 'limit' ? 'active' : ''}`}
          onClick={() => setOrderType('limit')}
        >
          Limit
        </button>
        <button
          className={`tab ${orderType === 'stop' ? 'active' : ''}`}
          onClick={() => setOrderType('stop')}
        >
          Stop
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Side Selection */}
        <div className="form-group">
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              type="button"
              variant={side === 'buy' ? 'success' : 'secondary'}
              onClick={() => setSide('buy')}
              style={{ flex: 1 }}
            >
              Buy / Long
            </Button>
            <Button
              type="button"
              variant={side === 'sell' ? 'danger' : 'secondary'}
              onClick={() => setSide('sell')}
              style={{ flex: 1 }}
            >
              Sell / Short
            </Button>
          </div>
        </div>

        {/* Amount */}
        <div className="form-group">
          <label className="form-label">Amount (Lots)</label>
          <input
            type="number"
            className="form-input"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.01"
            step="0.01"
            min="0.01"
            required
          />
        </div>

        {/* Price (for limit orders) */}
        {orderType === 'limit' && (
          <div className="form-group">
            <label className="form-label">Limit Price</label>
            <input
              type="number"
              className="form-input"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="1.10000"
              step="0.00001"
              required
            />
          </div>
        )}

        {/* Leverage */}
        <div className="form-group">
          <label className="form-label">Leverage: {leverage}x</label>
          <input
            type="range"
            min="1"
            max="100"
            value={leverage}
            onChange={(e) => setLeverage(parseInt(e.target.value))}
            style={{ width: '100%' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-secondary)' }}>
            <span>1x</span>
            <span>50x</span>
            <span>100x</span>
          </div>
        </div>

        {/* Stop Loss */}
        <div className="form-group">
          <label className="form-label">Stop Loss (Optional)</label>
          <input
            type="number"
            className="form-input"
            value={stopLoss}
            onChange={(e) => setStopLoss(e.target.value)}
            placeholder="1.09500"
            step="0.00001"
          />
        </div>

        {/* Take Profit */}
        <div className="form-group">
          <label className="form-label">Take Profit (Optional)</label>
          <input
            type="number"
            className="form-input"
            value={takeProfit}
            onChange={(e) => setTakeProfit(e.target.value)}
            placeholder="1.10500"
            step="0.00001"
          />
        </div>

        {/* Submit */}
        <Button
          type="submit"
          variant={side === 'buy' ? 'success' : 'danger'}
          style={{ width: '100%', padding: '12px' }}
        >
          {side === 'buy' ? 'Buy' : 'Sell'} {symbol}
        </Button>
      </form>

      {/* Market Info */}
      <div style={{ marginTop: '16px', fontSize: '12px', color: 'var(--text-secondary)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span>Margin Required:</span>
          <span style={{ color: 'var(--text-primary)' }}>
            ${amount ? ((parseFloat(amount) * 100000) / leverage).toFixed(2) : '0.00'}
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Position Size:</span>
          <span style={{ color: 'var(--text-primary)' }}>
            ${amount ? (parseFloat(amount) * 100000).toFixed(2) : '0.00'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default TradingPanel
