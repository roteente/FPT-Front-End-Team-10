export interface Address {
  id?: number
  street: string
  district: string
  city: string
  ward?: string
  zipCode?: string
  addressType: 'Nhà' | 'Công ty' | 'Khác'
  isDefault: boolean
  receiverName?: string
  receiverPhone?: string
}

export interface User {
  id: number
  email: string
  name: string
  role: 'admin' | 'user'
  avatar?: string
  phone?: string
  dateOfBirth?: string
  gender?: 'male' | 'female' | 'other'
  addresses?: Address[]
  defaultAddress?: Address
  createdAt?: string
  updatedAt?: string
  isActive?: boolean
  loyaltyPoints?: number
  membershipLevel?: 'bronze' | 'silver' | 'gold' | 'platinum'
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
  [x: string]: any
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
