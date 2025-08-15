import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { loginStart, loginSuccess, loginFailure } from '../model/authSlice'
import { useRegisterMutation } from '../api/authApi'
import { RegisterForm, RegisterFormData } from '../ui/RegisterForm'
import { setStorage } from '@/core/utils/storage'

interface RegisterFormContainerProps {
  onSuccess?: () => void
}

export function RegisterFormContainer({ onSuccess }: RegisterFormContainerProps) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { isLoading, error } = useAppSelector(state => state.auth)
  const [register] = useRegisterMutation()

  const handleRegister = async (formData: RegisterFormData) => {
    try {
      dispatch(loginStart())
      
      const registerData = {
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.password, // Xác nhận mật khẩu khớp với password
        role: 'user', // Vai trò mặc định là 'user'
        name: formData.name ?? '', // Cung cấp chuỗi rỗng nếu name không được định nghĩa
        phone: formData.phone ?? '', // Cung cấp chuỗi rỗng nếu phone không được định nghĩa
        acceptTerms: formData.acceptTerms, // Gửi trạng thái đồng ý điều khoản
      };
      
      console.log('Payload gửi đi:', registerData);
      const result = await register(registerData).unwrap();
      console.log('Phản hồi từ backend:', result);
      
      // Store auth data
      setStorage('auth_token', result.token, 'sessionStorage')
      setStorage('user_data', JSON.stringify(result.user), 'sessionStorage')
      
      dispatch(loginSuccess({
        user: result.user,
        token: result.token
      }))
      
      // Call onSuccess callback (to close modal) or navigate to home
      if (onSuccess) {
        onSuccess()
      } else {
        navigate('/', { replace: true })
      }
    } catch (error: any) {
      const errorMessage = error?.data?.message || error.message || 'Đăng ký thất bại. Vui lòng thử lại.'
      dispatch(loginFailure(errorMessage))
    }
  }

  return (
    <RegisterForm
      onSubmit={handleRegister}
      isLoading={isLoading}
      error={error}
    />
  )
}
