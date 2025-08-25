import { useAddCartItemMutation, useUpdateCartItemMutation, useGetCartQuery } from '@/features/cart/api/cartApi'
import { useAuthVM } from '@/features/auth/hooks/useAuthVM'

export function useSimpleAddToCart() {
  const { user, isAuthenticated } = useAuthVM()
  const [addCartItem] = useAddCartItemMutation()
  const [updateCartItem] = useUpdateCartItemMutation()
  const { data: cartItems = [] } = useGetCartQuery(user?.id, { skip: !user?.id })

  const addToCart = async (bookId: number, quantity: number) => {
    console.log("=== DEBUG ADD TO CART ===")
    console.log("User:", user)
    console.log("IsAuthenticated:", isAuthenticated)
    console.log("BookId:", bookId)
    console.log("Quantity:", quantity)

    if (!isAuthenticated || !user) {
      throw new Error("Vui lòng đăng nhập trước khi thêm sản phẩm vào giỏ hàng.")
    }

    try {
      // 🔹 Kiểm tra sản phẩm đã có trong giỏ chưa
      const existingItem = cartItems.find(item => item.bookId === bookId)

      if (existingItem) {
        // Nếu đã có → chỉ cập nhật số lượng
        const newQuantity = existingItem.quantity + quantity
        const result = await updateCartItem({
          id: existingItem.id,
          quantity: newQuantity,
        }).unwrap()

        console.log("✅ Update cart item quantity:", result)
        return result
      } else {
        // Nếu chưa có → thêm mới
        const result = await addCartItem({
          userId: user.id,
          bookId,
          quantity,
        }).unwrap()

        console.log("✅ Add new cart item:", result)
        return result
      }
    } catch (error) {
      console.error("❌ Add to cart error:", error)
      throw error
    }
  }

  return { addToCart }
}
