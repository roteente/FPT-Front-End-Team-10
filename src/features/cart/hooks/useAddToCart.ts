import { useAddCartItemMutation, useGetCartQuery, useUpdateCartItemMutation } from '../api/cartApi'
import { useAuthVM } from '@/features/auth/hooks/useAuthVM'
import { useAppSelector } from '@/app/hooks'

interface AddToCartParams {
  bookId: number
  quantity?: number
}

export function useAddToCart() {
  const { user } = useAuthVM()
  const token = useAppSelector(state => state.auth.token)
  const { data: cartItems = [] } = useGetCartQuery(user?.id, {
    skip: !user?.id,
  })
  const [addItem, { isLoading: isAdding }] = useAddCartItemMutation()
  const [updateItem, { isLoading: isUpdating }] = useUpdateCartItemMutation()

  const addToCart = async ({ bookId, quantity = 1 }: AddToCartParams) => {
    if (!user) {
      alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng')
      return
    }

    if (!token) {
      alert('Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại')
      return
    }

    try {
      // Đơn giản hóa: luôn thêm mới, không check duplicate
      await addItem({
        userId: user.id,
        bookId,
        quantity
      }).unwrap()
      
      alert('Đã thêm sản phẩm vào giỏ hàng!')
    } catch (error) {
      console.error('Add to cart error:', error)
      alert('Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng: ' + (error as any)?.message || error)
    }
  }

  return {
    addToCart,
    isLoading: isAdding || isUpdating
  }
}
