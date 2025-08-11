import { baseApi } from '@/core/api/baseApi'
import { LoginRequest, LoginResponse } from '../model/types'

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
    
    me: builder.query<LoginResponse['user'], void>({
      query: () => '/auth/me',
      providesTags: ['User'],
    }),
  }),
})

export const { useLoginMutation, useLogoutMutation, useMeQuery } = authApi
