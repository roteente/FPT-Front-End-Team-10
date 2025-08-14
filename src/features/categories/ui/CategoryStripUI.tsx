import { Category } from "../model/types";
import { useMemo } from "react";

interface CategoryStripUIProps {
  categories: Category[];
  selectedCategory?: string;
  onCategorySelect: (categorySlug: string) => void;
}

export function CategoryStripUI({
  categories,
  selectedCategory,
  onCategorySelect,
}: CategoryStripUIProps) {
  // Combine API categories with mock data to ensure all 4 categories are shown
  const displayCategories = useMemo(() => {
    // Define the 4 required categories
    const requiredCategories = [
      "English Books",
      "Sách tiếng Việt",
      "Văn phòng phẩm",
      "Quà lưu niệm"
    ];
    
    // Filter existing categories that match our required names
    const existingCategories = categories.filter(cat => 
      requiredCategories.includes(cat.name)
    );
    
    // Create a map of existing categories by name for quick lookup
    const categoryMap = new Map(
      existingCategories.map(cat => [cat.name, cat])
    );
    
    // For each required category, use the existing one or create a mock
    const result = requiredCategories.map(name => {
      if (categoryMap.has(name)) {
        return categoryMap.get(name) as Category;
      } else {
        // Create a mock category if it doesn't exist in the API data
        return {
          id: `mock-${name.toLowerCase().replace(/\s+/g, '-')}`,
          name,
          slug: name.toLowerCase().replace(/\s+/g, '-'),
          isLeaf: false
        } as Category;
      }
    });
    
    return result;
  }, [categories]);
  
  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-medium mb-6">Khám phá theo danh mục</h2>
      
      <div className="grid grid-cols-4 gap-4">
        {displayCategories.map((category: Category) => (
          <div 
            key={category.id}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => onCategorySelect(category.slug)}
          >
            <div className="mb-4">
              <img 
                src={`/categories/${category.name}.png`}
                alt={category.name}
                className="rounded-full w-[94px] h-[94px] object-cover border border-gray-100"
                onError={(e) => {
                  // Fallback if image doesn't load
                  e.currentTarget.src = '/vite.svg';
                }}
              />
            </div>
            
            <span className="text-[14px] font-medium text-center text-[#27272A]">
              {category.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
