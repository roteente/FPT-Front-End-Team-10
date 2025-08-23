import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { env } from '@/core/config/env'

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: env.API_URL,
    prepareHeaders: (headers, { getState }) => {
      // Thêm token nếu có
      const token = (getState() as any).auth.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['Book', 'Category', 'User', 'Cart', 'Order'],
  endpoints: () => ({}),
})
