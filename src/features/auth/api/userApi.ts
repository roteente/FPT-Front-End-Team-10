import { baseApi } from '@/core/api/baseApi'
import { Address, User } from '../model/types'

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateUserAddress: builder.mutation<User, { userId: number; address: Address }>({
      query: ({ userId, address }) => ({
        url: `/users/${userId}`,
        method: 'PATCH',
        body: { address },
      }),
      invalidatesTags: (result, error, { userId }) => [
        { type: 'User', id: userId }
      ],
    }),
  }),
})

export const { useUpdateUserAddressMutation } = userApi
