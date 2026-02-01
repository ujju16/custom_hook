import React, { useState } from 'react'
import Card from '../atoms/Card'
import Button from '../atoms/Button'
import Badge from '../atoms/Badge'

const AlgorithmicTrading = () => {
  const [activeStrategy, setActiveStrategy] = useState(null)
  const [strategies] = useState([
    {
      id: 1,
      name: 'Moving Average Crossover',
      type: 'Trend Following',
      status: 'active',
      performance: '+12.5%',
      trades: 45,
      winRate: 68,
      description: 'MA(20) crosses MA(50) strategy with RSI filter'
    },
    {
      id: 2,
      name: 'Mean Reversion',
      type: 'Counter-Trend',
      status: 'inactive',
      performance: '+8.2%',
      trades: 32,
      winRate: 62,
      description: 'Bollinger Band bounce strategy with volume confirmation'
    },
    {
      id: 3,
      name: 'Breakout Scalper',
      type: 'Momentum',
      status: 'active',
      performance: '+15.7%',
      trades: 98,
      winRate: 58,
      description: 'High-frequency breakout strategy on 5-minute timeframe'
    },
    {
      id: 4,
      name: 'Grid Trading',
      type: 'Market Making',
      status: 'inactive',
      performance: '+6.3%',
      trades: 156,
      winRate: 55,
      description: 'Automated grid orders in ranging markets'
    },
  ])

  const [expertAdvisors] = useState([
    {
      name: 'Ichimoku Cloud EA',
      magic: 12345,
      active: true,
      profit: 450.50,
      trades: 23
    },
    {
      name: 'RSI + MACD Combo',
      magic: 12346,
      active: true,
      profit: 320.75,
      trades: 18
    },
    {
      name: 'Fibonacci Retracement',
      magic: 12347,
      active: false,
      profit: -25.30,
      trades: 5
    },
  ])

  return (
    <Card title="Algorithmic Trading & Expert Advisors">
      {/* Strategy List */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>
          Trading Strategies
        </div>
        <div style={{ display: 'grid', gap: '12px' }}>
          {strategies.map((strategy) => (
            <div
              key={strategy.id}
              style={{
                background: 'var(--bg-tertiary)',
                padding: '12px',
                borderRadius: '6px',
                border: activeStrategy === strategy.id ? '2px solid var(--blue)' : '1px solid var(--border-color)',
                cursor: 'pointer'
              }}
              onClick={() => setActiveStrategy(strategy.id)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <strong>{strategy.name}</strong>
                  <Badge variant={strategy.status === 'active' ? 'success' : 'warning'}>
                    {strategy.status}
                  </Badge>
                </div>
                <div style={{
                  fontWeight: 'bold',
                  color: strategy.performance.startsWith('+') ? 'var(--green)' : 'var(--red)'
                }}>
                  {strategy.performance}
                </div>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                {strategy.description}
              </div>
              <div style={{ display: 'flex', gap: '16px', fontSize: '12px' }}>
                <span>Type: <strong>{strategy.type}</strong></span>
                <span>Trades: <strong>{strategy.trades}</strong></span>
                <span>Win Rate: <strong style={{ color: 'var(--green)' }}>{strategy.winRate}%</strong></span>
              </div>
              {activeStrategy === strategy.id && (
                <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
                  {strategy.status === 'active' ? (
                    <Button size="small" variant="danger">Stop Strategy</Button>
                  ) : (
                    <Button size="small" variant="success">Start Strategy</Button>
                  )}
                  <Button size="small" variant="secondary">Backtest</Button>
                  <Button size="small" variant="secondary">Optimize</Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Expert Advisors (MetaTrader Style) */}
      <div>
        <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>
          Expert Advisors (EA)
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="positions-table">
            <thead>
              <tr>
                <th>EA Name</th>
                <th>Magic #</th>
                <th>Status</th>
                <th>Profit</th>
                <th>Trades</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {expertAdvisors.map((ea, index) => (
                <tr key={index}>
                  <td style={{ fontWeight: 'bold' }}>{ea.name}</td>
                  <td style={{ fontFamily: 'monospace' }}>{ea.magic}</td>
                  <td>
                    <Badge variant={ea.active ? 'success' : 'danger'}>
                      {ea.active ? 'Active' : 'Stopped'}
                    </Badge>
                  </td>
                  <td style={{
                    fontWeight: 'bold',
                    color: ea.profit >= 0 ? 'var(--green)' : 'var(--red)'
                  }}>
                    ${ea.profit.toFixed(2)}
                  </td>
                  <td>{ea.trades}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <Button size="small" variant={ea.active ? 'danger' : 'success'}>
                        {ea.active ? 'Stop' : 'Start'}
                      </Button>
                      <Button size="small" variant="secondary">
                        Settings
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Strategy Builder */}
      <div style={{ marginTop: '24px', padding: '16px', background: 'var(--bg-tertiary)', borderRadius: '6px' }}>
        <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>
          Strategy Builder
        </div>
        <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
          Create custom algorithms using MQL5-like syntax
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button size="small" variant="primary">New Strategy</Button>
          <Button size="small" variant="secondary">Import EA</Button>
          <Button size="small" variant="secondary">Strategy Tester</Button>
        </div>
      </div>

      {/* Performance Summary */}
      <div style={{ marginTop: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>TOTAL PROFIT</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--green)' }}>
            $745.95
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>AVG WIN RATE</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--blue)' }}>
            61%
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>TOTAL TRADES</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
            331
          </div>
        </div>
      </div>
    </Card>
  )
}

export default AlgorithmicTrading
