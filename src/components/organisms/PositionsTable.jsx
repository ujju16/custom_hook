import React from 'react'
import Card from '../atoms/Card'
import Badge from '../atoms/Badge'
import Button from '../atoms/Button'

const PositionsTable = ({ positions = [], onClose }) => {
  // Sample positions if none provided
  const samplePositions = positions.length > 0 ? positions : [
    {
      id: 1,
      symbol: 'EUR/USD',
      side: 'buy',
      size: 0.1,
      entryPrice: 1.0850,
      currentPrice: 1.0875,
      stopLoss: 1.0830,
      takeProfit: 1.0900,
      pnl: 25.00,
      pnlPercent: 0.23,
      openTime: '2024-02-01 09:30',
    },
    {
      id: 2,
      symbol: 'GBP/USD',
      side: 'sell',
      size: 0.05,
      entryPrice: 1.2650,
      currentPrice: 1.2630,
      stopLoss: 1.2680,
      takeProfit: 1.2600,
      pnl: 10.00,
      pnlPercent: 0.16,
      openTime: '2024-02-01 10:15',
    },
    {
      id: 3,
      symbol: 'USD/JPY',
      side: 'buy',
      size: 0.2,
      entryPrice: 147.50,
      currentPrice: 147.30,
      stopLoss: 147.00,
      takeProfit: 148.00,
      pnl: -20.00,
      pnlPercent: -0.14,
      openTime: '2024-02-01 11:00',
    },
  ]

  const totalPnL = samplePositions.reduce((sum, pos) => sum + pos.pnl, 0)

  return (
    <Card
      title="Open Positions"
      action={
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Badge variant={totalPnL >= 0 ? 'success' : 'danger'}>
            Total P&L: ${totalPnL.toFixed(2)}
          </Badge>
          <Button size="small" variant="secondary">Close All</Button>
        </div>
      }
    >
      <div style={{ overflowX: 'auto' }}>
        <table className="positions-table">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Side</th>
              <th>Size</th>
              <th>Entry</th>
              <th>Current</th>
              <th>S/L</th>
              <th>T/P</th>
              <th>P&L</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {samplePositions.map((position) => (
              <tr key={position.id}>
                <td style={{ fontWeight: 'bold' }}>{position.symbol}</td>
                <td>
                  <Badge variant={position.side === 'buy' ? 'success' : 'danger'}>
                    {position.side.toUpperCase()}
                  </Badge>
                </td>
                <td>{position.size}</td>
                <td style={{ fontFamily: 'monospace' }}>{position.entryPrice}</td>
                <td style={{ fontFamily: 'monospace' }}>{position.currentPrice}</td>
                <td style={{ fontFamily: 'monospace', color: 'var(--red)' }}>
                  {position.stopLoss}
                </td>
                <td style={{ fontFamily: 'monospace', color: 'var(--green)' }}>
                  {position.takeProfit}
                </td>
                <td style={{
                  fontWeight: 'bold',
                  color: position.pnl >= 0 ? 'var(--green)' : 'var(--red)'
                }}>
                  ${position.pnl.toFixed(2)}
                  <span style={{ fontSize: '11px', marginLeft: '4px' }}>
                    ({position.pnlPercent >= 0 ? '+' : ''}{position.pnlPercent}%)
                  </span>
                </td>
                <td style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                  {position.openTime}
                </td>
                <td>
                  <Button
                    size="small"
                    variant="danger"
                    onClick={() => onClose && onClose(position.id)}
                  >
                    Close
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

export default PositionsTable
