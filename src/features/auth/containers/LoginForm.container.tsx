import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { loginStart, loginSuccess, loginFailure } from '../model/authSlice'
import { useLoginWithFallback } from '../api/authApi'
import { LoginForm } from '../ui/LoginForm'
import { setStorage, removeStorage } from '@/core/utils/storage'

interface LoginFormContainerProps {
  onSuccess?: () => void
}

export function LoginFormContainer({ onSuccess }: LoginFormContainerProps) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { isLoading, error } = useAppSelector(state => state.auth)
  const { login } = useLoginWithFallback()

  const handleLogin = async (email: string, password: string, rememberMe: boolean) => {
    try {
      dispatch(loginStart())
      const result = await login({ email, password })
      console.log('Login result:', result)
      
      // Try different token field names that might be returned by the API
      const token = result.token || result.accessToken || result.access_token || result.authToken || result.jwt
      
      if (!token) {
        console.error('No token found in response:', result)
        dispatch(loginFailure('Không nhận được token từ server'))
        return
      }
      
      console.log('Token found:', token)
      
      // Handle remember me functionality
      if (rememberMe) {
        setStorage('auth_token', token, 'localStorage')
        setStorage('user_data', JSON.stringify(result.user), 'localStorage')
        console.log('Saved auth data to localStorage')
      } else {
        setStorage('auth_token', token, 'sessionStorage')
        setStorage('user_data', JSON.stringify(result.user), 'sessionStorage')
        // Clear any existing localStorage auth data
        removeStorage('auth_token', 'localStorage')
        removeStorage('user_data', 'localStorage')
        console.log('Saved auth data to sessionStorage')
      }
      dispatch(loginSuccess({ ...result, token }))
      console.log('Login success, dispatched to Redux')
      
      // Call onSuccess callback (to close modal) or navigate to home
      if (onSuccess) {
        console.log('Calling onSuccess callback')
        onSuccess()
      } else {
        console.log('Navigating to home page')
        navigate('/', { replace: true })
      }
    } catch (error: any) {
      console.error('Login error:', error)
      const errorMessage = error?.data?.message || error.message || 'Đăng nhập thất bại. Vui lòng thử lại.'
      dispatch(loginFailure(errorMessage))
    }
  }

  return (
    <LoginForm
      onSubmit={handleLogin}
      isLoading={isLoading}
      error={error}
    />
  )
}
