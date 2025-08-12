import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { loginStart, loginSuccess, loginFailure } from '../model/authSlice'
import { useLoginMutation } from '../api/authApi'
import { LoginForm } from '../ui/LoginForm'
import { setStorage, removeStorage } from '@/core/utils/storage'

interface LoginFormContainerProps {
  onSuccess?: () => void
}

export function LoginFormContainer({ onSuccess }: LoginFormContainerProps) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { isLoading, error } = useAppSelector(state => state.auth)
  const [login] = useLoginMutation()

  const handleLogin = async (email: string, password: string, rememberMe: boolean) => {
    try {
      dispatch(loginStart())
      const result = await login({ email, password }).unwrap()
      
      // Handle remember me functionality
      if (rememberMe) {
        setStorage('auth_token', result.token, 'localStorage')
        setStorage('user_data', JSON.stringify(result.user), 'localStorage')
      } else {
        setStorage('auth_token', result.token, 'sessionStorage')
        setStorage('user_data', JSON.stringify(result.user), 'sessionStorage')
        // Clear any existing localStorage auth data
        removeStorage('auth_token', 'localStorage')
        removeStorage('user_data', 'localStorage')
      }
      
      dispatch(loginSuccess(result))
      
      // Call onSuccess callback (to close modal) or navigate to home
      if (onSuccess) {
        onSuccess()
      } else {
        navigate('/', { replace: true })
      }
    } catch (error: any) {
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
