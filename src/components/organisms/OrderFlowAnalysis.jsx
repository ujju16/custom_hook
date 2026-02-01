import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import Card from '../atoms/Card'

const OrderFlowAnalysis = ({ data = [] }) => {
  // Generate sample order flow data if none provided
  const sampleData = data.length > 0 ? data : [
    { price: '1.0850', buyVolume: 450, sellVolume: 320, delta: 130, time: '09:00' },
    { price: '1.0855', buyVolume: 520, sellVolume: 280, delta: 240, time: '09:15' },
    { price: '1.0860', buyVolume: 380, sellVolume: 450, delta: -70, time: '09:30' },
    { price: '1.0865', buyVolume: 680, sellVolume: 320, delta: 360, time: '09:45' },
    { price: '1.0870', buyVolume: 520, sellVolume: 580, delta: -60, time: '10:00' },
    { price: '1.0875', buyVolume: 720, sellVolume: 420, delta: 300, time: '10:15' },
  ]

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div style={{
          background: 'var(--bg-tertiary)',
          border: '1px solid var(--border-color)',
          padding: '12px',
          borderRadius: '4px'
        }}>
          <p style={{ margin: '0 0 8px 0', fontWeight: 'bold' }}>Price: {data.price}</p>
          <p style={{ margin: '4px 0', color: 'var(--green)' }}>Buy: {data.buyVolume}</p>
          <p style={{ margin: '4px 0', color: 'var(--red)' }}>Sell: {data.sellVolume}</p>
          <p style={{
            margin: '4px 0',
            color: data.delta >= 0 ? 'var(--green)' : 'var(--red)',
            fontWeight: 'bold'
          }}>
            Delta: {data.delta >= 0 ? '+' : ''}{data.delta}
          </p>
        </div>
      )
    }
    return null
  }

  // Calculate cumulative delta
  let cumulativeDelta = 0
  const enrichedData = sampleData.map(item => {
    cumulativeDelta += item.delta
    return { ...item, cumulativeDelta }
  })

  return (
    <Card title="Order Flow Analysis">
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
              BUY VOLUME
            </div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--green)' }}>
              {sampleData.reduce((sum, item) => sum + item.buyVolume, 0).toLocaleString()}
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
              SELL VOLUME
            </div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--red)' }}>
              {sampleData.reduce((sum, item) => sum + item.sellVolume, 0).toLocaleString()}
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
              NET DELTA
            </div>
            <div style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: cumulativeDelta >= 0 ? 'var(--green)' : 'var(--red)'
            }}>
              {cumulativeDelta >= 0 ? '+' : ''}{cumulativeDelta}
            </div>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={enrichedData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
          <XAxis dataKey="time" stroke="var(--text-secondary)" />
          <YAxis stroke="var(--text-secondary)" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="buyVolume" fill="var(--green)" name="Buy Volume" />
          <Bar dataKey="sellVolume" fill="var(--red)" name="Sell Volume" />
        </BarChart>
      </ResponsiveContainer>

      <div style={{ marginTop: '16px', fontSize: '12px', color: 'var(--text-secondary)' }}>
        <strong>Order Flow Insights:</strong>
        <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
          <li>
            {cumulativeDelta >= 0 ? 'Bullish' : 'Bearish'} pressure detected
            (Delta: {cumulativeDelta >= 0 ? '+' : ''}{cumulativeDelta})
          </li>
          <li>
            Institutional activity: {sampleData.filter(d => d.buyVolume > 600 || d.sellVolume > 600).length} large orders detected
          </li>
          <li>
            Volume Profile: {sampleData.reduce((sum, item) => sum + item.buyVolume + item.sellVolume, 0).toLocaleString()} total contracts
          </li>
        </ul>
      </div>
    </Card>
  )
}

export default OrderFlowAnalysis
