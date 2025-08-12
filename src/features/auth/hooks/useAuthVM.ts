import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/app/hooks'
import { sessionExpired, updateLastActivity } from '../model/authSlice'

export function useAuthVM() {
  const dispatch = useAppDispatch()
  const { 
    user, 
    isAuthenticated, 
    isLoading, 
    error, 
    lastActivity, 
    sessionExpiry 
  } = useAppSelector(state => state.auth)
  
  // Check for session expiry
  useEffect(() => {
    if (isAuthenticated && sessionExpiry) {
      const checkExpiry = () => {
        const now = Date.now()
        if (now > sessionExpiry) {
          dispatch(sessionExpired())
        }
      }
      
      // Check immediately
      checkExpiry()
      
      // Check every minute
      const interval = setInterval(checkExpiry, 60000)
      return () => clearInterval(interval)
    }
  }, [isAuthenticated, sessionExpiry, dispatch])
  
  // Update activity on user interaction
  useEffect(() => {
    if (isAuthenticated) {
      const handleActivity = () => {
        dispatch(updateLastActivity())
      }
      
      // Listen for user activity
      const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart']
      events.forEach(event => {
        document.addEventListener(event, handleActivity, true)
      })
      
      return () => {
        events.forEach(event => {
          document.removeEventListener(event, handleActivity, true)
        })
      }
    }
  }, [isAuthenticated, dispatch])
  
  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    lastActivity,
    sessionExpiry,
    isAdmin: user?.role === 'admin',
    isUser: user?.role === 'user',
    userName: user?.name,
    userEmail: user?.email,
    userAvatar: user?.avatar,
    isSessionExpired: sessionExpiry ? Date.now() > sessionExpiry : false,
  }
}
