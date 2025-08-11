import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'

// Lazy load pages
const Home = lazy(() => import('@/features/books/pages/Home'))
const BookDetails = lazy(() => import('@/features/books/pages/BookDetails'))
const Search = lazy(() => import('@/features/books/pages/Search'))
const Cart = lazy(() => import('@/features/cart/pages/Cart'))
const Login = lazy(() => import('@/features/auth/pages/Login'))
const NotFound = lazy(() => import('@/pages/NotFound'))

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books/:id" element={<BookDetails />} />
      <Route path="/search" element={<Search />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
