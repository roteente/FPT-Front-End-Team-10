import { useState } from 'react'
import { Button, Input } from '@/ui/primitives'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => void
  isLoading?: boolean
  error?: string | null
}

export interface RegisterFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
  phone?: string
  acceptTerms: boolean
}

interface FormErrors {
  name?: string
  email?: string
  password?: string
  confirmPassword?: string
  phone?: string
  acceptTerms?: string
}

export function RegisterForm({ onSubmit, isLoading, error }: RegisterFormProps) {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    acceptTerms: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<FormErrors>({})

  const validateName = (name: string): string | undefined => {
    if (!name.trim()) return 'Họ tên là bắt buộc'
    if (name.trim().length < 2) return 'Họ tên phải có ít nhất 2 ký tự'
    return undefined
  }

  const validateEmail = (email: string): string | undefined => {
    if (!email) return 'Email là bắt buộc'
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) return 'Email không hợp lệ'
    return undefined
  }

  const validatePassword = (password: string): string | undefined => {
    if (!password) return 'Mật khẩu là bắt buộc'
    if (password.length < 6) return 'Mật khẩu phải có ít nhất 6 ký tự'
    if (!/(?=.*[a-z])(?=.*[A-Z])/.test(password)) {
      return 'Mật khẩu phải có ít nhất 1 chữ hoa và 1 chữ thường'
    }
    if (!/(?=.*\d)/.test(password)) {
      return 'Mật khẩu phải có ít nhất 1 chữ số'
    }
    return undefined
  }

  const validateConfirmPassword = (confirmPassword: string, password: string): string | undefined => {
    if (!confirmPassword) return 'Xác nhận mật khẩu là bắt buộc'
    if (confirmPassword !== password) return 'Mật khẩu xác nhận không khớp'
    return undefined
  }

  const validatePhone = (phone: string): string | undefined => {
    if (phone && !/^[0-9]{10,11}$/.test(phone)) {
      return 'Số điện thoại không hợp lệ'
    }
    return undefined
  }

  const handleInputChange = (field: keyof RegisterFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear field error when user starts typing
    if (fieldErrors[field as keyof FormErrors]) {
      setFieldErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form
    const errors: FormErrors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      confirmPassword: validateConfirmPassword(formData.confirmPassword, formData.password),
      phone: validatePhone(formData.phone || ''),
    }

    if (!formData.acceptTerms) {
      errors.acceptTerms = 'Bạn phải đồng ý với điều khoản sử dụng'
    }

    // Filter out undefined errors
    const hasErrors = Object.values(errors).some(error => error !== undefined)
    
    if (hasErrors) {
      setFieldErrors(errors)
      return
    }

    onSubmit(formData)
  }

  const isFormValid = formData.name && formData.email && formData.password && 
                     formData.confirmPassword && formData.acceptTerms &&
                     !Object.values(fieldErrors).some(error => error !== undefined)

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          error={fieldErrors.name}
          placeholder="Họ và tên"
          autoComplete="name"
          className="h-12 text-base border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          error={fieldErrors.email}
          placeholder="abc@email.com"
          autoComplete="email"
          className="h-12 text-base border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          error={fieldErrors.phone}
          placeholder="Số điện thoại (không bắt buộc)"
          autoComplete="tel"
          className="h-12 text-base border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="relative">
        <Input
          id="password"
          type={showPassword ? 'text' : 'password'}
          value={formData.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          error={fieldErrors.password}
          placeholder="Mật khẩu"
          autoComplete="new-password"
          className="h-12 text-base border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 pr-12"
        />
        <button
          type="button"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          onClick={() => setShowPassword(!showPassword)}
          tabIndex={-1}
        >
          {showPassword ? (
            <EyeSlashIcon className="h-5 w-5" />
          ) : (
            <EyeIcon className="h-5 w-5" />
          )}
        </button>
      </div>

      <div className="relative">
        <Input
          id="confirmPassword"
          type={showConfirmPassword ? 'text' : 'password'}
          value={formData.confirmPassword}
          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
          error={fieldErrors.confirmPassword}
          placeholder="Nhập lại mật khẩu"
          autoComplete="new-password"
          className="h-12 text-base border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 pr-12"
        />
        <button
          type="button"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          tabIndex={-1}
        >
          {showConfirmPassword ? (
            <EyeSlashIcon className="h-5 w-5" />
          ) : (
            <EyeIcon className="h-5 w-5" />
          )}
        </button>
      </div>

      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="acceptTerms"
            type="checkbox"
            checked={formData.acceptTerms}
            onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="acceptTerms" className="text-gray-700">
            Tôi đồng ý với{' '}
            <a href="/terms" className="text-blue-600 hover:text-blue-500 font-medium">
              điều khoản sử dụng
            </a>{' '}
            và{' '}
            <a href="/privacy" className="text-blue-600 hover:text-blue-500 font-medium">
              chính sách bảo mật
            </a>
          </label>
          {fieldErrors.acceptTerms && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.acceptTerms}</p>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              {error}
            </div>
          </div>
        </div>
      )}

      <Button
        type="submit"
        className="w-full h-12 bg-red-500 hover:bg-red-600 text-white font-medium text-base rounded-lg transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        isLoading={isLoading}
        disabled={!isFormValid || isLoading}
      >
        {isLoading ? 'Đang tạo tài khoản...' : 'Tạo tài khoản'}
      </Button>

      <div className="text-center">
        <p className="text-sm text-gray-500 mb-4">Hoặc tiếp tục bằng</p>
        
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </button>
          
          <button
            type="button"
            className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Facebook
          </button>
        </div>
      </div>
    </form>
  )
}
