import { Navigate } from 'react-router-dom'
import { useAppSelector } from '@/app/hooks'

interface RequireAuthProps {
  children: React.ReactNode
}

export function RequireAuth({ children }: RequireAuthProps) {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

interface RoleGuardProps {
  children: React.ReactNode
  requiredRole: string
}

export function RoleGuard({ children, requiredRole }: RoleGuardProps) {
  const user = useAppSelector(state => state.auth.user)

  if (!user || user.role !== requiredRole) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
