import React from 'react';
import { Link } from 'react-router-dom';
import { Book } from '../../api/bookApi';

interface SearchResultsProps {
  books: Book[];
  isLoading?: boolean;
  totalResults?: number;
  query?: string;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ 
  books, 
  isLoading, 
  totalResults,
  query 
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
            <div className="aspect-[3/4] bg-gray-200 rounded-md mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">📚</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          Không tìm thấy kết quả
        </h3>
        <p className="text-gray-500 mb-6">
          {query ? `Không có sản phẩm nào phù hợp với "${query}"` : 'Không có sản phẩm nào'}
        </p>
        <div className="text-sm text-gray-600">
          <p>Gợi ý:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Kiểm tra lại từ khóa tìm kiếm</li>
            <li>Thử sử dụng từ khóa khác</li>
            <li>Tìm kiếm theo tên tác giả hoặc thể loại</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results summary */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          {totalResults !== undefined && (
            <span>
              Hiển thị <span className="font-medium">{books.length}</span> trong số{' '}
              <span className="font-medium">{totalResults}</span> kết quả
              {query && (
                <span> cho "<span className="font-medium text-gray-900">{query}</span>"</span>
              )}
            </span>
          )}
        </div>
      </div>

      {/* Results grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map((book) => (
          <Link
            key={book.id}
            to={`/books/${book.id}`}
            className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-all duration-300 group"
          >
            {/* Book image */}
            <div className="aspect-[3/4] mb-4 bg-gray-100 rounded-md overflow-hidden">
              <img
                src={
                  typeof book.images?.[0] === 'string'
                    ? book.images[0]
                    : book.images?.[0]?.base_url || '/public/1980_book.png'
                }
                alt={book.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.currentTarget.src = '/public/1980_book.png';
                }}
              />
            </div>

            {/* Book info */}
            <div className="space-y-3">
              {/* Title */}
              <h3 className="text-sm font-medium text-gray-900 line-clamp-2 leading-tight min-h-[40px]">
                {book.name}
              </h3>

              {/* Author */}
              {book.authors && book.authors.length > 0 && (
                <p className="text-xs text-gray-500 line-clamp-1">
                  {book.authors.map(author => author.name).join(', ')}
                </p>
              )}

              {/* Rating */}
              <div className="flex items-center gap-1">
                <span className="text-orange-500 font-bold text-sm">
                  {book.rating_average || 4.5}
                </span>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-xs ${
                        i < Math.floor(book.rating_average || 4.5)
                          ? 'text-orange-400'
                          : 'text-gray-300'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                {book.quantity_sold?.value && (
                  <span className="text-xs text-gray-400 ml-1">
                    ({book.quantity_sold.value})
                  </span>
                )}
              </div>

              {/* Price */}
              <div className="flex items-center gap-2">
                <span className="text-red-500 font-bold text-base">
                  {formatPrice(book.current_seller?.price || book.list_price || 0)}đ
                </span>
                {book.original_price && book.original_price > (book.current_seller?.price || 0) && (
                  <span className="text-sm text-gray-400 line-through">
                    {formatPrice(book.original_price)}đ
                  </span>
                )}
              </div>

              {/* Discount badge */}
              {book.original_price && book.original_price > (book.current_seller?.price || 0) && (
                <div className="flex items-center">
                  <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                    -{Math.round(((book.original_price - (book.current_seller?.price || 0)) / book.original_price) * 100)}%
                  </span>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
