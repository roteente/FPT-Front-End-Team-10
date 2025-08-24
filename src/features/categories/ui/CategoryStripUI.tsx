import { Category } from "../model/types";
import { BookCategory } from "../hooks/useBooksCategories";
import { useMemo } from "react";

interface CategoryStripUIProps {
  categories: BookCategory[];
  selectedCategory?: string;
  onCategorySelect: (categorySlug: string) => void;
}

export function CategoryStripUI({
  categories,
  selectedCategory,
  onCategorySelect,
}: CategoryStripUIProps) {
  // Hiển thị 4 danh mục cố định như thiết kế
  const displayCategories = useMemo(() => {
    // Tìm số lượng sách cho English Books và Sách tiếng Việt từ dữ liệu thật
    const englishBooksCount = categories.find(cat => 
      cat.name.toLowerCase().includes('english books')
    )?.count || 0;
    
    const viBookCount = categories.find(cat => 
      cat.name.toLowerCase().includes('sách tiếng việt')
    )?.count || 0;

    return [
      {
        id: 'english-books',
        name: 'English Books',
        slug: 'english-books',
        count: englishBooksCount
      },
      {
        id: 'sach-tieng-viet', 
        name: 'Sách tiếng Việt',
        slug: 'sach-tieng-viet',
        count: viBookCount
      },
      {
        id: 'van-phong-pham',
        name: 'Văn phòng phẩm', 
        slug: 'van-phong-pham',
        count: 0 // Không có dữ liệu
      },
      {
        id: 'qua-luu-niem',
        name: 'Quà lưu niệm',
        slug: 'qua-luu-niem', 
        count: 0 // Không có dữ liệu
      }
    ];
  }, [categories]);

  // Hàm để lấy icon/image cho từng category
  const getCategoryImage = (categoryName: string) => {
    const imageMap: { [key: string]: string } = {
      'Tất cả': '/vite.svg',
      'English Books': '/categories/English Books.png',
      'Sách tiếng Việt': '/categories/Sách tiếng Việt.png', 
      'Văn phòng phẩm': '/categories/Văn phòng phẩm.png',
      'Quà lưu niệm': '/categories/Quà lưu niệm.png',
      'Fiction - Literature': '/vite.svg',
      'Tác phẩm kinh điển': '/vite.svg',
    };
    
    return imageMap[categoryName] || '/vite.svg';
  };
  
  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-medium mb-6">Khám phá theo danh mục</h2>
      
      <div className="grid grid-cols-4 gap-4">
        {displayCategories.map((category) => (
          <div 
            key={category.id}
            className={`flex flex-col items-center cursor-pointer p-2 rounded-lg transition-colors ${
              selectedCategory === category.slug 
                ? 'bg-blue-50 border border-blue-200' 
                : 'hover:bg-gray-50'
            }`}
            onClick={() => onCategorySelect(category.slug)}
          >
            <div className="mb-4">
              <img 
                src={getCategoryImage(category.name)}
                alt={category.name}
                className="rounded-full w-[94px] h-[94px] object-cover border border-gray-100"
                onError={(e) => {
                  // Fallback if image doesn't load
                  e.currentTarget.src = '/vite.svg';
                }}
              />
            </div>
            
            <span className="text-[14px] font-medium text-center text-[#27272A] mb-1">
              {category.name}
            </span>
            
            <span className="text-xs text-gray-500">
              {category.count > 0 ? `${category.count} sản phẩm` : 'Sắp có hàng'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
