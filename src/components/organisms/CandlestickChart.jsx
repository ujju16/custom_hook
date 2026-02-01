import React, { useEffect, useRef, useState } from 'react'
import { createChart } from 'lightweight-charts'
import Button from '../atoms/Button'

const CandlestickChart = ({ data = [], indicators = [] }) => {
  const chartContainerRef = useRef(null)
  const chartRef = useRef(null)
  const candlestickSeriesRef = useRef(null)
  const [timeframe, setTimeframe] = useState('1H')

  useEffect(() => {
    if (!chartContainerRef.current) return

    // Create chart
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 450,
      layout: {
        background: { color: '#131722' },
        textColor: '#d1d4dc',
      },
      grid: {
        vertLines: { color: '#2a2e39' },
        horzLines: { color: '#2a2e39' },
      },
      crosshair: {
        mode: 1,
      },
      rightPriceScale: {
        borderColor: '#2a2e39',
      },
      timeScale: {
        borderColor: '#2a2e39',
        timeVisible: true,
        secondsVisible: false,
      },
    })

    // Add candlestick series
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    })

    chartRef.current = chart
    candlestickSeriesRef.current = candlestickSeries

    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        })
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (chartRef.current) {
        chartRef.current.remove()
      }
    }
  }, [])

  useEffect(() => {
    if (candlestickSeriesRef.current && data.length > 0) {
      candlestickSeriesRef.current.setData(data)
      chartRef.current.timeScale().fitContent()
    }
  }, [data])

  const timeframes = ['1M', '5M', '15M', '1H', '4H', '1D']

  return (
    <div className="chart-container">
      <div className="chart-controls">
        <div style={{ display: 'flex', gap: '8px' }}>
          {timeframes.map((tf) => (
            <Button
              key={tf}
              size="small"
              variant={timeframe === tf ? 'primary' : 'secondary'}
              onClick={() => setTimeframe(tf)}
            >
              {tf}
            </Button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '8px', marginLeft: 'auto' }}>
          <Button size="small" variant="secondary">
            Indicators
          </Button>
          <Button size="small" variant="secondary">
            Drawing Tools
          </Button>
        </div>
      </div>
      <div ref={chartContainerRef} style={{ width: '100%' }} />
    </div>
  )
}

export default CandlestickChart
