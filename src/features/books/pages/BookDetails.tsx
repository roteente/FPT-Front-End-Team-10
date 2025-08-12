import { useParams, Link } from 'react-router-dom'
import { useGetBookByIdQuery } from '../api/bookApi'
import { useBookCard } from '../hooks/useBookCard'
import { BookDetailsUI } from '../ui/BookDetailsUI'

export default function BookDetails() {
  const { id } = useParams<{ id: string }>()
  const { data: book, isLoading, error } = useGetBookByIdQuery(id!)
  const { addToCart } = useBookCard()
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    )
  }

  if (error || !book) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Không tìm thấy sách</h1>
          <Link to="/" className="text-blue-600 hover:underline">
            Về trang chủ
          </Link>
        </div>
      </div>
    )
  }

  return <BookDetailsUI book={book} onAddToCart={addToCart} />
}
