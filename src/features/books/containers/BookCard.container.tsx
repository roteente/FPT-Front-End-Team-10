import BookCard from '../ui/BookCard'
import { Book } from '../api/bookApi'

interface BookCardContainerProps {
  book: Book
}

export function BookCardContainer({ book }: BookCardContainerProps) {
  return <BookCard book={book} />
}
