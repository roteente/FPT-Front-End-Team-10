import { Link } from 'react-router-dom'
import { Card, Button, ImageWithFallback, Rating } from '@/ui/primitives'
import { formatPrice } from '@/core/utils/format'
import { Book } from '../model/types'

interface BookCardProps {
  book: Book
  onAddToCart: (book: Book) => void
  onQuickView?: (bookId: string) => void
  onWishlist?: (bookId: string) => void
}

export function BookCard({ book, onAddToCart, onQuickView, onWishlist }: BookCardProps) {
  const currentPrice = book.current_seller.price
  const originalPrice = book.original_price || book.list_price
  const discountPercent = originalPrice && currentPrice < originalPrice
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
    : 0

  const imageUrl = book.images && book.images.length > 0 
    ? book.images[0].medium_url || book.images[0].base_url
    : 'https://via.placeholder.com/300x400'

  // Lấy thông tin nhà xuất bản từ specifications
  const publisher = book.specifications?.find(spec => spec.name === "Thông tin chung")
    ?.attributes.find(attr => attr.code === "publisher_vn" || attr.code === "manufacturer")?.value

  return (
    <div className="w-[276px] h-[539px] bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200 overflow-hidden">
      {/* Image Section - Tỷ lệ chính xác theo thiết kế */}
      <div className="relative h-[276px]">
        <Link to={`/books/${book.id}`}>
          <ImageWithFallback
            src={imageUrl}
            alt={book.name}
            className="w-full h-full object-cover rounded-t-lg"
          />
        </Link>
        
        {/* Discount Badge */}
        {discountPercent > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded font-medium">
            -{discountPercent}%
          </div>
        )}
        
        {/* Official Store Badge */}
        {book.current_seller.is_best_store && (
          <div className="absolute top-2 right-2">
            <div className="bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded font-medium flex items-center">
              <span className="mr-0.5">✓</span>
              CHÍNH HÃNG
            </div>
          </div>
        )}
      </div>

      {/* Content Section - 263px height */}
      <div className="p-3 h-[263px] flex flex-col">
        {/* Title - 2 lines max */}
        <Link to={`/books/${book.id}`}>
          <h3 className="text-[13px] leading-4 text-gray-900 line-clamp-2 mb-2 min-h-[32px] hover:text-blue-600">
            {book.name}
          </h3>
        </Link>

        {/* Rating & Sold - Compact */}
        <div className="flex items-center mb-2 text-[11px]">
          <div className="flex items-center">
            <Rating rating={book.rating_average} size="sm" />
            <span className="text-gray-500 ml-1">
              {book.rating_average}
            </span>
          </div>
          {book.quantity_sold && (
            <span className="text-gray-400 ml-2">
              | {book.quantity_sold.text}
            </span>
          )}
        </div>

        {/* Price Section - Prominent */}
        <div className="mb-2">
          <div className="flex items-baseline space-x-1">
            <span className="font-bold text-red-500 text-base">
              {new Intl.NumberFormat('vi-VN').format(currentPrice)}₫
            </span>
            {discountPercent > 0 && (
              <span className="text-[11px] text-gray-400 line-through">
                {new Intl.NumberFormat('vi-VN').format(originalPrice)}₫
              </span>
            )}
          </div>
        </div>

        {/* Short Description - Flexible height */}
        <div className="text-[11px] text-gray-600 line-clamp-3 mb-2 flex-grow leading-4">
          {book.short_description || ''}
        </div>

        {/* Publisher & Shipping - Bottom section */}
        <div className="text-[10px] text-gray-500 mb-2">
          {publisher && <div className="mb-1">📚 {publisher}</div>}
          <div className="text-green-600 font-medium flex items-center">
            <span className="mr-1">🚚</span>
            Giao thứ 3, 01/04
          </div>
        </div>

        {/* Action Area */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
          <div className="text-[10px] text-gray-500 truncate max-w-[120px]">
            {book.current_seller.name}
          </div>
          <Button
            variant="outline"
            size="sm"
            className="text-[10px] px-2 py-1 h-6 border-blue-500 text-blue-600 hover:bg-blue-50 rounded"
            onClick={() => onAddToCart(book)}
          >
            + Giỏ hàng
          </Button>
        </div>
      </div>
    </div>
  )
}
