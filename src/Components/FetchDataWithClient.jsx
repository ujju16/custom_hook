import React, { useState, useEffect } from 'react'
import { oandaV2 } from '../api/oandaClient'
import './FetchData.css'

/**
 * FetchDataWithClient - Demonstrates using the generated OpenAPI client
 *
 * This component shows how to use the type-safe, generated API client
 * instead of manually fetching data with UseFetch hook.
 */
const FetchDataWithClient = () => {
  const [currencies, setCurrencies] = useState(null)
  const [rates, setRates] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch currencies using the generated client
        const currenciesResponse = await oandaV2.v2Currencies({
          ext: 'json'
        })

        // Note: Spot rates require a paid API key
        // Commenting out to avoid 403 errors
        // const ratesResponse = await oandaV2.v2Spot({
        //   ext: 'json',
        //   base: 'USD'
        // })

        setCurrencies(currenciesResponse)
        // setRates(ratesResponse)
        setError('Note: Real-time rates not available with current API key. Only currencies are shown.')
      } catch (err) {
        setError(err.message || 'An error occurred')
        console.error('API Error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className='list_data_main'>
        <h1 className='usefetch_heading'>Oanda API - Generated Client</h1>
        <p>Loading data...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className='list_data_main'>
        <h1 className='usefetch_heading'>Oanda API - Generated Client</h1>
        <p className='error'>Error: {error}</p>
      </div>
    )
  }

  return (
    <>
      <div className='list_data_main'>
        <h1 className='usefetch_heading'>Oanda API - Generated Client</h1>
        <p className='note'>Using type-safe, auto-generated API client from OpenAPI spec</p>

        {/* Currencies Section */}
        <section>
          <h2>Available Currencies</h2>
          {currencies && currencies.currencies && Array.isArray(currencies.currencies) && (
            <div className='currencies-grid'>
              {currencies.currencies.slice(0, 10).map((currency) => (
                <div key={currency.code} className='currency-item'>
                  <strong>{currency.code}</strong>: {currency.description}
                </div>
              ))}
              {currencies.currencies.length > 10 && (
                <p className='note'>Showing 10 of {currencies.currencies.length} currencies</p>
              )}
            </div>
          )}
        </section>

        {/* Exchange Rates Section */}
        <section>
          <h2>Current Exchange Rates (Base: USD)</h2>
          {rates && rates.quotes && Array.isArray(rates.quotes) && (
            <div className='rates-container'>
              {rates.meta && rates.meta.effective_params && (
                <p className='timestamp'>
                  Last updated: {new Date(rates.meta.effective_params.date).toLocaleString()}
                </p>
              )}
              <ul className='rates-list'>
                {rates.quotes.slice(0, 20).map((quote) => (
                  <li key={quote.quote_currency} className='rate-item'>
                    <span className='currency-code'>
                      {rates.base_currency} → {quote.quote_currency}
                    </span>
                    <span className='rate-value'>{quote.mid_point.toFixed(4)}</span>
                  </li>
                ))}
              </ul>
              {rates.quotes.length > 20 && (
                <p className='note'>Showing 20 of {rates.quotes.length} exchange rates</p>
              )}
            </div>
          )}
        </section>
      </div>
    </>
  )
}

export default FetchDataWithClient
