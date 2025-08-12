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
  const { data = [], isLoading, isError } = useGetCategoriesQuery({
    parentId: null,
    isFeatured: true,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-24 bg-gray-100 rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (isError) {
    return <div className="text-sm text-red-600">Không tải được danh mục nổi bật.</div>;
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
