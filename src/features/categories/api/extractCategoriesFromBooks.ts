import { Book } from "@/features/books/api/bookApi";

export type ExtractedCategory = {
  id: number | string;
  name: string;
  slug?: string;
  parentId?: number | string | null;
  count: number; // số lượng sách thuộc category
  is_leaf?: boolean; // trạng thái là lá (không có danh mục con)
};

/**
 * Trích xuất danh sách categories từ các cuốn sách
 * Kết quả trả về là một danh sách các categories không trùng lặp
 */
export function extractCategoriesFromBooks(books: Book[]): ExtractedCategory[] {
  // Object tạm thời để đếm số lượng và loại bỏ trùng lặp
  const categoriesMap: Record<string, ExtractedCategory> = {};
  
  books.forEach(book => {
    if (book.categories && book.categories.id) {
      const catId = String(book.categories.id);
      
      if (categoriesMap[catId]) {
        // Nếu category đã tồn tại, tăng số lượng sách
        categoriesMap[catId].count += 1;
      } else {
        // Nếu category chưa tồn tại, thêm mới
        const categoryName = book.categories.name || `Category ${book.categories.id}`;
        const categorySlug = `category-${book.categories.id}`;
        
        categoriesMap[catId] = {
          id: book.categories.id,
          name: categoryName,
          slug: categorySlug,
          parentId: null, // Mặc định không có parent
          count: 1,
          is_leaf: book.categories.is_leaf || false,
        };
      }
    }
  });
  
  // Chuyển đổi từ object sang array và sắp xếp theo số lượng sách (giảm dần)
  return Object.values(categoriesMap).sort((a, b) => b.count - a.count);
}
