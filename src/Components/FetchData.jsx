import React from 'react'
import UseFetch from './UseFetch'
import './FetchData.css'

const FetchData = () => {
  const apiKey = import.meta.env.VITE_OANDA_API_KEY
  const baseUrl = 'https://web-services.oanda.com/rates/api/v2'

  // Fetch available currencies
  const { data: currencies, loading: currenciesLoading, error: currenciesError } = UseFetch(
    `${baseUrl}/currencies.json`,
    {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    }
  )

  // Fetch latest exchange rates (base currency: USD)
  const { data: rates, loading: ratesLoading, error: ratesError } = UseFetch(
    `${baseUrl}/rates/spot.json?base=USD`,
    {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    }
  )

  return (
    <>
      <div className='list_data_main'>
        <h1 className='usefetch_heading'>Oanda Exchange Rates API</h1>

        {/* Currencies Section */}
        <section>
          <h2>Available Currencies</h2>
          {currenciesLoading && <p>Loading currencies...</p>}
          {currenciesError && <p className='error'>Error: {currenciesError}</p>}
          {currencies && (
            <div className='currencies-grid'>
              {Object.entries(currencies.currencies).slice(0, 10).map(([code, name]) => (
                <div key={code} className='currency-item'>
                  <strong>{code}</strong>: {name}
                </div>
              ))}
              {Object.keys(currencies.currencies).length > 10 && (
                <p className='note'>Showing 10 of {Object.keys(currencies.currencies).length} currencies</p>
              )}
            </div>
          )}
        </section>

        {/* Exchange Rates Section */}
        <section>
          <h2>Current Exchange Rates (Base: USD)</h2>
          {ratesLoading && <p>Loading rates...</p>}
          {ratesError && <p className='error'>Error: {ratesError}</p>}
          {rates && rates.quotes && (
            <div className='rates-container'>
              <p className='timestamp'>Last updated: {new Date(rates.meta.effective_params.date).toLocaleString()}</p>
              <ul className='rates-list'>
                {Object.entries(rates.quotes).slice(0, 20).map(([currency, rate]) => (
                  <li key={currency} className='rate-item'>
                    <span className='currency-code'>USD → {currency}</span>
                    <span className='rate-value'>{rate.mid_point.toFixed(4)}</span>
                  </li>
                ))}
              </ul>
              {Object.keys(rates.quotes).length > 20 && (
                <p className='note'>Showing 20 of {Object.keys(rates.quotes).length} exchange rates</p>
              )}
            </div>
          )}
        </section>
      </div>
    </>
  )
}

export default FetchData