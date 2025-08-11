import { Category } from '../model/types'

interface SidebarUIProps {
  categories: Category[]
  selectedCategory?: string
  onCategorySelect: (categorySlug: string) => void
}

export function SidebarUI({ categories, selectedCategory, onCategorySelect }: SidebarUIProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Danh mục</h3>
      <ul className="space-y-2">
        <li>
          <button
            onClick={() => onCategorySelect('')}
            className={`w-full text-left px-3 py-2 rounded transition-colors ${
              !selectedCategory
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Tất cả
          </button>
        </li>
        {categories.map((category) => (
          <li key={category.id}>
            <button
              onClick={() => onCategorySelect(category.slug)}
              className={`w-full text-left px-3 py-2 rounded transition-colors ${
                selectedCategory === category.slug
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category.name}
              {category.bookCount && (
                <span className="text-sm text-gray-500 ml-1">
                  ({category.bookCount})
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
