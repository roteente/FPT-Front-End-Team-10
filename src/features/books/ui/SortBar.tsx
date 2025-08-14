import * as React from 'react';
import { cn } from '@/core/utils/cn';
import { Select } from '@/ui/primitives';

interface SortBarProps {
  currentSort: string;
  currentOrder: string;
  onSortChange: (sort: string, order: string) => void;
  totalResults?: number;
  filters?: {
    fastDelivery: boolean;
    deal: boolean;
    freeShip: boolean;
    rating: boolean;
  };
  onFilterChange?: (filters: {
    fastDelivery: boolean;
    deal: boolean;
    freeShip: boolean;
    rating: boolean;
  }) => void;
}

export default function SortBar({ 
  currentSort, 
  currentOrder, 
  onSortChange, 
  totalResults,
  filters: externalFilters,
  onFilterChange
}: SortBarProps) {
  const [internalFilters, setInternalFilters] = React.useState({
    fastDelivery: false,
    deal: false,
    freeShip: false,
    rating: false
  });
  
  // Sử dụng filters từ props nếu được cung cấp, nếu không thì dùng state nội bộ
  const filters = externalFilters || internalFilters;

  const sortOptions = [
    { value: 'popularity_desc', label: 'Phổ biến' },
    { value: 'newest_desc', label: 'Hàng mới' },
    { value: 'price_asc', label: 'Giá thấp đến cao' },
    { value: 'price_desc', label: 'Giá cao đến thấp' },
  ];

  const handleSortChange = (value: string) => {
    const [sort, order] = value.split('_');
    onSortChange(sort, order);
  };

  const currentValue = `${currentSort}_${currentOrder}`;

  const handleFilterChange = (filter: keyof typeof filters) => {
    const newFilters = {
      ...filters,
      [filter]: !filters[filter]
    };
    
    if (onFilterChange) {
      // Nếu có hàm callback từ bên ngoài thì gọi nó
      onFilterChange(newFilters);
    } else {
      // Nếu không thì cập nhật state nội bộ
      setInternalFilters(newFilters);
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-[16px] text-[#27272A] font-medium">
        Tất cả sản phẩm
      </div>
      
      <div className="flex flex-wrap gap-2 items-center">
        {/* Fast Delivery Checkbox */}
        <label className="flex items-center bg-white border border-[#EEEEEE] rounded-sm px-3 py-2 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 mr-2 accent-[#FF424E]"
            checked={filters.fastDelivery}
            onChange={() => handleFilterChange('fastDelivery')}
          />
          <span className="flex items-center">
            <img src="/sortbar/now.png" alt="Now" className="h-4 mr-1" />
            <span className="text-sm">Giao siêu tốc 2H</span>
          </span>
        </label>
        
        {/* Top Deal Checkbox */}
        <label className="flex items-center bg-white border border-[#EEEEEE] rounded-sm px-3 py-2 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 mr-2 accent-[#FF424E]"
            checked={filters.deal}
            onChange={() => handleFilterChange('deal')}
          />
          <span className="flex items-center">
            <img src="/sortbar/topdeal.png" alt="Top Deal" className="h-4 mr-1" />
            <span className="text-sm">Siêu rẻ</span>
          </span>
        </label>
        
        {/* Free Shipping Checkbox */}
        <label className="flex items-center bg-white border border-[#EEEEEE] rounded-sm px-3 py-2 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 mr-2 accent-[#FF424E]"
            checked={filters.freeShip}
            onChange={() => handleFilterChange('freeShip')}
          />
          <span className="flex items-center">
            <img src="/sortbar/freeship.png" alt="Freeship" className="h-4 mr-1" />
            <span className="text-sm">FREESHIP XTRA</span>
          </span>
        </label>
        
        {/* Rating Checkbox */}
        <label className="flex items-center bg-white border border-[#EEEEEE] rounded-sm px-3 py-2 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 mr-2 accent-[#FF424E]"
            checked={filters.rating}
            onChange={() => handleFilterChange('rating')}
          />
          <span className="flex items-center">
            <span className="text-sm flex items-center">
              <span className="text-amber-400">★★★★</span>
              <span className="text-amber-200">★</span>
              <span className="ml-1">từ 4 sao</span>
            </span>
          </span>
        </label>
      </div>
      
      <div className="flex flex-wrap items-center justify-between border-t border-gray-200 pt-4">
        <div className="text-sm text-[#38383D] my-2">
          {totalResults !== undefined && (
            <span className="font-normal">
              Hiển thị <span className="font-medium">{totalResults}</span> kết quả
            </span>
          )}
        </div>

        <div className="flex items-center">
          <span className="text-sm text-[#38383D] mr-3">Sắp xếp</span>
          <div className="w-48">
            <Select
              value={currentValue}
              onChange={(e) => handleSortChange(e.target.value)}
              options={sortOptions.map(option => ({
                value: option.value,
                label: option.label
              }))}
              className="h-10 border border-[#DDDDE3] rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
