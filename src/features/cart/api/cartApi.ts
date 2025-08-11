import { baseApi } from '@/core/api/baseApi'
import { Cart } from '../model/types'

export const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCartByUserId: builder.query<Cart[], number>({
      query: (userId) => `/carts?userId=${userId}`,
    })
  }),
})

export const { useGetCartByUserIdQuery } = cartApi
