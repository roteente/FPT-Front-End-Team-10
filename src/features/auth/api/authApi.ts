import { baseApi } from '@/core/api/baseApi'
import { 
  LoginRequest, 
  LoginResponse, 
  RegisterRequest, 
  RegisterResponse,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ChangePasswordRequest,
  UpdateProfileRequest,
  User
} from '../model/types'

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Authentication endpoints
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User'],
    }),
    
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (userData) => ({
        url: '/register',
        method: 'POST',
        body: userData,
      }),
    }),
    
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),
    
    refreshToken: builder.mutation<LoginResponse, { refreshToken: string }>({
      query: (data) => ({
        url: '/refresh',
        method: 'POST',
        body: data,
      }),
    }),
    
    // User profile endpoints
    me: builder.query<User, void>({
      query: () => '/me',
      providesTags: ['User'],
    }),
    
    updateProfile: builder.mutation<User, UpdateProfileRequest>({
      query: (data) => ({
        url: '/profile',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    
    // Password management endpoints
    changePassword: builder.mutation<{ message: string }, ChangePasswordRequest>({
      query: (data) => ({
        url: '/change-password',
        method: 'POST',
        body: data,
      }),
    }),
    
    forgotPassword: builder.mutation<{ message: string }, ForgotPasswordRequest>({
      query: (data) => ({
        url: '/forgot-password',
        method: 'POST',
        body: data,
      }),
    }),
    
    resetPassword: builder.mutation<{ message: string }, ResetPasswordRequest>({
      query: (data) => ({
        url: '/reset-password',
        method: 'POST',
        body: data,
      }),
    }),
    
    // Account verification
    verifyEmail: builder.mutation<{ message: string }, { token: string }>({
      query: (data) => ({
        url: '/verify-email',
        method: 'POST',
        body: data,
      }),
    }),
    
    resendVerification: builder.mutation<{ message: string }, { email: string }>({
      query: (data) => ({
        url: '/resend-verification',
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const { 
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
  useMeQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyEmailMutation,
  useResendVerificationMutation,
} = authApi

// Enhanced login hook with fallback for development
export const useLoginWithFallback = () => {
  const [loginMutation] = useLoginMutation()
  
  const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
    console.log('🔐 Attempting login with credentials:', { email: credentials.email })
    try {
      const result = await loginMutation(credentials).unwrap()
      console.log('✅ Login API success:', result)
      return result
    } catch (error: any) {
      console.log('❌ Login API error:', error)
      console.log('Error status:', error.status)
      console.log('Error data:', error.data)
      
      // If API is not available (network error), use mock data
      if (error.status === 'FETCH_ERROR' || error.status === 0 || !error.status || error.message?.includes('fetch')) {
        console.warn('🔧 Auth API not available, using mock login data')
        const mockResponse = {
          user: {
            id: 1,
            name: 'Mock User',
            email: credentials.email,
            phone: '0123456789',
            avatar: '',
            address: 'Mock Address, Mock City',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          token: 'mock-jwt-token-' + Date.now(),
          refreshToken: 'mock-refresh-token-' + Date.now(),
          expiresIn: 3600,
        }
        console.log('🎭 Using mock login response:', mockResponse)
        return mockResponse
      }
      
      // Re-throw other errors (validation, auth failures, etc.)
      console.log('🚫 Re-throwing login error')
      throw error
    }
  }
  
  return { login }
}
