import { useSimpleAddToCart } from '../hooks/useSimpleAddToCart'

interface AddToCartButtonProps {
  bookId: number
  quantity?: number
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
}

export function AddToCartButton({
  bookId,
  quantity = 1,
  className = '',
  style,
  children = 'Thêm vào giỏ'
}: AddToCartButtonProps) {
  const { addToCart } = useSimpleAddToCart()

  const handleAddToCart = async () => {
    try {
      await addToCart(bookId, quantity)
    } catch (error) {
      // Error đã được handle trong hook
    }
  }

  return (
    <button
      onClick={handleAddToCart}
      style={style}
      className={`
        bg-[#ff424e] text-white px-4 py-2 rounded-lg 
        hover:bg-[#e53935] disabled:opacity-50 disabled:cursor-not-allowed
        transition-colors font-medium
        ${className}
      `}
    >
      {children}
    </button>
  )
}
