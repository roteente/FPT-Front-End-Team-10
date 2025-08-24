import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Book } from '../../api/bookApi';
import { useNavigate } from "react-router-dom";

interface RelatedProductsProps {
  products: Book[];
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ products }) => {
  const navigate = useNavigate();
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  const handleProductClick = (productId: string | number) => {
    navigate(`/books/${productId}`);
  };

  return (
    <div className="grid grid-cols-4 gap-3">
      {products.slice(0, 8).map((product) => (
        <div 
          key={product.id}
          className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-lg transition-all cursor-pointer group"
          onClick={() => handleProductClick(product.id)}
        >
          <div className="aspect-[3/4] mb-3 bg-gray-100 rounded-md overflow-hidden">
            <img 
              src={
                typeof product.images?.[0] === 'string' 
                  ? product.images[0] 
                  : product.images?.[0]?.base_url || '/public/1980_book.png'
              }
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.currentTarget.src = '/public/1980_book.png';
              }}
            />
          </div>
          
          <h4 className="text-xs font-medium text-gray-900 mb-2 line-clamp-2 leading-tight" style={{ minHeight: '32px' }}>
            {product.name}
          </h4>
          
          <div className="flex items-center gap-1 mb-2">
            <span className="text-orange-500 font-bold text-xs">
              {product.rating_average || 4.5}
            </span>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <span 
                  key={i} 
                  className={`text-xs ${
                    i < Math.floor(product.rating_average || 4.5) 
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
            {formatPrice(product.current_seller?.price || product.list_price || 50000)}đ
          </div>
        </div>
      ))}
    </div>
  );
};

export default RelatedProducts;
