import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { loginStart, loginSuccess, loginFailure } from '../model/authSlice'
import { useLoginMutation } from '../api/authApi'
import { LoginForm } from '../ui/LoginForm'

export function LoginFormContainer() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { isLoading, error } = useAppSelector(state => state.auth)
  const [login] = useLoginMutation()

  const handleLogin = async (email: string, password: string) => {
    try {
      dispatch(loginStart())
      const result = await login({ email, password }).unwrap()
      dispatch(loginSuccess(result))
      navigate('/')
    } catch (error: any) {
      dispatch(loginFailure(error.message || 'Đăng nhập thất bại'))
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
