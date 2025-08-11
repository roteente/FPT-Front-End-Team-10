import { BookCard } from '../ui/BookCard'
import { useBookCard } from '../hooks/useBookCard'
import { Book } from '../model/types'

interface BookCardContainerProps {
  book: Book
}

export function BookCardContainer({ book }: BookCardContainerProps) {
  const { addToCart, quickView, addToWishlist } = useBookCard()

  return (
    <BookCard
      book={book}
      onAddToCart={addToCart}
      onQuickView={quickView}
      onWishlist={addToWishlist}
    />
  )
}
