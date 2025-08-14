import { useGetCategoriesQuery } from "../api/categoryApi";
import { CategoryStripUI } from "../ui/CategoryStripUI";

interface CategoryStripContainerProps {
  selectedCategory?: string;
  onCategorySelect: (categorySlug: string) => void;
}

export function CategoryStripContainer({
  selectedCategory,
  onCategorySelect,
}: CategoryStripContainerProps) {
  // Get all categories to ensure we have the main root ones we need
  const { data = [], isLoading, isError } = useGetCategoriesQuery();

  if (isLoading) {
    return (
      <div className="flex flex-col">
        <div className="h-7 w-56 bg-gray-200 rounded mb-6 animate-pulse" />
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="bg-gray-200 rounded-full animate-pulse mb-4 w-[94px] h-[94px]" />
              <div className="h-5 bg-gray-200 rounded w-32 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col">
        <h2 className="text-xl font-medium mb-6">Khám phá theo danh mục</h2>
        <div className="text-sm text-red-600 py-8 text-center">
          Không tải được danh mục nổi bật.
        </div>
      </div>
    );
  }

  return (
    <CategoryStripUI
      categories={data}
      selectedCategory={selectedCategory}
      onCategorySelect={onCategorySelect}
    />
  );
}

export default CategoryStripContainer;
