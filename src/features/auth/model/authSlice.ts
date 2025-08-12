import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthState, User } from './types'
import { getStorage, removeStorage } from '@/core/utils/storage'

// Initialize state from storage
const initializeState = (): AuthState => {
  try {
    // Check localStorage first (remember me), then sessionStorage
    const token = getStorage('auth_token', 'localStorage') || getStorage('auth_token', 'sessionStorage')
    const userData = getStorage('user_data', 'localStorage') || getStorage('user_data', 'sessionStorage')
    
    if (token && userData) {
      const user = JSON.parse(userData)
      return {
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
        lastActivity: Date.now(),
        sessionExpiry: null,
      }
    }
  } catch (error) {
    console.error('Error initializing auth state:', error)
    // Clear corrupted data
    removeStorage('auth_token', 'localStorage')
    removeStorage('user_data', 'localStorage')
    removeStorage('auth_token', 'sessionStorage')
    removeStorage('user_data', 'sessionStorage')
  }
  
  return {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    lastActivity: null,
    sessionExpiry: null,
  }
}

const initialState: AuthState = initializeState()

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true
      state.error = null
    },
    loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.isLoading = false
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
      state.error = null
      state.lastActivity = Date.now()
      // Set session expiry to 24 hours from now
      state.sessionExpiry = Date.now() + (24 * 60 * 60 * 1000)
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
      state.isAuthenticated = false
      state.user = null
      state.token = null
      state.lastActivity = null
      state.sessionExpiry = null
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.error = null
      state.lastActivity = null
      state.sessionExpiry = null
      
      // Clear storage
      removeStorage('auth_token', 'localStorage')
      removeStorage('user_data', 'localStorage')
      removeStorage('auth_token', 'sessionStorage')
      removeStorage('user_data', 'sessionStorage')
    },
    clearError: (state) => {
      state.error = null
    },
    updateLastActivity: (state) => {
      if (state.isAuthenticated) {
        state.lastActivity = Date.now()
      }
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
        // Update storage
        const userData = JSON.stringify(state.user)
        if (getStorage('user_data', 'localStorage')) {
          removeStorage('user_data', 'localStorage')
          removeStorage('user_data', 'localStorage')
        }
        if (getStorage('user_data', 'sessionStorage')) {
          removeStorage('user_data', 'sessionStorage')
          removeStorage('user_data', 'sessionStorage')
        }
      }
    },
    sessionExpired: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.error = 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.'
      state.lastActivity = null
      state.sessionExpiry = null
      
      // Clear storage
      removeStorage('auth_token', 'localStorage')
      removeStorage('user_data', 'localStorage')
      removeStorage('auth_token', 'sessionStorage')
      removeStorage('user_data', 'sessionStorage')
    },
  },
})

export const { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  logout, 
  clearError, 
  updateLastActivity, 
  updateUser, 
  sessionExpired 
} = authSlice.actions
