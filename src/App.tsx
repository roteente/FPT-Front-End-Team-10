import { Routes, Route } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Home from '@/features/books/pages/Home';
import Cart from '@/features/cart/pages/Cart';
import Login from '@/features/auth/pages/Login';
import Blank from '@/features/books/pages/Blank';
import BlankPage from '@/features/books/pages/BlankPage'; 

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/blank" element={<BlankPage />} />
        <Route path="/wishlist" element={<Blank />} />
        <Route path="/notifications" element={<Blank />} />
      </Route>
    </Routes>
  );
}
