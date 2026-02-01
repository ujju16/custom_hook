# API Key Limitation Notice

## Current Status

Your Oanda API key (`bd79602d-03ab-4326-8494-7926761a2996`) has **limited access**.

### What Works ✅
- `/v2/currencies.json` - Get list of all available currencies

### What Doesn't Work ❌
- `/v2/rates/spot.json` - Real-time exchange rates (403 Forbidden)
- Other real-time rate endpoints

## Error Message from API

```json
{
  "code": 4,
  "message": "The access token provided does not allow this request to be made; real-time rates are not available for this api key"
}
```

## Why This Happens

1. **Free Trial Limitations**: Free trial keys have limited endpoint access
2. **Expired Trial**: 7-day trial period may have ended
3. **Subscription Required**: Real-time rates require a paid subscription

## Solutions

### Option 1: Upgrade Your API Key (Recommended)

1. Visit [Oanda API Portal](https://www.oanda.com/fx-for-business/exchange-rates-api)
2. Log in to your account
3. Upgrade to a paid plan that includes real-time rates
4. Get your new API key
5. Update `.env` file with the new key

### Option 2: Request a New Trial Key

1. Visit [Oanda Sign Up](https://www.oanda.com/fx-for-business/exchange-rates-api)
2. Sign up for a new 7-day trial
3. Get your new API key
4. Update `.env` with the new key

### Option 3: Use Alternative Endpoints

Some endpoints may be available depending on your subscription:
- Historical rates (specific dates)
- Aggregated rates
- Other non-real-time endpoints

Check the [API Documentation](https://developer.oanda.com/exchange-rates-api/) for details.

### Option 4: Use a Different API

If Oanda doesn't meet your needs, consider alternatives:
- **ExchangeRate-API** (https://www.exchangerate-api.com/) - Free tier available
- **Fixer.io** (https://fixer.io/) - Free tier available
- **CurrencyLayer** (https://currencylayer.com/) - Free tier available
- **Open Exchange Rates** (https://openexchangerates.org/) - Free tier available

## Current Application Status

The application has been modified to:
- ✅ Show available currencies (works with your current key)
- ℹ️ Display a notice about real-time rates limitation
- ❌ Disable real-time rates fetching to prevent 403 errors

## How to Update Your API Key

When you get a new key with proper access:

1. Edit `.env` file:
   ```bash
   VITE_OANDA_API_KEY=your_new_api_key_here
   ```

2. Uncomment the rates fetching code in both components:
   - `src/Components/FetchData.jsx`
   - `src/Components/FetchDataWithClient.jsx`

3. Restart the dev server:
   ```bash
   npm run dev
   ```

## Testing Your API Key

You can test if a new key has real-time rates access:

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  "https://exchange-rates-api.oanda.com/v2/rates/spot.json?base=USD"
```

**Success**: Returns JSON with exchange rates
**Failure**: Returns error code 4 with permission message

## Resources

- [OANDA Exchange Rates API Documentation](https://developer.oanda.com/exchange-rates-api/)
- [Authentication Guide](https://developer.oanda.com/exchange-rates-api/v2/authentication/)
- [API Pricing Plans](https://www.oanda.com/foreign-exchange-data-services/en/exchange-rates-api/api-plans/)
- [OANDA Support](mailto:webservices@oanda.com)

## Summary

Your current API key works for basic endpoints like currencies, but real-time rates require an upgraded subscription. The application will display currencies only until you upgrade your API key.
