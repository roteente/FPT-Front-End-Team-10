import { useGetCategoriesQuery } from '../api/categoryApi'
import { SidebarUI } from '../ui/SidebarUI'

interface SidebarCategoriesContainerProps {
  selectedCategory?: string
  onCategorySelect: (categorySlug: string) => void
}

export function SidebarCategoriesContainer({ 
  selectedCategory, 
  onCategorySelect 
}: SidebarCategoriesContainerProps) {
  const { data: categories = [], isLoading } = useGetCategoriesQuery()

  if (isLoading) {
    return <div className="bg-white rounded-lg shadow p-6">Đang tải...</div>
  }

  return (
    <SidebarUI
      categories={categories}
      selectedCategory={selectedCategory}
      onCategorySelect={onCategorySelect}
    />
  )
}
