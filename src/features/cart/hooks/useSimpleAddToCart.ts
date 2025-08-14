import { useAuthVM } from '@/features/auth/hooks/useAuthVM'
import { useAppSelector } from '@/app/hooks'

export function useSimpleAddToCart() {
  const { user, isAuthenticated } = useAuthVM()
  const token = useAppSelector(state => state.auth.token)

  const addToCart = async (bookId: number, quantity: number = 1) => {
    console.log('=== DEBUG ADD TO CART ===')
    console.log('User:', user)
    console.log('IsAuthenticated:', isAuthenticated)
    console.log('Token exists:', !!token)
    console.log('Token preview:', token ? token.substring(0, 20) + '...' : 'null')
    console.log('BookId:', bookId)
    console.log('Quantity:', quantity)

    if (!isAuthenticated || !user) {
      console.warn('❌ User not authenticated')
      alert('❌ Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng')
      return
    }

    if (!token) {
      console.warn('❌ No token found')
      alert('❌ Không có token, vui lòng đăng nhập lại')
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

      console.log('Response status:', response.status)
      console.log('Response ok:', response.ok)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Response error:', errorText)
        throw new Error(`HTTP ${response.status}: ${errorText}`)
      }

      const result = await response.json()
      console.log('Success result:', result)
      alert('✅ Đã thêm vào giỏ hàng thành công!')
      
      return result
    } catch (error) {
      console.error('Add to cart error:', error)
      alert('❌ Lỗi: ' + (error as any)?.message || String(error))
      throw error
    }
  }

  return { addToCart }
}
