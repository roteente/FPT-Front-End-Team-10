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
      <div className="bg-white border border-[#EBEBF0] rounded-[8px]" style={{width: '240px', height: '722px'}}>
        <div className="h-[46px] flex items-center px-4 border-b border-[#EBEBF0]" style={{width: '240px'}}>
          <div className="h-5 w-40 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="p-4 space-y-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="h-10 bg-gray-100 rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white border border-[#EBEBF0] rounded-[8px] p-4 text-sm text-red-600" style={{width: '240px', height: '722px'}}>
        <div className="h-[46px] flex items-center px-4 border-b border-[#EBEBF0]" style={{width: '240px'}}>
          <h2 className="text-[15px] font-semibold text-[#27272A]">Khám phá theo danh mục</h2>
        </div>
        <div className="p-4">
          Không tải được danh mục.
        </div>
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
