import React from 'react'
import UseFetch from './UseFetch'
import './FetchData.css'

const FetchData = () => {
  const apiKey = import.meta.env.VITE_OANDA_API_KEY
  const baseUrl = 'https://exchange-rates-api.oanda.com/v2'

  // Fetch available currencies
  const { data: currencies, loading: currenciesLoading, error: currenciesError } = UseFetch(
    `${baseUrl}/currencies.json`,
    {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    }
  )

  // Note: Spot rates require a paid API key
  // Commenting out to avoid 403 errors
  // const { data: rates, loading: ratesLoading, error: ratesError } = UseFetch(
  //   `${baseUrl}/rates/spot.json?base=USD`,
  //   {
  //     headers: {
  //       'Authorization': `Bearer ${apiKey}`
  //     }
  //   }
  // )
  const rates = null
  const ratesLoading = false
  const ratesError = 'Real-time rates not available with current API key. Please upgrade your Oanda API subscription.'

  return (
    <>
      <div className='list_data_main'>
        <h1 className='usefetch_heading'>Oanda Exchange Rates API</h1>

        {/* Currencies Section */}
        <section>
          <h2>Available Currencies</h2>
          {currenciesLoading && <p>Loading currencies...</p>}
          {currenciesError && <p className='error'>Error: {currenciesError}</p>}
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
          {ratesLoading && <p>Loading rates...</p>}
          {ratesError && <p className='error'>Error: {ratesError}</p>}
          {rates && rates.quotes && Array.isArray(rates.quotes) && (
            <div className='rates-container'>
              {rates.meta && rates.meta.effective_params && (
                <p className='timestamp'>Last updated: {new Date(rates.meta.effective_params.date).toLocaleString()}</p>
              )}
              <ul className='rates-list'>
                {rates.quotes.slice(0, 20).map((quote) => (
                  <li key={quote.quote_currency} className='rate-item'>
                    <span className='currency-code'>{rates.base_currency} → {quote.quote_currency}</span>
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

export default FetchData