import SidebarUI from "../ui/SidebarUI";
import { useGetCategoriesQuery } from "../api/categoryApi";

type Props = {
  selectedCategory?: string;
  onCategorySelect?: (slug: string) => void;
};

export default function SidebarCategoriesContainer({
  selectedCategory,
  onCategorySelect,
}: Props) {
  const { data = [], isLoading, isError } = useGetCategoriesQuery({ parentId: null });

  if (isLoading) {
    return (
      <div className="bg-white border border-[#EBEBF0] rounded-xl p-4">
        <div className="h-5 w-40 bg-gray-200 rounded mb-3 animate-pulse" />
        <div className="space-y-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="h-10 bg-gray-100 rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white border border-[#EBEBF0] rounded-xl p-4 text-sm text-red-600">
        Không tải được danh mục.
      </div>
    );
  }

  return (
    <SidebarUI
      title="Khám phá theo danh mục"
      categories={data}
      selectedCategory={selectedCategory}
      onCategorySelect={onCategorySelect ?? (() => {})}
      className="md:mr-1"
      itemClassName="text-[14px] h-10"
    />
  );
}
