import { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthVM } from '../hooks/useAuthVM'

interface AuthGuardProps {
  children: ReactNode
  requireAuth?: boolean
  requireAdmin?: boolean
  redirectTo?: string
}

export function AuthGuard({ 
  children, 
  requireAuth = true, 
  requireAdmin = false,
  redirectTo = '/login' 
}: AuthGuardProps) {
  const { isAuthenticated, isAdmin, isLoading } = useAuthVM()
  const location = useLocation()

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // Check if authentication is required
  if (requireAuth && !isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />
  }

  // Check if admin role is required
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/unauthorized" replace />
  }

  // If user is authenticated and trying to access auth pages, redirect to home
  if (!requireAuth && isAuthenticated && (location.pathname === '/login' || location.pathname === '/register')) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

// Higher-order component for protecting routes
export function withAuthGuard<T extends object>(
  Component: React.ComponentType<T>,
  options?: Omit<AuthGuardProps, 'children'>
) {
  return function AuthGuardedComponent(props: T) {
    return (
      <AuthGuard {...options}>
        <Component {...props} />
      </AuthGuard>
    )
  }
}
