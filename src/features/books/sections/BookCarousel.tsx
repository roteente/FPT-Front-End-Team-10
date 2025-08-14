import * as React from "react";
import { Link } from "react-router-dom";
import { Book } from "../api/bookApi";

interface BookCarouselProps {
  books: Book[];
  title?: string;
}

const BookCarousel: React.FC<BookCarouselProps> = ({ books, title }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  const calculateDiscount = (originalPrice: number, currentPrice: number) => {
    if (!originalPrice || originalPrice <= currentPrice) return 0;
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  };

  const getBookImage = (book: Book) => {
    if (!book.images || !book.images.length) {
      return `https://picsum.photos/180/180?random=${book.id}`;
    }

    const image = book.images[0];
    if (typeof image === "string") {
      return image;
    }

    return (
      image.thumbnail_url ||
      image.small_url ||
      image.medium_url ||
      image.base_url ||
      `https://picsum.photos/180/180?random=${book.id}`
    );
  };

  const formatQuantitySold = (book: Book) => {
    return book.quantity_sold?.text || `Đã bán ${book.quantity_sold?.value || 0}`;
  };

  const getAuthorName = (book: Book) => {
    if (!book.authors || !book.authors.length) return "";
    return book.authors[0].name || "";
  };

  // Lấy sách có giá giảm nhiều nhất
  const displayBooks = React.useMemo(() => {
    return [...books]
      .filter(book => book.original_price && book.current_seller?.price)
      .sort((a, b) => {
        const discountA = calculateDiscount(a.original_price || 0, a.current_seller?.price || 0);
        const discountB = calculateDiscount(b.original_price || 0, b.current_seller?.price || 0);
        return discountB - discountA;
      })
      .slice(0, 4);
  }, [books]);

  return (
    <div className="bg-white rounded-[8px] border border-[#EBEBF0] p-4">
      {title && (
        <div className="mb-4">
          <h2 className="text-[18px] font-medium text-[#333333]">{title}</h2>
        </div>
      )}
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {displayBooks.map((book) => {
          const discount = calculateDiscount(
            book.original_price || 0,
            book.current_seller?.price || 0
          );
          
          return (
            <Link 
              key={book.id}
              to={`/books/${book.id}`} 
              className="group block"
            >
              <div className="relative">
                {/* Badge "NOW" */}
                <div className="absolute top-2 left-0">
                  <div className="bg-red-600 text-white text-xs px-2 py-1 rounded-r-sm font-bold">
                    NOW
                  </div>
                </div>

                <div className="relative pt-[100%] bg-gray-50 mb-2 rounded-md overflow-hidden">
                  <img
                    src={getBookImage(book)}
                    alt={book.name}
                    className="absolute inset-0 w-full h-full object-contain"
                    loading="lazy"
                  />
                  
                  {discount > 0 && (
                    <div className="absolute top-0 right-0 bg-red-600 text-white text-xs px-1.5 py-0.5 font-medium">
                      -{discount}%
                    </div>
                  )}
                </div>
                
                <div className="space-y-1">
                  <h3 className="text-sm text-[#333333] line-clamp-2 h-[40px] group-hover:text-[#0B74E5]">
                    {book.name}
                  </h3>
                  
                  <div className="text-xs text-[#808089]">
                    {getAuthorName(book)}
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <span className="text-[#FF424E] font-medium">
                      {formatPrice(book.current_seller?.price || 0)}đ
                    </span>
                    {discount > 0 && (
                      <span className="text-[#808089] text-xs line-through ml-2">
                        {formatPrice(book.original_price || 0)}đ
                      </span>
                    )}
                  </div>
                  
                  <div className="text-xs text-[#808089]">
                    {formatQuantitySold(book)}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}

        {displayBooks.length === 0 && (
          <div className="col-span-4 text-center py-8 text-gray-500">
            Không tìm thấy sách nổi bật
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCarousel;
