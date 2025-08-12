import * as React from "react";
import { useNavigate } from "react-router-dom";
import { ImageWithFallback } from "@/ui/primitives";
import type { Book } from "../api/bookApi";
import { getBookThumbnail, getImageFallbackChain } from "../utils/imageUtils";

export default function BookCard({ book }: { book: Book }) {
  const navigate = useNavigate();
  const [imageLoading, setImageLoading] = React.useState(true);
  const [imageError, setImageError] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);

  // Intersection Observer cho lazy loading
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px' // Load ảnh trước khi card vào viewport 50px
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);
  
  const title = book.name ?? (book as any).title ?? "Sản phẩm";
  const price = book.current_seller?.price;
  const originalPrice = book.original_price || book.list_price;
  
  // Lấy thumbnail URL và fallback chain
  const thumb = React.useMemo(() => getBookThumbnail(book), [book]);
  const fallbackChain = React.useMemo(() => getImageFallbackChain(book, title), [book, title]);
  const [fallbackIndex, setFallbackIndex] = React.useState(-1);

  // Debug: Log image URL (có thể bỏ sau)
  // React.useEffect(() => {
  //   if (book.id === 1) { // Chỉ log cho book đầu tiên
  //     console.log(`Book ${book.id} - ${book.name}:`);
  //     console.log('Raw book data:', book);
  //     console.log('Images array:', book.images);
  //     console.log('Book cover:', (book as any).book_cover);
  //     console.log('Thumbnail:', (book as any).thumbnail);
  //     console.log('Selected thumb URL:', thumb);
  //     console.log('Fallback chain:', fallbackChain);
  //   }
  // }, [book, thumb, fallbackChain]);

  // Tính % giảm giá
  const discountPercent = originalPrice && price && price < originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const handleClick = () => {
    navigate(`/books/${book.id}`);
  };

  return (
    <div 
      ref={cardRef}
      className="w-full h-full rounded-lg border border-gray-200 bg-white overflow-hidden flex flex-col cursor-pointer hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 hover:border-blue-300 hover:-translate-y-1 min-h-[480px] group"
      onClick={handleClick}
    >
      {/* Ảnh với badge giảm giá */}
      <div className="relative overflow-hidden bg-white group">
        <div className="aspect-[3/4] bg-gray-50 relative overflow-hidden">
          {/* Loading skeleton */}
          {imageLoading && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>
          )}
          
          {/* Chỉ load ảnh khi card visible */}
          {isVisible ? (
            <img 
              src={fallbackIndex >= 0 ? fallbackChain[fallbackIndex] : thumb} 
              alt={title} 
              className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
                imageLoading ? 'opacity-0' : 'opacity-100'
              }`}
              decoding="async"
              onLoad={() => {
                setImageLoading(false);
                setImageError(false);
              }}
              onError={(e) => {
                setImageLoading(false);
                const nextIndex = fallbackIndex + 1;
                if (nextIndex < fallbackChain.length) {
                  setFallbackIndex(nextIndex);
                  e.currentTarget.src = fallbackChain[nextIndex];
                } else {
                  setImageError(true);
                }
              }}
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <div className="text-gray-400 text-2xl">📚</div>
            </div>
          )}
          
          {/* Error state */}
          {imageError && !imageLoading && (
            <div className="absolute inset-0 bg-gray-50 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <div className="text-3xl mb-2">📖</div>
                <div className="text-xs">Không có ảnh</div>
              </div>
            </div>
          )}
        </div>

        {/* Discount badge - góc trên trái */}
        {discountPercent > 0 && (
          <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-br-lg shadow-md z-10">
            -{discountPercent}%
          </div>
        )}
        
        {/* TOP DEAL và FREESHIP badges - góc trên phải */}
        <div className="absolute top-2 right-2 flex flex-col gap-1 z-10">
          <div className="bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm">
            TOP DEAL
          </div>
          <div className="bg-blue-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm">
            FREESHIP
          </div>
        </div>
      </div>

      {/* Nội dung */}
      <div className="p-3 flex-1 flex flex-col">
        {/* Tiêu đề sách */}
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 leading-5 hover:text-blue-600 transition-colors mb-2 min-h-[2.5rem]">
          {title}
        </h3>
        
        {/* Tác giả */}
        <div className="mb-3">
          {book.authors && book.authors.length > 0 ? (
            <p className="text-xs text-gray-600">
              Tác giả: <span className="font-medium text-gray-800">{book.authors[0].name}</span>
            </p>
          ) : (
            <div className="h-4"></div>
          )}
        </div>

        {/* Rating và đã bán */}
        <div className="flex items-center justify-between mb-3">
          {book.rating_average ? (
            <div className="flex items-center gap-1">
              <div className="flex text-yellow-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-sm">
                    {star <= Math.floor(book.rating_average || 0) ? "★" : "☆"}
                  </span>
                ))}
              </div>
              <span className="text-xs text-gray-500 ml-1">
                ({book.rating_average})
              </span>
            </div>
          ) : (
            <div className="flex text-gray-300">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="text-sm">☆</span>
              ))}
            </div>
          )}
          
          {book.quantity_sold && (
            <span className="text-xs text-gray-500">
              Đã bán {book.quantity_sold.text}
            </span>
          )}
        </div>

        {/* Spacer */}
        <div className="flex-1"></div>

        {/* Giá cả */}
        <div className="mt-auto">
          {typeof price === "number" ? (
            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-red-500 font-bold text-lg">
                  {price.toLocaleString()}₫
                </span>
                {originalPrice && originalPrice > price && (
                  <span className="text-gray-400 text-sm line-through">
                    {originalPrice.toLocaleString()}₫
                  </span>
                )}
              </div>
              
              {/* Thông tin giao hàng */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  Giao thứ 3, 01/04
                </span>
                {/* Icon giao hàng nhanh */}
                <div className="flex items-center text-xs text-green-600">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
                    <path d="M3 4a1 1 0 00-1 1v1a1 1 0 001 1h1.05l.5 2H3a1 1 0 000 2h2.05l.5 2H5a1 1 0 000 2h1.05l.5 2H3a1 1 0 00-1 1v1a1 1 0 001 1h14a1 1 0 001-1v-1a1 1 0 00-1-1h-3.05l-.5-2H15a1 1 0 000-2h-2.05l-.5-2H15a1 1 0 000-2h-2.05l-.5-2H15a1 1 0 001-1V5a1 1 0 00-1-1H3z"/>
                  </svg>
                  Nhanh
                </div>
              </div>
            </div>
          ) : (
            <div className="text-gray-400 text-sm">Liên hệ</div>
          )}
        </div>
      </div>
    </div>
  );
}
