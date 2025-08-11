# API Configuration

## Cấu hình kết nối API

Ứng dụng đã được cấu hình để lấy dữ liệu từ API server của bạn tại `http://localhost:3000`.

## Endpoints được sử dụng

### Books API
- **GET** `/Books` - Lấy danh sách tất cả sách
- **GET** `/Books/{id}` - Lấy chi tiết sách theo ID
- **GET** `/Books?q={query}` - Tìm kiếm sách
- **GET** `/Books?featured=true` - Lấy sách nổi bật
- **GET** `/Books?bestseller=true` - Lấy sách bán chạy
- **GET** `/Books?new=true` - Lấy sách mới

### Categories API (nếu cần)
- **GET** `/Categories` - Lấy danh sách danh mục

## Cấu trúc dữ liệu mong đợi

### Book Object
```json
{
  "id": 1,
  "title": "Tên sách",
  "author": "Tác giả",
  "price": 69000,
  "originalPrice": 89000,
  "category": "Sách tiếng Việt",
  "categoryId": 1,
  "image": "https://example.com/image.jpg",
  "rating": 4.5,
  "reviewCount": 120,
  "description": "Mô tả sách",
  "inStock": true,
  "discount": 22
}
```

### Category Object
```json
{
  "id": 1,
  "name": "Sách tiếng Việt",
  "slug": "sach-tieng-viet"
}
```

## Cách chạy

1. **Khởi động API server của bạn** tại `http://localhost:3000`
2. **Đảm bảo endpoint `/Books`** trả về danh sách sách
3. **Khởi động ứng dụng React**:
   ```bash
   npm run dev
   ```
4. **Truy cập**: `http://localhost:5175` (hoặc port Vite assign)

## Lưu ý

- API URL được cấu hình trong `src/core/config/env.ts`
- Có thể thay đổi bằng cách set biến môi trường `VITE_API_URL`
- Ứng dụng sẽ hiển thị loading state khi đang gọi API
- Nếu có lỗi, sẽ hiển thị thông báo lỗi

## Test API

Bạn có thể test API bằng cách:
```bash
curl http://localhost:3000/Books
```

Hoặc mở trực tiếp trong browser: `http://localhost:3000/Books`
