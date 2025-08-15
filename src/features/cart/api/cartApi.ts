import { baseApi } from '@/core/api/baseApi'
import { CartItem } from '../model/types'

export const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<CartItem[], number | undefined>({
      query: (userId) => `carts?userId=${userId}`,
      providesTags: (result) => 
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Cart' as const, id })),
              { type: 'Cart', id: 'LIST' },
            ]
          : [{ type: 'Cart', id: 'LIST' }],
      transformResponse: (response: any[]) => {
        // Chỉ trả về basic cart items, book info sẽ được fetch riêng
        return response.map(item => ({
          id: item.id,
          userId: item.userId,
          bookId: item.bookId,
          title: '', // Sẽ được update bằng hook khác
          price: 0,
          image: '',
          quantity: item.quantity,
          book: null as any // Temporary, sẽ được populate riêng
        }))
      }
    }),

    addCartItem: builder.mutation<CartItem, { userId: number; bookId: number; quantity: number }>({
      query: (body) => ({
        url: '/carts',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Cart', id: 'LIST' }],
    }),

    updateCartItem: builder.mutation<void, { id: number; quantity: number }>({
      query: ({ id, quantity }) => ({
        url: `/carts/${id}`,
        method: 'PATCH',
        body: { quantity },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Cart', id },
        { type: 'Cart', id: 'LIST' }
      ],
    }),

    removeCartItem: builder.mutation<void, number>({
      query: (id) => ({
        url: `/carts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Cart', id },
        { type: 'Cart', id: 'LIST' }
      ],
    }),
  }),
})

export const {
  useGetCartQuery,
  useAddCartItemMutation,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
} = cartApi
