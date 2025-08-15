import React, { useState } from 'react';
import { AddToCartButton } from '@/features/cart';
import type { Book } from '../../api/bookApi';

interface DetailRightPurchaseProps {
  book: Book;
}

const DetailRightPurchase: React.FC<DetailRightPurchaseProps> = ({ book }) => {
  const [quantity, setQuantity] = useState(1);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const handleBuyNow = () => {
    console.log('Buy now:', { book: book.id, quantity });
    // TODO: Implement buy now logic
  };

  const handleBuyLater = () => {
    console.log('Buy later pay later:', { book: book.id, quantity });
    // TODO: Implement buy later pay later logic
  };

  return (
    <div 
      className="bg-white border border-gray-200 relative shadow-sm"
      style={{
        width: '100%',
        height: '450px',
        borderRadius: '8px',
        opacity: 1
      }}
    >
      {/* Tiki Trading Header */}
      <div className="relative px-4 py-5 border-b border-gray-100">
        {/* Tiki Logo */}
        <div 
          className="absolute"
          style={{
            width: '40px',
            height: '40px',
            top: '20px',
            left: '16px'
          }}
        >
          <img 
            src="/tiki-logo.svg" 
            alt="Tiki"
            className="w-full h-full object-contain"
            onError={(e) => {
              // Fallback to text if logo not found
              e.currentTarget.style.display = 'none';
              const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
              if (nextElement) {
                nextElement.style.display = 'flex';
              }
            }}
          />
          <div 
            className="w-full h-full bg-blue-500 text-white text-xs font-bold rounded flex items-center justify-center"
            style={{ display: 'none' }}
          >
            TIKI
          </div>
        </div>

        {/* Tiki Trading Title */}
        <div 
          className="absolute text-gray-900 font-medium text-base"
          style={{
            top: '16px',
            left: '68px'
          }}
        >
          Tiki Trading
        </div>

        {/* Official Icon */}
        <div 
          className="absolute"
          style={{
            top: '40px',
            left: '68px'
          }}
        >
          <img 
            src="/body/official.svg" 
            alt="Official"
            className="h-5 object-contain"
            onError={(e) => {
              // Fallback to text badge
              e.currentTarget.style.display = 'none';
              const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
              if (nextElement) {
                nextElement.style.display = 'inline-flex';
              }
            }}
          />
          <span 
            className="inline-flex items-center px-2 py-1 bg-green-100 text-green-600 text-xs font-medium rounded border border-green-300"
            style={{ display: 'none' }}
          >
            OFFICIAL
          </span>
        </div>
      </div>

      {/* Price Section */}
      <div className="px-4 pt-5 pb-4">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl font-bold text-red-500">
            {formatPrice(book.current_seller?.price || 0)}đ
          </span>
          {book.original_price && book.original_price > (book.current_seller?.price || 0) && (
            <>
              <span className="text-base text-gray-400 line-through">
                {formatPrice(book.original_price)}đ
              </span>
              <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded font-medium">
                -{Math.round(((book.original_price - (book.current_seller?.price || 0)) / book.original_price) * 100)}%
              </span>
            </>
          )}
        </div>
        <div className="text-sm text-gray-600">
          {book.quantity_sold?.text || 'Đã bán 1000+'}
        </div>
      </div>

      {/* Quantity Selector */}
      <div className="px-4 pb-6">
        <div className="text-sm text-gray-700 mb-4 font-medium">Số lượng</div>
        <div className="flex items-center gap-4">
          {/* Decrease Button */}
          <button
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
            className="border bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed flex items-center justify-center text-gray-600 font-medium transition-colors"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '6px',
              borderColor: '#E5E7EB'
            }}
          >
            −
          </button>

          {/* Quantity Display */}
          <div className="px-4 py-2 border border-gray-300 rounded-md min-w-[70px] text-center font-medium bg-gray-50">
            {quantity}
          </div>

          {/* Increase Button */}
          <button
            onClick={() => handleQuantityChange(1)}
            className="border bg-white hover:bg-gray-50 flex items-center justify-center text-gray-600 font-medium transition-colors"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '6px',
              borderColor: '#E5E7EB'
            }}
          >
            +
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 space-y-4">
        {/* Buy Now Button */}
        <button
          onClick={handleBuyNow}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold transition-colors flex items-center justify-center shadow-sm"
          style={{
            height: '48px',
            borderRadius: '8px'
          }}
        >
          Mua ngay
        </button>

        {/* Add to Cart Button */}
        <AddToCartButton
          bookId={typeof book.id === 'string' ? parseInt(book.id) : Number(book.id)}
          quantity={quantity}
          className="w-full bg-white hover:bg-blue-50 text-blue-600 font-semibold border-2 transition-colors flex items-center justify-center"
          style={{
            height: '48px',
            borderRadius: '8px',
            borderColor: '#0A68FF'
          }}
        >
          Thêm vào giỏ hàng
        </AddToCartButton>

        {/* Buy Later Pay Later Button */}
        <button
          onClick={handleBuyLater}
          className="w-full bg-white hover:bg-blue-50 text-blue-600 font-semibold border-2 transition-colors flex items-center justify-center"
          style={{
            height: '48px',
            borderRadius: '8px',
            borderColor: '#0A68FF'
          }}
        >
          Mua trước trả sau
        </button>
      </div>
    </div>
  );
};

export default DetailRightPurchase;
