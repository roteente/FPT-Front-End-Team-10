import { baseApi } from '@/core/api/baseApi'
import { LoginRequest, LoginResponse } from '../model/types'

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/register',
        method: 'POST',
        body: credentials,
      }),
    }),
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
    }),
    me: builder.query<LoginResponse['user'], void>({
      query: () => '/600/users', 
      providesTags: ['User'],
    }),
  }),
})

export const { useRegisterMutation, useLoginMutation, useLogoutMutation, useMeQuery } = authApi
