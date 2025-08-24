import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Book } from '../../api/bookApi';

interface HotDealsProps {
  deals: Book[];
}

const HotDeals: React.FC<HotDealsProps> = ({ deals }) => {
  const navigate = useNavigate();
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  const handleDealClick = (dealId: string | number) => {
    navigate(`/books/${dealId}`);
  };

  return (
    <div className="grid grid-cols-4 gap-3">
      {deals.slice(0, 4).map((deal) => (
        <div 
          key={deal.id}
          className="bg-white border border-red-200 rounded-lg p-3 hover:shadow-lg transition-all cursor-pointer group relative"
          onClick={() => handleDealClick(deal.id)}
        >
          {/* Hot Deal Badge */}
          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full z-10">
            HOT
          </div>
          
          <div className="aspect-[3/4] mb-3 bg-gray-100 rounded-md overflow-hidden">
            <img 
              src={
                typeof deal.images?.[0] === 'string' 
                  ? deal.images[0] 
                  : deal.images?.[0]?.base_url || '/public/1980_book.png'
              }
              alt={deal.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.currentTarget.src = '/public/1980_book.png';
              }}
            />
          </div>
          
          <h4 className="text-xs font-medium text-gray-900 mb-2 line-clamp-2 leading-tight" style={{ minHeight: '32px' }}>
            {deal.name}
          </h4>
          
          <div className="flex items-center gap-1 mb-2">
            <span className="text-orange-500 font-bold text-xs">
              {deal.rating_average || 4.5}
            </span>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <span 
                  key={i} 
                  className={`text-xs ${
                    i < Math.floor(deal.rating_average || 4.5) 
                      ? 'text-orange-400' 
                      : 'text-gray-300'
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          
          <div className="text-red-500 font-bold text-sm">
            {formatPrice(deal.current_seller?.price || deal.list_price || 50000)}đ
          </div>
        </div>
      ))}
    </div>
  );
};

export default HotDeals;
