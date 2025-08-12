import { Category } from "../model/types";

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
  return (
    <div className="flex space-x-4 overflow-x-auto py-4">
      <button
        onClick={() => onCategorySelect("")}
        className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          !selectedCategory ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        Tất cả
      </button>

      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategorySelect(category.slug)}
          className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === category.slug
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
