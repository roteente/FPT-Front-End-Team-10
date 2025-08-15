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
      className="bg-white border border-gray-200 relative shadow-sm p-4 "
      style={{
        width: '100%',
        borderRadius: '8px',
        opacity: 1
      }}
    >
      {/* Tiki Trading Header */}
      <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
        {/* Logo */}
        <div className="w-10 h-10 flex-shrink-0">
          <img
            src="/tiki-logo.svg"
            alt="Tiki"
            className="w-full h-full object-contain"
            onError={(e) => {
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

        {/* Tên + Official */}
        <div className="flex flex-col">
          <span className="text-gray-900 font-medium text-base">Tiki Trading</span>
          <div className="flex items-center gap-2 mt-1">
            <img
              src="/body/official.svg"
              alt="Official"
              className="h-5 object-contain"
              onError={(e) => {
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
      </div>

      {/* Quantity Selector */}
      <div className=" py-4 space-y-4">
        {/* Số lượng */}
        <div>
          <div className="text-sm text-gray-700 mb-2 font-bold">Số lượng</div>
          <div className="flex items-center gap-2">
            {/* Nút giảm */}
            <button
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              className={`w-8 h-8 flex items-center justify-center rounded-md bg-white text-base font-medium transition
                ${quantity <= 1
                  ? 'border border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50'
                  : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
            >
              −
            </button>

            {/* Hiển thị số lượng */}
            <div className="h-8 px-2 py-1 min-w-[40px] text-center border border-gray-300 rounded-md font-medium">
              {quantity}
            </div>

            {/* Nút tăng */}
            <button
              onClick={() => handleQuantityChange(1)}
              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md bg-white text-base text-gray-600 font-medium hover:bg-gray-50 transition"
            >
              +
            </button>
          </div>
        </div>

        {/* Tạm tính */}
        <div>
          <div className="text-sm text-gray-700 mb-2 font-bold">Tạm tính</div>
          <div className="text-2xl font-bold">
            {book.list_price != null
              ? (book.list_price * quantity).toLocaleString("vi-VN") + "₫"
              : null}
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className=" space-y-2">
        {/* Buy Now Button */}
        <button
          onClick={handleBuyNow}
          className="w-full bg-red-500 hover:bg-red-600 text-white transition-colors flex items-center justify-center shadow-sm"
          style={{
            height: '48px',
            borderRadius: '8px'
          }}
        >
          Mua ngay
        </button>

        <AddToCartButton
          bookId={typeof book.id === 'string' ? parseInt(book.id) : Number(book.id)}
          quantity={quantity}
          className="w-full bg-white hover:bg-blue-50 border-1 transition-colors flex items-center justify-center"
          style={{
            height: '48px',
            borderRadius: '8px',
            borderColor: 'rgba(10, 104, 255, 1)',
            color: 'rgba(10, 104, 255, 1)'
          }}
        >
          Thêm vào giỏ
        </AddToCartButton>

        {/* Buy Later Pay Later Button */}
        <button
          onClick={handleBuyLater}
          className="w-full bg-white hover:bg-blue-50 text-blue-600 border-1 transition-colors flex items-center justify-center"
          style={{
            height: '48px',
            borderRadius: '8px',
            borderColor: 'rgba(10, 104, 255, 1)',
            color: 'rgba(10, 104, 255, 1)'
          }}
        >
          Mua trước trả sau
        </button>
      </div>
    </div>
  );
};

export default DetailRightPurchase;
