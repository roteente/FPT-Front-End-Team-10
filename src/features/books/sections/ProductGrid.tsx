import { BookCardContainer } from '../containers/BookCard.container'
import { ProductGridSkeleton } from '@/ui/primitives'
import { Book } from '../model/types'

interface ProductGridProps {
  books: Book[]
  isLoading?: boolean
  className?: string
}

export function ProductGrid({ books, isLoading, className }: ProductGridProps) {
  if (isLoading) {
    return <ProductGridSkeleton />
  }

  if (!books.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Không tìm thấy sách nào</p>
      </div>
    )
  }

  return (
    <div className={`grid grid-cols-4 gap-4 max-w-[1136px] mx-auto ${className || ''}`}>
      {books.slice(0, 12).map((book) => (
        <BookCardContainer key={book.id} book={book} />
      ))}
    </div>
  )
}
