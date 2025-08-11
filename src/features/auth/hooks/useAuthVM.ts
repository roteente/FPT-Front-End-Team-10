import { useAppSelector } from '@/app/hooks'

export function useAuthVM() {
  const { user, isAuthenticated, isLoading, error } = useAppSelector(state => state.auth)
  
  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    isAdmin: user?.role === 'admin',
    isUser: user?.role === 'user',
  }
}
