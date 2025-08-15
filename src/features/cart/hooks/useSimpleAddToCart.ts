import { useAuthVM } from '@/features/auth/hooks/useAuthVM'
import { useAppSelector, useAppDispatch } from '@/app/hooks'
import { baseApi } from '@/core/api/baseApi'
import { useGetCartQuery } from '../api/cartApi'

export function useSimpleAddToCart() {
  const { user, isAuthenticated } = useAuthVM()
  const token = useAppSelector(state => state.auth.token)
  const dispatch = useAppDispatch()
  const { refetch } = useGetCartQuery(user?.id, {
    skip: !user?.id,
  })

  const addToCart = async (bookId: number, quantity: number = 1) => {
    console.log('=== DEBUG ADD TO CART ===')
    console.log('User:', user)
    console.log('IsAuthenticated:', isAuthenticated)
    console.log('Token exists:', !!token)
    console.log('Token preview:', token ? token.substring(0, 20) + '...' : 'null')
    console.log('BookId:', bookId)
    console.log('Quantity:', quantity)

    // Tạm thời bỏ qua kiểm tra token để test chức năng
    if (!isAuthenticated || !user) {
      console.warn('❌ User not authenticated')
      alert('❌ Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng')
      return
    }
    
    // Tạm thời bỏ qua kiểm tra token
    /*
    if (!token) {
      console.warn('❌ No token found')
      alert('❌ Không có token, vui lòng đăng nhập lại')
      return
    }
    */

    try {
      // Check if the item already exists in the cart
      const existingItemsResponse = await fetch(`http://localhost:3000/carts?userId=${user.id}&bookId=${bookId}`, {
        headers: {
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      });
      
      const existingItems = await existingItemsResponse.json();
      let response;
      
      if (existingItems.length > 0) {
        // If item exists, update the quantity
        const existingItem = existingItems[0];
        response = await fetch(`http://localhost:3000/carts/${existingItem.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
          },
          body: JSON.stringify({
            quantity: existingItem.quantity + quantity
          })
        });
      } else {
        // If item doesn't exist, create a new one
        response = await fetch('http://localhost:3000/carts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Không gửi token Authorization nếu không có token
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
          },
          body: JSON.stringify({
            userId: user.id,
            bookId: bookId,
            quantity: quantity
          })
        });
      }

      console.log('Response status:', response.status)
      console.log('Response ok:', response.ok)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Response error:', errorText)
        throw new Error(`HTTP ${response.status}: ${errorText}`)
      }

      const result = await response.json()
      console.log('Success result:', result)
      
      // Invalidate the Cart tag to force a refetch of the cart data
      dispatch(
        baseApi.util.invalidateTags([{ type: 'Cart', id: 'LIST' }])
      )
      
      // Also explicitly refetch the cart data
      refetch()
      
      // Trigger global refetch for any component using cart data
      // This helps update the header cart count
      setTimeout(() => {
        dispatch(
          baseApi.util.invalidateTags([{ type: 'Cart', id: 'LIST' }])
        )
      }, 100)
      
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
