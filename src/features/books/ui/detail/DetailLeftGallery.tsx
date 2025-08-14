import React, { useState } from 'react';
import type { Book } from '../../api/bookApi';
import { getBookThumbnail } from '../../utils/imageUtils';

interface DetailLeftGalleryProps {
  book: Book;
}

const DetailLeftGallery: React.FC<DetailLeftGalleryProps> = ({ book }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  // Lấy danh sách ảnh từ book
  const getBookImages = (): string[] => {
    const images: string[] = [];
    
    // Thêm ảnh từ images array
    if (book.images && book.images.length > 0) {
      book.images.forEach(image => {
        if (typeof image === 'string') {
          images.push(image);
        } else if (typeof image === 'object' && image !== null) {
          const imageUrl = image.large_url || image.medium_url || image.base_url || image.thumbnail_url;
          if (imageUrl) {
            images.push(imageUrl);
          }
        }
      });
    }
    
    // Nếu không có ảnh nào, dùng thumbnail fallback
    if (images.length === 0) {
      images.push(getBookThumbnail(book));
    }
    
    // Để demo, thêm vài ảnh mẫu nếu chỉ có 1 ảnh
    if (images.length === 1) {
      const baseImage = images[0];
      images.push(
        baseImage.replace('?random=', '?random=alt1_'),
        baseImage.replace('?random=', '?random=alt2_'),
        baseImage.replace('?random=', '?random=alt3_')
      );
    }
    
    return images;
  };

  const bookImages = getBookImages();
  const selectedImage = bookImages[selectedImageIndex];

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
    setImageLoading(true);
    setImageError(false);
  };

  return (
    <div 
      className="flex flex-col"
      style={{
        width: '400px',
        height: '513px',
        borderRadius: '8px',
        opacity: 1,
        top: '40px',
        left: '24px'
      }}
    >
      {/* Ảnh chính */}
      <div 
        className="relative flex-1 mb-4 rounded-lg overflow-hidden border border-gray-200 bg-white cursor-zoom-in"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
      >
        {imageLoading && (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        {imageError ? (
          <div className="w-full h-full bg-gray-50 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <div className="text-6xl mb-4">📖</div>
              <p className="text-sm">Không thể tải ảnh</p>
            </div>
          </div>
        ) : (
          <img
            src={selectedImage}
            alt={book.name}
            className={`w-full h-full object-contain transition-all duration-500 ${
              imageLoading ? 'opacity-0' : 'opacity-100'
            } ${isZoomed ? 'scale-110' : 'scale-100'}`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )}
        
        {/* Badge giảm giá (nếu có) */}
        {book.original_price && book.current_seller?.price && book.current_seller.price < book.original_price && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium z-20">
            -{Math.round(((book.original_price - book.current_seller.price) / book.original_price) * 100)}%
          </div>
        )}
        
        {/* Zoom indicator */}
        {!imageLoading && !imageError && (
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            🔍 Hover để phóng to
          </div>
        )}
      </div>

      {/* Thumbnail gallery */}
      {bookImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {bookImages.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`
                flex-shrink-0 w-16 h-16 rounded border-2 overflow-hidden transition-all duration-200 hover:shadow-md
                ${selectedImageIndex === index 
                  ? 'border-blue-500 shadow-md ring-2 ring-blue-200' 
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
            >
              <img
                src={image}
                alt={`${book.name} - ảnh ${index + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                onError={(e) => {
                  e.currentTarget.src = `https://picsum.photos/64/64?random=${book.id}_thumb_${index}`;
                }}
              />
            </button>
          ))}
        </div>
      )}

      {/* Image counter */}
      <div className="mt-2 text-center text-sm text-gray-500">
        <span className="inline-flex items-center gap-2">
          <span>{selectedImageIndex + 1} / {bookImages.length}</span>
          {bookImages.length > 1 && (
            <span className="text-xs text-gray-400">• Click thumbnail để xem</span>
          )}
        </span>
      </div>
    </div>
  );
};

export default DetailLeftGallery;
