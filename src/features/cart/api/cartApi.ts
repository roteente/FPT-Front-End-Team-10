import { baseApi } from '@/core/api/baseApi'
import { CartItem } from '../model/types'
import { RootState } from '@/app/store'
import { FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/query'

export const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<CartItem[], number | undefined>({
      query: (userId) => `/cart?userId=${userId}&_expand=book`,
      providesTags: ['Cart'],
    }),


    addCartItem: builder.mutation<CartItem, Partial<CartItem>>({
      query: (body) => ({
        url: '/cart',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Cart'],
    }),

    updateCartItem: builder.mutation<void, { id: number; quantity: number }>({
      query: ({ id, quantity }) => ({
        url: `/cart/${id}`,
        method: 'PATCH',
        body: { quantity },
      }),
      invalidatesTags: ['Cart'],
    }),

    removeCartItem: builder.mutation<void, number>({
      query: (id) => ({
        url: `/cart/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),
  }),
})

export const {
  useGetCartQuery,
  useAddCartItemMutation,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
} = cartApi
