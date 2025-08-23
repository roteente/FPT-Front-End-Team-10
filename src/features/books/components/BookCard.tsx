import React from 'react';
import { Book } from '../api/bookApi';

interface BookCardProps {
  book: Book;
  className?: string;
  onBookClick?: (book: Book) => void;
}

export const BookCard: React.FC<BookCardProps> = ({ book, className = "", onBookClick }) => {
  const handleClick = () => {
    if (onBookClick) {
      onBookClick(book);
    }
  };

  // Helper để lấy URL ảnh an toàn
  const getImageUrl = (book: Book): string => {
    // Thử các nguồn ảnh khác nhau
    if (book.images && book.images.length > 0) {
      const image = book.images[0];
      if (typeof image === 'string') {
        return image;
      }
      return image.medium_url || image.small_url || image.base_url || image.thumbnail_url || '/placeholder-book.jpg';
    }
    
    return book.book_cover || book.thumbnail || '/placeholder-book.jpg';
  };

  // Helper để tính discount
  const getDiscount = (book: Book): number => {
    if (book.original_price && book.current_seller?.price) {
      return Math.round(((book.original_price - book.current_seller.price) / book.original_price) * 100);
    }
    return 0;
  };

  const discount = getDiscount(book);
  const imageUrl = getImageUrl(book);
  const authorName = book.authors && book.authors.length > 0 ? book.authors[0].name : 'Chưa có thông tin tác giả';

  return (
    <div 
      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer ${className}`}
      onClick={handleClick}
    >
      <div className="aspect-[3/4] mb-3 relative">
        <img
          src={imageUrl}
          alt={book.name}
          className="w-full h-full object-cover rounded-md"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder-book.jpg';
          }}
        />
        {discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            -{discount}%
          </div>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="font-medium text-gray-900 line-clamp-2 text-sm leading-5">
          {book.name}
        </h3>
        
        <p className="text-xs text-gray-600 line-clamp-1">
          {authorName}
        </p>

        <div className="flex items-center gap-1">
          {book.rating_average && book.rating_average > 0 && (
            <>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-3 h-3 ${i < Math.floor(book.rating_average || 0) ? 'fill-current' : 'text-gray-300'}`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-gray-500">({book.rating_average.toFixed(1)})</span>
            </>
          )}
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-red-600 font-semibold text-sm">
              {book.current_seller?.price ? `${book.current_seller.price.toLocaleString('vi-VN')}đ` : 'Liên hệ'}
            </span>
            {book.original_price && book.original_price > (book.current_seller?.price || 0) && (
              <span className="text-gray-400 line-through text-xs">
                {book.original_price.toLocaleString('vi-VN')}đ
              </span>
            )}
          </div>
          
          {book.quantity_sold && book.quantity_sold.text && (
            <p className="text-xs text-gray-500">
              {book.quantity_sold.text}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
