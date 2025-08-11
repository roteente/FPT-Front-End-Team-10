interface EnvConfig {
  API_URL: string
  MOCK_API: boolean
  NODE_ENV: string
}

export const env: EnvConfig = {
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  MOCK_API: import.meta.env.VITE_MOCK_API === 'true' || false,
  NODE_ENV: import.meta.env.NODE_ENV || 'development',
}
