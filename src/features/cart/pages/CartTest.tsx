import { useState, useEffect } from 'react'
import { useAddToCart } from '@/features/cart/hooks/useAddToCart'
import { useAuthVM } from '@/features/auth/hooks/useAuthVM'
import { useGetCartQuery } from '@/features/cart/api/cartApi'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { loginSuccess } from '@/features/auth/model/authSlice'

export default function CartTest() {
  const [bookId, setBookId] = useState(6) // Test với book ID 6
  const [quantity, setQuantity] = useState(1)
  const { addToCart, isLoading } = useAddToCart()
  const { user } = useAuthVM()
  const dispatch = useAppDispatch()
  const token = useAppSelector(state => state.auth.token)
  const { data: cartItems, refetch } = useGetCartQuery(user?.id, {
    skip: !user?.id,
  })

  // Auto login test user
  const handleAutoLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test2@example.com',
          password: '123456'
        })
      })
      
      const result = await response.json()
      
      if (result.accessToken) {
        // Parse JWT to get user info
        const payload = JSON.parse(atob(result.accessToken.split('.')[1]))
        
        const userInfo = {
          id: parseInt(payload.sub),
          email: payload.email,
          name: 'Test User',
          role: 'user' as const
        }
        
        dispatch(loginSuccess({
          user: userInfo,
          token: result.accessToken
        }))
        
        alert('Đã đăng nhập test user thành công!')
      }
    } catch (error) {
      console.error('Auto login error:', error)
      alert('Lỗi đăng nhập test user')
    }
  }

  const handleAddToCart = () => {
    addToCart({ bookId, quantity })
  }

  const handleRefetch = () => {
    refetch()
  }

  const handleDirectAPITest = async () => {
    if (!user) {
      alert('Vui lòng đăng nhập trước!')
      return
    }
    
    try {
      const response = await fetch('http://localhost:3000/carts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          userId: user.id,
          bookId: bookId,
          quantity: quantity
        })
      })
      
      const result = await response.json()
      console.log('Direct API result:', result)
      alert('Đã test API trực tiếp thành công!')
      refetch()
    } catch (error) {
      console.error('Direct API error:', error)
      alert('Lỗi khi test API trực tiếp')
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Test Chức Năng Giỏ Hàng</h1>
      
      {/* User Info */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h2 className="font-semibold mb-2">Thông Tin User:</h2>
        {user ? (
          <div>
            <p>ID: {user.id}</p>
            <p>Email: {user.email}</p>
            <p className="text-green-600">✅ Đã đăng nhập</p>
          </div>
        ) : (
          <div>
            <p className="text-red-600">Chưa đăng nhập</p>
            <div className="mt-2 space-x-2">
              <button
                onClick={handleAutoLogin}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Auto Login Test User
              </button>
              <a href="/register" className="text-blue-600 underline">Hoặc đăng ký tại đây</a>
            </div>
          </div>
        )}
      </div>

      {/* Test API trực tiếp */}
      <div className="bg-yellow-50 p-4 rounded-lg mb-6">
        <h2 className="font-semibold mb-4">Test API Trực Tiếp</h2>
        <div className="flex gap-4 items-end mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Book ID:</label>
            <input
              type="number"
              value={bookId}
              onChange={(e) => setBookId(Number(e.target.value))}
              className="border rounded px-3 py-2 w-24"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Số lượng:</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border rounded px-3 py-2 w-24"
              min="1"
            />
          </div>
          <button
            onClick={handleDirectAPITest}
            className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600"
          >
            Test API trực tiếp
          </button>
        </div>
      </div>

      {/* Add to Cart Test */}
      <div className="bg-white border rounded-lg p-6 mb-6">
        <h2 className="font-semibold mb-4">Test Hook useAddToCart</h2>
        <div className="flex gap-4 items-end mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Book ID:</label>
            <input
              type="number"
              value={bookId}
              onChange={(e) => setBookId(Number(e.target.value))}
              className="border rounded px-3 py-2 w-24"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Số lượng:</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border rounded px-3 py-2 w-24"
              min="1"
            />
          </div>
          <button
            onClick={handleAddToCart}
            disabled={isLoading || !user}
            className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 disabled:opacity-50"
          >
            {isLoading ? 'Đang thêm...' : 'Thêm vào giỏ (Hook)'}
          </button>
        </div>
        
        {!user && (
          <p className="text-red-600 text-sm">Vui lòng đăng nhập để thêm vào giỏ hàng</p>
        )}
      </div>

      {/* API endpoints test */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h2 className="font-semibold mb-4">API Endpoints Test</h2>
        <div className="space-y-2 text-sm">
          <div>
            <a href="http://localhost:3000/books" target="_blank" className="text-blue-600 underline">
              GET /books - Xem tất cả sách
            </a>
          </div>
          <div>
            <a href={`http://localhost:3000/books/${bookId}`} target="_blank" className="text-blue-600 underline">
              GET /books/{bookId} - Xem sách cụ thể
            </a>
          </div>
          <div>
            <a href="http://localhost:3000/carts" target="_blank" className="text-blue-600 underline">
              GET /carts - Xem tất cả cart items
            </a>
          </div>
          <div>
            <a href="http://localhost:3000/users" target="_blank" className="text-blue-600 underline">
              GET /users - Xem tất cả users
            </a>
          </div>
        </div>
      </div>

      {/* Cart Items Display */}
      <div className="bg-white border rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold">Giỏ Hàng Hiện Tại</h2>
          <button
            onClick={handleRefetch}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Refresh
          </button>
        </div>
        
        {cartItems ? (
          cartItems.length > 0 ? (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="border rounded p-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image || 'https://via.placeholder.com/100x150'}
                      alt={item.title}
                      className="w-16 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-red-600 font-semibold">
                        {item.price.toLocaleString('vi-VN')}₫
                      </p>
                      <p className="text-sm text-gray-600">Số lượng: {item.quantity}</p>
                      <p className="text-xs text-gray-500">Cart ID: {item.id}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Giỏ hàng trống</p>
          )
        ) : (
          <p className="text-gray-500">Đang tải...</p>
        )}
      </div>
    </div>
  )
}
