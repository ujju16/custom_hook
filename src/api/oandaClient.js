/**
 * Oanda API Client Configuration
 *
 * This module provides a pre-configured instance of the Oanda API client
 * with authentication already set up using environment variables.
 */

import { Configuration, V1Api, V2Api, V3Api } from './generated/src'

// Create configuration with API key from environment
const config = new Configuration({
  basePath: 'https://exchange-rates-api.oanda.com',
  apiKey: `Bearer ${import.meta.env.VITE_OANDA_API_KEY}`,
})

// Export pre-configured API instances
export const oandaV1 = new V1Api(config)
export const oandaV2 = new V2Api(config)
export const oandaV3 = new V3Api(config)

// Export configuration for custom usage
export { Configuration }

/**
 * Usage examples:
 *
 * import { oandaV2 } from '@/api/oandaClient'
 *
 * // Get currencies
 * const currencies = await oandaV2.v2Currencies({ ext: 'json' })
 *
 * // Get spot rates
 * const rates = await oandaV2.v2Spot({
 *   ext: 'json',
 *   base: 'USD'
 * })
 */
