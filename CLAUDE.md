# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a learning repository focused on mastering data fetching patterns in React. The project demonstrates building custom hooks for data fetching, exploring asynchronous operations, and state management patterns. It's part of a larger curriculum that covers Web (React/Next.js), Mobile (Kotlin/Android), and Backend (Python) data fetching strategies.

## Tech Stack

- React 18.2
- Vite 5.2 (build tool and dev server)
- ESLint with React-specific plugins

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Build and preview production bundle
npm run preview
```

## Architecture

### Component Structure

The application follows a simple component hierarchy:
- `src/main.jsx` - Entry point, renders React root
- `src/App.jsx` - Main app component that renders FetchData
- `src/Components/FetchData.jsx` - Component demonstrating custom hook usage
- `src/Components/UseFetch.jsx` - Custom hook for data fetching (currently stubbed)

### Custom Hook Pattern

The core learning objective is implementing `UseFetch` as a reusable custom hook. This hook should:
- Accept a URL parameter
- Handle asynchronous fetch operations
- Manage loading, error, and data states
- Return state values that components can consume

### Styling

Component-specific styles are co-located with components:
- `src/Components/FetchData.css` - Styles for FetchData component
- `src/App.css` - App-level styles
- `src/index.css` - Global styles

## ESLint Configuration

The project uses ESLint with React-specific rules:
- React 18.2 JSX runtime (no need to import React for JSX)
- React Hooks rules enforced
- React Refresh plugin for Fast Refresh during development
- Target: ES2020, Browser environment

## Build Configuration

Vite is configured with default React plugin settings. The build outputs to `dist/` directory, which is git-ignored.

## API Integration

### Oanda Exchange Rates API

The project integrates with the Oanda Exchange Rates API for fetching currency data and exchange rates.

**Authentication**: Bearer token via Authorization header
- Format: `Authorization: Bearer <API_KEY>`
- The API key is stored in environment variables (never commit to git)

**Base URL**: `https://web-services.oanda.com/rates/api/v2`

**Key Endpoints Used**:
- `/currencies.json` - Get list of available currencies
- `/rates/spot.json?base=USD` - Get current exchange rates for a base currency

### Environment Variables Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Add your Oanda API key to `.env`:
   ```
   VITE_OANDA_API_KEY=your_api_key_here
   ```

3. Access environment variables in code:
   ```javascript
   const apiKey = import.meta.env.VITE_OANDA_API_KEY
   ```

**Important**:
- Vite requires environment variables to be prefixed with `VITE_` to be exposed to client-side code
- `.env` files are git-ignored to protect sensitive credentials
- After changing `.env`, restart the dev server for changes to take effect

### Custom Hook Usage

The `UseFetch` hook accepts a URL and optional fetch options (including headers for authentication):

```javascript
const { data, loading, error } = UseFetch(url, {
  headers: {
    'Authorization': `Bearer ${apiKey}`
  }
})
```

Returns an object with:
- `data`: Response data (null while loading or on error)
- `loading`: Boolean indicating fetch in progress
- `error`: Error message string (null if no error)

## OpenAPI Generator Integration

The project uses OpenAPI Generator to create a type-safe TypeScript API client from the Oanda OpenAPI specification.

### Generating the API Client

```bash
npm run generate:api
```

This command:
- Reads the OpenAPI spec from `oanda-openapi.json`
- Generates TypeScript client code to `src/api/generated/`
- Creates type-safe API classes (`V1Api`, `V2Api`, `V3Api`)

### Generated Client vs Manual Fetch

**Manual Fetch Approach** (`UseFetch` hook):
- Custom hook wrapping native fetch
- Manual URL construction and header management
- No type safety or auto-completion
- Good for learning and simple use cases

**Generated Client Approach** (OpenAPI Generator):
- Type-safe API methods with auto-completion
- Automatic request/response validation
- Structured error handling
- Generated from official API specification

### Using the Generated Client

Import pre-configured instances from `src/api/oandaClient.js`:

```javascript
import { oandaV2 } from '@/api/oandaClient'

// Type-safe API calls
const currencies = await oandaV2.v2Currencies({ ext: 'json' })
const rates = await oandaV2.v2Spot({ ext: 'json', base: 'USD' })
```

### Key Files

- `openapitools.json` - Generator configuration
- `oanda-openapi.json` - API specification (downloaded from Oanda)
- `src/api/generated/` - Generated client code (git-ignored)
- `src/api/oandaClient.js` - Pre-configured client instances
- `OPENAPI_GENERATOR_GUIDE.md` - Comprehensive setup guide

### Generator Configuration

The generator uses `typescript-fetch` to create a client compatible with:
- Native Fetch API (browser and modern Node.js)
- ES6 features
- TypeScript interfaces for all types
- Single parameter objects for cleaner method calls
