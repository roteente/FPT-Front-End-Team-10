import { Book } from '../api/bookApi';

// Mock data fallback cho trường hợp API không hoạt động
export const mockBooks: Book[] = [
  {
    id: "1",
    name: "Tuẫn Nguyễn - Hành trình học lập trình",
    rating_average: 4.8,
    short_description: "Cuốn sách chia sẻ kinh nghiệm học lập trình từ cơ bản đến nâng cao",
    description: "Một cuốn sách tuyệt vời dành cho những ai muốn bắt đầu hành trình học lập trình. Được viết bởi Tuẫn Nguyễn với nhiều năm kinh nghiệm trong ngành.",
    original_price: 150000,
    list_price: 120000,
    current_seller: {
      id: "1",
      name: "Nhà sách Tuẫn",
      price: 120000,
      is_best_store: true
    },
    quantity_sold: { value: 500, text: "Đã bán 500" },
    images: [
      {
        base_url: "/placeholder-book.jpg",
        medium_url: "/placeholder-book.jpg",
        thumbnail_url: "/placeholder-book.jpg",
        small_url: "/placeholder-book.jpg",
        large_url: "/placeholder-book.jpg",
      }
    ],
    book_cover: "/placeholder-book.jpg",
    thumbnail: "/placeholder-book.jpg",
    publisher: "Nhà xuất bản Giáo dục",
    publication_date: "2024-01-01",
    page_count: 300,
    dimensions: "24 x 16 cm",
    authors: [
      {
        id: "1",
        name: "Tuẫn Nguyễn"
      }
    ],
    categories: {
      id: "1",
      name: "Công nghệ thông tin",
      is_leaf: true
    }
  },
  {
    id: "2", 
    name: "JavaScript cho người mới bắt đầu",
    rating_average: 4.5,
    short_description: "Học JavaScript từ cơ bản đến nâng cao",
    description: "Cuốn sách hướng dẫn học JavaScript một cách có hệ thống và dễ hiểu.",
    original_price: 200000,
    list_price: 160000,
    current_seller: {
      id: "2",
      name: "Tech Books Store",
      price: 160000,
      is_best_store: false
    },
    quantity_sold: { value: 300, text: "Đã bán 300" },
    images: [
      {
        base_url: "/placeholder-book.jpg",
        medium_url: "/placeholder-book.jpg",
        thumbnail_url: "/placeholder-book.jpg",
        small_url: "/placeholder-book.jpg",
        large_url: "/placeholder-book.jpg",
      }
    ],
    book_cover: "/placeholder-book.jpg",
    thumbnail: "/placeholder-book.jpg",
    publisher: "Nhà xuất bản Khoa học và Kỹ thuật",
    publication_date: "2024-02-15",
    page_count: 450,
    dimensions: "24 x 16 cm",
    authors: [
      {
        id: "2",
        name: "Nguyễn Văn A"
      }
    ],
    categories: {
      id: "1",
      name: "Công nghệ thông tin",
      is_leaf: true
    }
  },
  {
    id: "3",
    name: "React & TypeScript Development",
    rating_average: 4.9,
    short_description: "Xây dựng ứng dụng web hiện đại với React và TypeScript",
    description: "Hướng dẫn chi tiết cách sử dụng React kết hợp với TypeScript để xây dựng ứng dụng web scalable.",
    original_price: 250000,
    list_price: 200000,
    current_seller: {
      id: "3",
      name: "Dev Books Hub",
      price: 200000,
      is_best_store: true
    },
    quantity_sold: { value: 150, text: "Đã bán 150" },
    images: [
      {
        base_url: "/placeholder-book.jpg",
        medium_url: "/placeholder-book.jpg",
        thumbnail_url: "/placeholder-book.jpg",
        small_url: "/placeholder-book.jpg",
        large_url: "/placeholder-book.jpg",
      }
    ],
    book_cover: "/placeholder-book.jpg",
    thumbnail: "/placeholder-book.jpg",
    publisher: "Nhà xuất bản Thông tin và Truyền thông",
    publication_date: "2024-03-10",
    page_count: 520,
    dimensions: "24 x 16 cm",
    authors: [
      {
        id: "3",
        name: "Trần Thị B"
      }
    ],
    categories: {
      id: "1",
      name: "Công nghệ thông tin",
      is_leaf: true
    }
  }
];

// Helper function để tạo book data với các field optional
export const createBookWithDefaults = (book: Partial<Book>): Book => {
  return {
    id: book.id || "unknown",
    name: book.name || "Chưa có tên sách",
    rating_average: book.rating_average || 0,
    short_description: book.short_description || "",
    description: book.description || "",
    original_price: book.original_price || 0,
    list_price: book.list_price || 0,
    current_seller: {
      id: book.current_seller?.id || "unknown",
      name: book.current_seller?.name || "Chưa có thông tin",
      price: book.current_seller?.price || 0,
      is_best_store: book.current_seller?.is_best_store || false
    },
    quantity_sold: book.quantity_sold || { value: 0, text: "Chưa bán" },
    images: book.images || [],
    book_cover: book.book_cover || "/placeholder-book.jpg",
    thumbnail: book.thumbnail || "/placeholder-book.jpg",
    publisher: book.publisher || "Chưa có thông tin",
    publication_date: book.publication_date || "",
    page_count: book.page_count || 0,
    dimensions: book.dimensions || "",
    authors: book.authors || [],
    categories: book.categories || { id: "unknown", name: "Chưa phân loại", is_leaf: true }
  };
};
