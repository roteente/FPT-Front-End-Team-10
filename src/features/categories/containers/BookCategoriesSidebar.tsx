import { useMemo } from "react";
import SidebarUI from "../ui/SidebarUI";
import { useGetCategoriesQuery } from "../api/categoryApi";
import type { Category } from "../model/types";

// Props for the container component
type Props = {
  selectedCategory?: string;
  onCategorySelect?: (slug: string) => void;
};

/**
 * Container cho SidebarUI lấy danh mục từ API /categories
 */
export default function BookCategoriesSidebar({
  selectedCategory,
  onCategorySelect,
}: Props) {
  // Lấy dữ liệu categories từ API
  const { data: apiCategories = [], isLoading: isCategoriesLoading, isError: isCategoriesError } = useGetCategoriesQuery();
  
  const isLoading = isCategoriesLoading;
  const isError = isCategoriesError;
  
  // Chúng ta chỉ cần cung cấp categories từ API
  // SidebarUI sẽ tự phân loại và hiển thị theo cấu trúc phân cấp
  const categories = useMemo(() => {
    return apiCategories;
  }, [apiCategories]);

  if (isLoading) {
    return (
      <div className="bg-white border border-[#EBEBF0] rounded-[8px]" style={{width: '240px'}}>
        <div className="h-[46px] flex items-center px-4 border-b border-[#EBEBF0]" style={{width: '240px'}}>
          <div className="h-5 w-40 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="p-4 space-y-2 overflow-y-auto max-h-[600px]">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="h-10 bg-gray-100 rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white border border-[#EBEBF0] rounded-[8px]" style={{width: '240px'}}>
        <div className="h-[46px] flex items-center px-4 border-b border-[#EBEBF0]" style={{width: '240px'}}>
          <h2 className="text-[15px] font-semibold text-[#27272A]">Khám phá theo danh mục</h2>
        </div>
        <div className="p-4 overflow-y-auto max-h-[600px] text-sm text-red-600">
          Không tải được danh mục.
        </div>
      </div>
    );
  }

  return (
    <SidebarUI
      title="Khám phá theo danh mục"
      categories={categories}
      selectedCategory={selectedCategory}
      onCategorySelect={onCategorySelect}
    />
  );
}
