import { useGetCategoriesQuery } from '../api/categoryApi'
import { CategoryStripUI } from '../ui/CategoryStripUI'

interface CategoryStripContainerProps {
  selectedCategory?: string
  onCategorySelect: (categorySlug: string) => void
}

export function CategoryStripContainer({ 
  selectedCategory, 
  onCategorySelect 
}: CategoryStripContainerProps) {
  const { data: categories = [], isLoading } = useGetCategoriesQuery()

  if (isLoading) {
    return <div className="animate-pulse h-12 bg-gray-200 rounded" />
  }

  return (
    <CategoryStripUI
      categories={categories}
      selectedCategory={selectedCategory}
      onCategorySelect={onCategorySelect}
    />
  )
}
