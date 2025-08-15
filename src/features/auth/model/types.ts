export interface Address {
  street: string
  district: string
  city: string
  addressType: 'Nhà' | 'Công ty' | 'Khác'
  isDefault: boolean
}

export interface User {
  id: number
  email: string
  name: string
  role: 'admin' | 'user'
  avatar?: string
  phone?: string
  address?: Address
  createdAt?: string
  updatedAt?: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  lastActivity: number | null
  sessionExpiry: number | null
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  user: User
  token: string
  refreshToken?: string
  expiresIn?: number
}

export interface RegisterRequest {
  email: string
  password: string
  name: string
  phone?: string
}

export interface RegisterResponse {
  user: User
  token: string
  message: string
}

export interface ForgotPasswordRequest {
  email: string
}

export interface ResetPasswordRequest {
  token: string
  password: string
  confirmPassword: string
}

export interface ChangePasswordRequest {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export interface UpdateProfileRequest {
  name?: string
  phone?: string
  address?: string
  avatar?: string
}
