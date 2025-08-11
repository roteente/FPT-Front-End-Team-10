import { baseApi } from '@/core/api/baseApi'
import { CartItem } from '../model/types'

export const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<CartItem[], void>({
      query: () => '/carts', 
      providesTags: ['Cart'],
    }),
  }),
})

export const { useGetCartQuery } = cartApi
