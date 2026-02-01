# OpenAPI Generator Setup Guide

This project uses [OpenAPI Generator](https://openapi-generator.tech/) to automatically create a type-safe TypeScript API client from the Oanda Exchange Rates API OpenAPI specification.

## Table of Contents

1. [What is OpenAPI Generator?](#what-is-openapi-generator)
2. [Setup](#setup)
3. [Generating the API Client](#generating-the-api-client)
4. [Using the Generated Client](#using-the-generated-client)
5. [Configuration](#configuration)
6. [API Endpoints](#api-endpoints)
7. [Advanced Usage](#advanced-usage)

## What is OpenAPI Generator?

OpenAPI Generator is a tool that generates client SDKs, server stubs, and API documentation from an OpenAPI Specification (formerly Swagger Specification). Benefits include:

- **Type Safety**: Automatic TypeScript types for all API operations
- **Reduced Boilerplate**: No need to manually write fetch calls
- **Auto-completion**: IDE support for all API methods and parameters
- **Error Prevention**: Catch API contract violations at compile time
- **Up-to-date**: Regenerate when the API changes

## Setup

The project already has OpenAPI Generator configured. The following files are key:

### Configuration Files

**`openapitools.json`**
```json
{
  "generator-cli": {
    "version": "7.19.0"
  }
}
```

**`oanda-openapi.json`**
- Downloaded OpenAPI specification from Oanda
- Defines all API endpoints, parameters, and response types

### Generated Output

The client is generated to: `src/api/generated/`

This directory is git-ignored and should be regenerated as needed.

## Generating the API Client

### Initial Generation

```bash
npm run generate:api
```

This command:
1. Downloads the OpenAPI Generator CLI (if needed)
2. Reads `oanda-openapi.json`
3. Generates TypeScript code in `src/api/generated/`
4. Creates API classes: `V1Api`, `V2Api`, `V3Api`
5. Creates TypeScript interfaces for all request/response types

### When to Regenerate

Regenerate the client when:
- The Oanda API specification changes
- You update `oanda-openapi.json`
- You modify generator settings

### What Gets Generated

```
src/api/generated/
├── src/
│   ├── apis/
│   │   ├── V1Api.ts          # V1 endpoints
│   │   ├── V2Api.ts          # V2 endpoints
│   │   └── V3Api.ts          # V3 endpoints
│   ├── models/               # TypeScript interfaces
│   │   ├── V2Spot200Response.ts
│   │   ├── V2Currencies200Response.ts
│   │   └── ... (many more)
│   ├── index.ts              # Main entry point
│   └── runtime.ts            # Fetch utilities
├── docs/                     # API documentation
└── README.md                 # Generated client docs
```

## Using the Generated Client

### Step 1: Configure the Client

We've created a wrapper in `src/api/oandaClient.js`:

```javascript
import { Configuration, V1Api, V2Api, V3Api } from './generated/src'

const config = new Configuration({
  basePath: 'https://exchange-rates-api.oanda.com',
  apiKey: `Bearer ${import.meta.env.VITE_OANDA_API_KEY}`,
})

export const oandaV1 = new V1Api(config)
export const oandaV2 = new V2Api(config)
export const oandaV3 = new V3Api(config)
```

### Step 2: Use in Components

```javascript
import { oandaV2 } from '../api/oandaClient'

// Get currencies
const fetchCurrencies = async () => {
  try {
    const response = await oandaV2.v2Currencies({
      ext: 'json'
    })
    console.log(response)
  } catch (error) {
    console.error('Error:', error)
  }
}

// Get exchange rates
const fetchRates = async () => {
  try {
    const response = await oandaV2.v2Spot({
      ext: 'json',
      base: 'USD',
      quote: ['EUR', 'GBP', 'JPY']  // Optional: specific currencies
    })
    console.log(response)
  } catch (error) {
    console.error('Error:', error)
  }
}
```

### Comparison: Manual vs Generated Client

**Manual Fetch (UseFetch Hook)**
```javascript
const { data, loading, error } = UseFetch(
  'https://exchange-rates-api.oanda.com/v2/currencies.json',
  {
    headers: {
      'Authorization': `Bearer ${apiKey}`
    }
  }
)
// No type safety, manual URL construction, manual error handling
```

**Generated Client**
```javascript
const response = await oandaV2.v2Currencies({ ext: 'json' })
// Type-safe, auto-completion, validated parameters, structured errors
```

## Configuration

### Generator Options

In `package.json`, the generator is configured with:

```json
"generate:api": "openapi-generator-cli generate
  -i ./oanda-openapi.json            # Input spec
  -g typescript-fetch                # Generator type
  -o ./src/api/generated             # Output directory
  --skip-validate-spec               # Skip validation (Oanda spec has minor issues)
  --additional-properties=
    supportsES6=true,                # Use ES6 features
    npmName=@oanda/api-client,       # Package name
    npmVersion=1.0.0,                # Package version
    withInterfaces=true,             # Generate interfaces
    useSingleRequestParameter=true   # Single object parameter
"
```

### Available Generators for JavaScript/TypeScript

- `typescript-fetch` (used here) - Native Fetch API
- `typescript-axios` - Axios HTTP client
- `typescript-node` - Node.js specific
- `javascript` - Plain JavaScript

## API Endpoints

### V2 API (Most Common)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `v2Currencies()` | `/v2/currencies.{ext}` | Get list of currencies |
| `v2Spot()` | `/v2/rates/spot.{ext}` | Get current spot rates |
| `v2Aggregated()` | `/v2/rates/aggregated.{ext}` | Get aggregated rates |
| `v2Candle()` | `/v2/rates/candle.{ext}` | Get candlestick data |
| `v2Forward()` | `/v2/rates/forward.{ext}` | Get forward rates |
| `v2RemainingQuotes()` | `/v2/remaining_quotes.{ext}` | Check quota usage |

### Request Parameters

All methods accept a single parameter object:

```typescript
interface V2SpotRequest {
  ext: 'json' | 'xml' | 'csv'    // Response format
  base?: string                   // Base currency (default: USD)
  quote?: string[]                // Specific quote currencies
  dataSet?: Dataset               // Central bank data source
  decimalPlaces?: string          // Precision (1-15 or 'all')
  apiKey?: string                 // Not recommended, use header
}
```

## Advanced Usage

### Custom Configuration

Create a custom client instance:

```javascript
import { Configuration, V2Api } from './api/generated/src'

const customConfig = new Configuration({
  basePath: 'https://exchange-rates-api.oanda.com',
  apiKey: `Bearer ${apiKey}`,
  headers: {
    'Custom-Header': 'value'
  }
})

const customClient = new V2Api(customConfig)
```

### Error Handling

```javascript
try {
  const response = await oandaV2.v2Spot({ ext: 'json', base: 'USD' })
  console.log(response)
} catch (error) {
  if (error.response) {
    // API returned an error response
    console.error('API Error:', error.response.status, error.response.data)
  } else if (error.request) {
    // Request was made but no response
    console.error('Network Error:', error.message)
  } else {
    // Something else happened
    console.error('Error:', error.message)
  }
}
```

### Type Safety Example

```typescript
import { V2Spot200Response } from './api/generated/src'

const fetchRates = async (): Promise<V2Spot200Response> => {
  const response = await oandaV2.v2Spot({ ext: 'json', base: 'USD' })

  // TypeScript knows the structure
  response.base_currency  // string
  response.quotes         // Array<Quote>
  response.quotes[0].mid_point  // number

  return response
}
```

### Updating the OpenAPI Spec

To update with the latest spec:

```bash
# Download latest spec
curl -o oanda-openapi.json https://exchange-rates-api.oanda.com/openapi.json

# Regenerate client
npm run generate:api

# Restart dev server
npm run dev
```

## Troubleshooting

### Issue: Generated files not found

**Solution**: Run `npm run generate:api` to generate the client.

### Issue: TypeScript errors in generated code

**Solution**: The generated code is JavaScript-compatible but may have TypeScript warnings. This is normal for generated code.

### Issue: API methods return undefined

**Solution**:
1. Check that your API key is set in `.env`
2. Restart the dev server after changing `.env`
3. Verify the API key is valid

### Issue: CORS errors

**Solution**: Oanda API should support CORS. If issues persist, check:
- API key is correct
- Request format matches API requirements
- Check Oanda API status

## Resources

- [OpenAPI Generator Documentation](https://openapi-generator.tech/docs/generators/typescript-fetch)
- [Oanda API Documentation](https://developer.oanda.com/exchange-rates-api/)
- [OpenAPI Specification](https://swagger.io/specification/)
- [TypeScript Fetch Generator Options](https://openapi-generator.tech/docs/generators/typescript-fetch/)

## Summary

### Benefits of Using Generated Client

✅ **Type Safety**: Catch errors at compile time
✅ **Auto-completion**: IDE suggestions for all methods
✅ **Less Code**: No manual fetch/headers setup
✅ **Validated**: Parameters checked before requests
✅ **Documented**: Inline docs from OpenAPI spec
✅ **Maintainable**: Regenerate when API changes

### When to Use Each Approach

**Use Generated Client when:**
- Working with well-documented APIs
- Need type safety and auto-completion
- API has an OpenAPI specification
- Building production applications

**Use Manual Fetch when:**
- Quick prototypes or demos
- Learning how fetch works
- API doesn't have OpenAPI spec
- Need maximum flexibility
