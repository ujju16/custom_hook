# Oanda API Setup Guide

## Quick Start

Your Oanda API key has been configured in the `.env` file. Follow these steps to start using it:

### 1. Install Dependencies (if not already done)
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the port shown in terminal).

### 3. What You'll See

The application demonstrates two API calls to Oanda:

1. **Available Currencies**: Fetches a list of all supported currencies
2. **Current Exchange Rates**: Fetches real-time exchange rates with USD as the base currency

## API Details

### Authentication
- **Method**: Bearer Token
- **Header**: `Authorization: Bearer <API_KEY>`
- **Your API Key**: Stored in `.env` file as `VITE_OANDA_API_KEY`

### Endpoints Used

#### Get Currencies
```
GET https://web-services.oanda.com/rates/api/v2/currencies.json
```

#### Get Exchange Rates
```
GET https://web-services.oanda.com/rates/api/v2/rates/spot.json?base=USD
```

Query parameters:
- `base`: The base currency (e.g., USD, EUR, GBP)

## Custom Hook: UseFetch

The `UseFetch` custom hook handles all API calls with proper state management:

```javascript
const { data, loading, error } = UseFetch(url, options)
```

**Parameters**:
- `url`: API endpoint URL
- `options`: Fetch options object (headers, method, body, etc.)

**Returns**:
- `data`: Parsed JSON response
- `loading`: Boolean - true while fetching
- `error`: String - error message if request fails

## Customization Examples

### Change Base Currency
In `FetchData.jsx`, modify the rates fetch URL:
```javascript
const { data: rates } = UseFetch(
  `${baseUrl}/rates/spot.json?base=EUR`,  // Changed from USD to EUR
  {
    headers: {
      'Authorization': `Bearer ${apiKey}`
    }
  }
)
```

### Fetch Historical Rates
```javascript
const { data: historical } = UseFetch(
  `${baseUrl}/rates/2024-01-01.json?base=USD`,
  {
    headers: {
      'Authorization': `Bearer ${apiKey}`
    }
  }
)
```

### Add More Currency Pairs
```javascript
const { data: specificRates } = UseFetch(
  `${baseUrl}/rates/spot.json?base=USD&quote=EUR,GBP,JPY`,
  {
    headers: {
      'Authorization': `Bearer ${apiKey}`
    }
  }
)
```

## API Limits

- **Free Trial**: 7 days
- **Quota**: Up to 1,000 quotes during trial period
- **Get Your Own Key**: https://www.oanda.com/fx-for-business/fxdata-app/

## Troubleshooting

### Issue: "Authorization failed" or 401 errors
- Verify your API key is correct in `.env`
- Ensure the `.env` file is in the project root
- Restart the dev server after changing `.env`

### Issue: Environment variable is undefined
- Make sure the variable is prefixed with `VITE_`
- Restart the dev server
- Check that `.env` is not in `.gitignore` (it should be)

### Issue: CORS errors
- The Oanda API should have CORS enabled for web applications
- If issues persist, contact Oanda support

## Resources

- [Oanda API Documentation](https://developer.oanda.com/exchange-rates-api/)
- [Authentication Guide](https://developer.oanda.com/exchange-rates-api/v1/authentication/)
- [API Pricing Plans](https://www.oanda.com/foreign-exchange-data-services/en/exchange-rates-api/api-plans/)
