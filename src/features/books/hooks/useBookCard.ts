import { useAppDispatch } from '@/app/hooks'
import { addToCart } from '@/features/cart/model/cartSlice'
import { Book } from '../api/bookApi'

export function useBookCard() {
  const dispatch = useAppDispatch()

  const handleAddToCart = (book: Book) => {
    const imageUrl = book.images && book.images.length > 0 
      ? book.images[0].medium_url || book.images[0].base_url
      : 'https://via.placeholder.com/300x400'
    
    dispatch(addToCart({
      id: book.id,
      title: book.name,
      price: book.current_seller?.price || 0,
      image: imageUrl,
      quantity: 1,
    }))
  }

  const handleQuickView = (bookId: string) => {
    // Logic để mở quick view modal
    console.log('Quick view for book:', bookId)
  }

  const handleWishlist = (bookId: string) => {
    // Logic để thêm vào wishlist
    console.log('Add to wishlist:', bookId)
  }

  return {
    addToCart: handleAddToCart,
    quickView: handleQuickView,
    addToWishlist: handleWishlist,
  }
}
