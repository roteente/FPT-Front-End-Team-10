import { useNavigate } from 'react-router-dom'
import { useCartTotalsRTK } from '../hooks/useCartTotalsRTK'
import { useCartWithBookDetails } from '../hooks/useCartWithBookDetails'
import { useAuthVM } from '@/features/auth/hooks/useAuthVM'
import { CartSummaryUI } from '../ui/CartSummaryUI'

interface CartSummaryContainerProps {
  selectedItemsCount: number
  selectedItems?: number[]
}

export function CartSummaryContainer({ selectedItemsCount, selectedItems = [] }: CartSummaryContainerProps) {
  const navigate = useNavigate()
  const { user } = useAuthVM()
  const { cartItems } = useCartWithBookDetails()
  const { subtotal, total, voucherDiscount, shippingCost } = useCartTotalsRTK(selectedItems)

  const handleCheckout = () => {
    console.log('CartSummaryContainer - handleCheckout called')
    console.log('Selected items count:', selectedItemsCount)
    console.log('Selected items IDs:', selectedItems)
    
    // Check if user is logged in
    if (!user) {
      navigate('/login', { 
        state: { 
          from: '/cart',
          message: 'Vui lòng đăng nhập để tiếp tục thanh toán'
        }
      })
      return
    }

    // Check if any items are selected
    if (selectedItemsCount === 0) {
      alert('Vui lòng chọn sản phẩm để thanh toán')
      return
    }

    // Get selected cart items for checkout
    const selectedCartItems = cartItems?.filter(item => 
      selectedItems.includes(item.id)
    ) || []

    console.log('Selected cart items for checkout:', selectedCartItems)

    // Store selected items in sessionStorage for checkout page
    if (selectedCartItems.length > 0) {
      sessionStorage.setItem('selectedCartItems', JSON.stringify(selectedCartItems))
    }

    // Navigate to checkout
    navigate('/checkout')
  }

  return (
    <CartSummaryUI
      subtotal={subtotal}
      shippingCost={shippingCost}
      voucherDiscount={voucherDiscount}
      total={total}
      selectedItemsCount={selectedItemsCount}
      onCheckout={handleCheckout}
    />
  )
}
