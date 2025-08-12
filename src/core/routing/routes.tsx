import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthGuard } from '@/features/auth/components/AuthGuard'

// Lazy load pages
const Home = lazy(() => import('@/features/books/pages/Home'))
const BookDetails = lazy(() => import('@/features/books/pages/BookDetails'))
const Search = lazy(() => import('@/features/books/pages/Search'))
const Cart = lazy(() => import('@/features/cart/pages/Cart'))
const Login = lazy(() => import('@/features/auth/pages/Login'))
const Register = lazy(() => import('@/features/auth/pages/Register'))
const NotFound = lazy(() => import('@/pages/NotFound'))

export function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/books/:id" element={<BookDetails />} />
      <Route path="/search" element={<Search />} />
      
      {/* Auth routes - keep for direct access */}
      <Route 
        path="/login" 
        element={
          <AuthGuard requireAuth={false}>
            <Login />
          </AuthGuard>
        } 
      />
      <Route 
        path="/register" 
        element={
          <AuthGuard requireAuth={false}>
            <Register />
          </AuthGuard>
        } 
      />
      
      {/* Protected routes */}
      <Route 
        path="/cart" 
        element={
          <AuthGuard>
            <Cart />
          </AuthGuard>
        } 
      />
      
      {/* Catch all - 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
