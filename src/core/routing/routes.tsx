import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthGuard } from '@/features/auth/components/AuthGuard'
import { MainLayout } from '@/ui/layout/MainLayout'

// Lazy load pages
const Home = lazy(() => import('@/features/books/pages/Home'))
const Detail = lazy(() => import('@/features/books/pages/Detail'))
const Search = lazy(() => import('@/features/books/pages/Search'))
const Cart = lazy(() => import('@/features/cart/pages/Cart'))
const Login = lazy(() => import('@/features/auth/pages/Login'))
const Register = lazy(() => import('@/features/auth/pages/Register'))

const CheckoutPage = lazy(() => import('@/features/checkout/pages/CheckoutPage'))
const OrderSuccess = lazy(() => import('@/features/orders/pages/OrderSuccess'))
const OrderDetailPage = lazy(() => import('@/features/orders/pages/OrderDetailPage'))
const OrdersListPage = lazy(() => import('@/features/orders/pages/OrdersListPage'))

// Profile pages
const ProfilePage = lazy(() => import('@/features/profile/pages/ProfilePage'))
const AccountPage = lazy(() => import('@/features/profile/pages/AccountPage'))
const OrdersPage = lazy(() => import('@/features/profile/pages/OrdersPage'))
const NotificationsPage = lazy(() => import('@/features/profile/pages/NotificationsPage'))
const SecurityPage = lazy(() => import('@/features/profile/pages/SecurityPage'))

const NotFound = lazy(() => import('@/pages/NotFound'))

export function AppRoutes() {
  return (
    <Routes>
      {/* Pages with MainLayout (header + footer) */}
      <Route path="/*" element={
        <MainLayout>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/books/:id" element={<Detail />} />

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

            {/* Profile routes */}
            <Route 
              path="/profile" 
              element={
                <AuthGuard>
                  <ProfilePage />
                </AuthGuard>
              } 
            />
            <Route 
              path="/profile/account" 
              element={
                <AuthGuard>
                  <AccountPage />
                </AuthGuard>
              } 
            />
            <Route 
              path="/profile/orders" 
              element={
                <AuthGuard>
                  <OrdersPage />
                </AuthGuard>
              } 
            />
            <Route 
              path="/orders" 
              element={
                <AuthGuard>
                  <OrdersListPage />
                </AuthGuard>
              } 
            />
            <Route 
              path="/orders/:id" 
              element={
                <AuthGuard>
                  <OrderDetailPage />
                </AuthGuard>
              } 
            />
            <Route 
              path="/profile/notifications" 
              element={
                <AuthGuard>
                  <NotificationsPage />
                </AuthGuard>
              } 
            />
            <Route 
              path="/profile/security" 
              element={
                <AuthGuard>
                  <SecurityPage />
                </AuthGuard>
              } 
            />

            {/* Catch all - 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MainLayout>
      } />

      {/* Checkout pages without MainLayout (custom header) */}
      <Route
        path="/checkout"
        element={
          <AuthGuard>
            <CheckoutPage />
          </AuthGuard>
        }
      />
      <Route
        path="/order-success"
        element={
          <AuthGuard>
            <OrderSuccess />
          </AuthGuard>
        }
      />
    </Routes>
  )
}
