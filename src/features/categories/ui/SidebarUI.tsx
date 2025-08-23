import * as React from "react";
import { cn } from "../../../core/utils/cn";
import type { Category } from "../model/types";
import { useGetCategoriesQuery } from "../api/categoryApi";

// Extended Category type for sidebar
type SidebarCategory = Category;

type SidebarUIProps = {
  title?: string;
  categories: SidebarCategory[];
  selectedCategory?: string;
  onCategorySelect?: (slug: string) => void;
  className?: string;
  itemClassName?: string;
  showCount?: boolean;
};

// Hook để quản lý trạng thái đóng/mở của các danh mục
function useExpandableCategories() {
  const [expandedCategories, setExpandedCategories] = React.useState<Record<string | number, boolean>>({});
  
  // Lấy tất cả danh mục từ API
  const { data: allCategories = [] } = useGetCategoriesQuery();
  
  // Xác định các danh mục chính và danh mục con
  const [rootCategories, setRootCategories] = React.useState<SidebarCategory[]>([]);
  const [subCategories, setSubCategories] = React.useState<Record<string | number, SidebarCategory[]>>({});

  // Hàm kiểm tra xem một danh mục có danh mục con hay không
  const hasSubCategories = React.useCallback((categoryId: string | number) => {
    return Boolean(subCategories[categoryId]?.length);
  }, [subCategories]);

  // Hàm toggle trạng thái mở/đóng của danh mục
  const toggleCategory = React.useCallback((categoryId: string | number) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  }, []);

  // Cấu trúc lại danh mục theo thiết kế
  React.useEffect(() => {
    if (allCategories.length === 0) {
      // Tạo dữ liệu mock cho sidebar theo thiết kế
      const mockCategories = [
        {
          id: 'english-books',
          name: 'English Books',
          slug: 'english-books',
          isLeaf: false
        },
        {
          id: 'sach-tieng-viet',
          name: 'Sách tiếng Việt', 
          slug: 'sach-tieng-viet',
          isLeaf: false
        },
        {
          id: 'van-phong-pham',
          name: 'Văn phòng phẩm',
          slug: 'van-phong-pham', 
          isLeaf: false
        },
        {
          id: 'qua-luu-niem',
          name: 'Quà lưu niệm',
          slug: 'qua-luu-niem',
          isLeaf: false
        }
      ];

      const mockSubCategories = {
        'english-books': [
          { id: 'art-photography', name: 'Art & Photography', slug: 'art-photography', isLeaf: true },
          { id: 'biographies-memoirs', name: 'Biographies & Memoirs', slug: 'biographies-memoirs', isLeaf: true },
          { id: 'business-economics', name: 'Business & Economics', slug: 'business-economics', isLeaf: true },
          { id: 'childrens-books', name: "Children's Books", slug: 'childrens-books', isLeaf: true },
          { id: 'dictionary', name: 'Dictionary', slug: 'dictionary', isLeaf: true },
          { id: 'education-teaching', name: 'Education - Teaching', slug: 'education-teaching', isLeaf: true },
          { id: 'fiction-literature', name: 'Fiction - Literature', slug: 'fiction-literature', isLeaf: true },
          { id: 'magazines', name: 'Magazines', slug: 'magazines', isLeaf: true },
          { id: 'medical-books', name: 'Medical Books', slug: 'medical-books', isLeaf: true },
          { id: 'parenting-relationships', name: 'Parenting & Relationships', slug: 'parenting-relationships', isLeaf: true },
          { id: 'reference', name: 'Reference', slug: 'reference', isLeaf: true },
          { id: 'science-technology', name: 'Science - Technology', slug: 'science-technology', isLeaf: true },
          { id: 'history-politics', name: 'History, Politics & Social Sciences', slug: 'history-politics', isLeaf: true },
          { id: 'travel-holiday', name: 'Travel & Holiday', slug: 'travel-holiday', isLeaf: true },
          { id: 'cookbooks', name: 'Cookbooks, Food & Wine', slug: 'cookbooks', isLeaf: true }
        ],
        'sach-tieng-viet': [
          { id: 'kinh-te', name: 'Kinh tế', slug: 'kinh-te', isLeaf: true },
          { id: 'van-hoc', name: 'Văn học', slug: 'van-hoc', isLeaf: true },
          { id: 'tam-ly-ky-nang-song', name: 'Tâm lý - Kỹ năng sống', slug: 'tam-ly-ky-nang-song', isLeaf: true },
          { id: 'nuoi-day-con', name: 'Nuôi dạy con', slug: 'nuoi-day-con', isLeaf: true },
          { id: 'sach-hoc-ngoai-ngu', name: 'Sách học ngoại ngữ', slug: 'sach-hoc-ngoai-ngu', isLeaf: true },
          { id: 'sach-thieu-nhi', name: 'Sách thiếu nhi', slug: 'sach-thieu-nhi', isLeaf: true }
        ],
        'van-phong-pham': [
          { id: 'dung-cu-hoc-tap', name: 'Dụng cụ học tập', slug: 'dung-cu-hoc-tap', isLeaf: true },
          { id: 'dung-cu-van-phong', name: 'Dụng cụ văn phòng', slug: 'dung-cu-van-phong', isLeaf: true }
        ],
        'qua-luu-niem': [
          { id: 'qua-tang', name: 'Quà tặng', slug: 'qua-tang', isLeaf: true },
          { id: 'luu-niem', name: 'Lưu niệm', slug: 'luu-niem', isLeaf: true }
        ]
      };

      setRootCategories(mockCategories);
      setSubCategories(mockSubCategories);
      return;
    }

    // Tìm các danh mục gốc (English Books và Sách tiếng Việt)
    const rootCats = allCategories.filter(cat => 
      cat && typeof cat.name === 'string' && (
        cat.name === "English Books" || 
        cat.name === "Sách tiếng Việt" ||
        cat.name === "Văn phòng phẩm" ||
        cat.name === "Quà lưu niệm"
      )
    );
    
    setRootCategories(rootCats);
    
    // Tạo mapping cho danh mục con
    const childCategoriesMap: Record<string | number, SidebarCategory[]> = {};
    
    // Xử lý cho English Books
    const englishBooks = rootCats.find(cat => cat.name === "English Books");
    if (englishBooks) {
      // Lấy các danh mục tiếng Anh (không có từ "Sách", "Truyện", "Tác phẩm")
      const englishSubcats = allCategories.filter(cat => 
  cat && typeof cat.name === 'string' &&
  cat.id !== englishBooks.id && 
  !cat.name.includes("Sách") && 
  !cat.name.includes("Truyện") &&
  !cat.name.includes("Tác phẩm") &&
  cat.name !== "English Books" &&
  cat.name !== "Văn phòng phẩm" &&
  cat.name !== "Quà lưu niệm"
      );
      
      childCategoriesMap[englishBooks.id] = englishSubcats;
      
      // Auto-expand English Books
      setExpandedCategories(prev => ({
        ...prev,
        [englishBooks.id]: true
      }));
    }
    
    // Xử lý cho Sách tiếng Việt
    const vietnameseBooks = rootCats.find(cat => cat.name === "Sách tiếng Việt");
    if (vietnameseBooks) {
      // Lấy các danh mục tiếng Việt (có từ "Sách", "Truyện", "Tác phẩm")
      const vietnameseSubcats = allCategories.filter(cat => 
  cat && typeof cat.name === 'string' &&
  cat.id !== vietnameseBooks.id && 
  (cat.name.includes("Sách") || cat.name.includes("Truyện") || cat.name.includes("Tác phẩm")) &&
  cat.name !== "Sách tiếng Việt"
      );
      
      childCategoriesMap[vietnameseBooks.id] = vietnameseSubcats;
    }
    
    setSubCategories(childCategoriesMap);
  }, [allCategories]);

  return {
    rootCategories,
    expandedCategories,
    hasSubCategories,
    toggleCategory,
    subCategories
  };
}

export default function SidebarUI({
  title = "Khám phá theo danh mục",
  categories, // Không sử dụng categories từ props nữa, mà lấy từ API trực tiếp
  selectedCategory,
  onCategorySelect,
  className,
  itemClassName,
  showCount = false,
}: SidebarUIProps) {
  // Sử dụng hook quản lý trạng thái mở/đóng của danh mục
  const { 
    rootCategories, 
    expandedCategories, 
    hasSubCategories, 
    toggleCategory, 
    subCategories 
  } = useExpandableCategories();

  return (
    <aside
      className={cn(
        "bg-white border border-[#EBEBF0] rounded-[8px]",
        className
      )}
      style={{width: '240px'}}
    >
      <div className="h-[46px] flex items-center px-4 border-b border-[#EBEBF0]" style={{width: '240px'}}>
        <h2 className="text-[15px] font-semibold text-[#27272A]">{title}</h2>
      </div>

      <nav className="py-1 max-h-[600px] overflow-y-auto">
        {rootCategories.map((c) => {
          const slug = c.slug ?? String(c.id);
          const active = selectedCategory === slug;
          const isExpanded = expandedCategories[c.id];
          const hasChildren = hasSubCategories(c.id);
          
          return (
            <React.Fragment key={c.id}>
              <div className="relative border-b border-[#EBEBF0]">
                <button
                  type="button"
                  onClick={() => {
                    onCategorySelect?.(slug);
                    if (hasChildren) {
                      toggleCategory(c.id);
                    }
                  }}
                  className={cn(
                    "w-full text-left px-4 py-3 transition flex items-center justify-between",
                    "text-[14px] font-medium leading-5 text-[#27272A]",
                    "hover:bg-[#F6F7F9]",
                    active && "bg-[#F6F7F9] font-medium",
                    itemClassName
                  )}
                  style={{width: '240px'}}
                >
                  <span>{c.name}{showCount ? ` (${subCategories[c.id]?.length || 0})` : ''}</span>
                  
                  {hasChildren && (
                    <div
                      role="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCategory(c.id);
                      }}
                      className={cn(
                        "w-[24px] h-[24px] rounded-[4px] flex items-center justify-center",
                        "transition-transform",
                        isExpanded ? "transform rotate-180" : ""
                      )}
                      style={{
                        transform: isExpanded ? 'rotate(-180deg)' : 'rotate(0deg)',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      <svg 
                        width="12" 
                        height="12" 
                        viewBox="0 0 16 16" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          d="M13.3334 5.33335L8.00008 10.6667L2.66675 5.33335" 
                          stroke="#808089" 
                          strokeWidth="1.5" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </button>
              </div>
              
              {hasChildren && isExpanded && (
                <div className="bg-[#FFFFFF] py-1 border-b border-[#EBEBF0]">
                  {subCategories[c.id]?.map((subCat) => (
                    <button
                      key={subCat.id}
                      type="button"
                      onClick={() => onCategorySelect?.(subCat.slug)}
                      className={cn(
                        "w-full text-left px-4 py-2 transition",
                        "text-[14px] leading-5 text-[#27272A]",
                        "hover:bg-[#F6F7F9]",
                        selectedCategory === subCat.slug && "font-medium bg-[#F6F7F9]"
                      )}
                    >
                      {subCat.name}
                    </button>
                  ))}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </aside>
  );
}
