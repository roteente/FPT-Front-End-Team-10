 Book Store – Sprint 1 Ready


🔵 Mục tiêu: chạy trọn vẹn luồng xem danh sách → chi tiết → giỏ hàng → thanh toán → lịch sử đơn, sẵn sàng mở rộng ở sprint sau.
🟢 Ưu tiên: code feature-first, URL là nguồn sự thật cho list, và transform dữ liệu tại service (không “bẩn” component UI).

🚀 Quickstart
bash
Sao chép
Chỉnh sửa
npm install

# Mock API (json-server) tại http://localhost:3000
npm start

# Frontend (Vite) tại http://localhost:5173
npm run dev

# (Tuỳ chọn) chạy cả FE + API đồng thời
npm run dev:all
.env

ini
Sao chép
Chỉnh sửa
VITE_API_URL=http://localhost:3000
🟠 Mỗi lần đổi .env, hãy tắt và chạy lại npm run dev.

🧩 Tech stack & nguyên tắc
React + TypeScript

Redux Toolkit + RTK Query

Server state (books, orders…) → RTK Query

Client/UI state (cart, auth…) → Redux slice

Ant Design cho UI

json-server làm Mock API

Vite bundler + alias @ → src

Thiết kế cốt lõi

🟣 Feature-first: mỗi domain (books/cart/auth/orders) có folder riêng.

🔵 URL là nguồn sự thật cho list (page/limit/q/sort/order/categoryId).

🟢 Transform dữ liệu tại service (không “bẩn” UI).

🟠 Tag/Invalidation: mutation giúp list tự refresh.

🗂️ Cấu trúc dự án & vai trò
graphql
Sao chép
Chỉnh sửa
src/
  app/
    store.ts                 # Redux store + RTK Query middleware
    hooks.ts                 # Typed hooks: useAppDispatch/useAppSelector
  features/
    api/
      baseApi.ts             # RTK Query base: baseUrl, token headers, tagTypes
    books/
      bookApi.ts             # Service: getBooks/getBook + map raw -> type Book
      components/
        BookCard.tsx         # UI 1 sách (ảnh, giá, rating, sold, ...)
        CategorySidebar.tsx  # UI danh mục
        FiltersBar.tsx       # UI tìm kiếm + sắp xếp (mở rộng filter tại đây)
        ProductGrid.tsx      # UI lưới BookCard (responsive)
        PaginationBar.tsx    # UI phân trang
      pages/
        Home.tsx             # Trang list: ghép UI + gọi API + đồng bộ URL
        BookDetails.tsx      # Trang chi tiết (ảnh, mô tả, gợi ý tương tự)
    cart/
      cartSlice.ts           # Redux slice: add/remove/qty/clear + selectors
      pages/
        Cart.tsx             # Trang giỏ hàng (bảng)
    auth/
      authSlice.ts           # Redux slice: user/token (persist localStorage)
      components/
        RequireAuth.tsx      # Route guard: bắt buộc đăng nhập
      pages/
        Login.tsx            # Trang đăng nhập (mock /login hoặc /users?email&password)
    orders/
      orderApi.ts            # Service: orders + orderItems (create/list/cancel)
      pages/
        Checkout.tsx         # Trang thanh toán
        OrderHistory.tsx     # Trang lịch sử đơn
  layouts/
    MainLayout.tsx           # Shell ứng dụng: Header/Footer + <Outlet/>
  shared/
    hooks/
      useQueryState.ts       # Đọc/ghi query param (page/q/sort/...)
  App.tsx                    # Khai báo routes (có RequireAuth)
  main.tsx                   # Mount app + Provider/Router + AntD theme
  index.css                  # Style toàn cục
🧠 Ảnh hưởng khi thay đổi (Impact Map)
Khu vực	Vai trò	Thay đổi thường gặp	Ảnh hưởng
features/books/bookApi.ts	Chuẩn hoá data	Thêm field hiển thị, đổi sort/filter	Ảnh hưởng mọi UI dùng Book
BookCard.tsx	UI 1 item	Layout, format giá, badge	Chỉ lưới & similar
Home.tsx	Trang list	Thêm filter/sort, đổi limit	UX tìm kiếm & URL
cartSlice.ts	State giỏ	Voucher/fee, tính tổng	Checkout/Cart UI
orderApi.ts	Đơn hàng	Trạng thái mới, model	Checkout/OrderHistory
RequireAuth.tsx	Guard	Điều kiện quyền	Điều hướng Login
baseApi.ts	API base	baseUrl, header token	Tất cả endpoint RTKQ
main.tsx	Theme	AntD theme, providers	UI toàn cục

🔴 Nguyên tắc vàng: muốn hiển thị trường mới → thêm ở Book + map trong bookApi.ts, rồi render trong UI. Không chọc trực tiếp vào data raw ở component.

🧪 Data model & transform
Type dùng trong UI

ts
Sao chép
Chỉnh sửa
type Book = {
  id: number
  title: string
  author: string
  images: string[]      // chuẩn hoá về mảng URL
  price: number         // giá gốc
  salePrice?: number    // giá sale (nếu có)
  categoryId: number
  rating?: number
  sold?: number
  description?: string  // đã strip HTML
}
Vì sao transform?
Mock data kiểu “Tiki-like”: authors[], images[] (object), current_seller.price, description HTML… → UI chỉ làm việc với Book đã sạch. Mọi map/ghép xử lý ở features/books/bookApi.ts.

🔌 Mock API (json-server)
Chạy: npm start → http://localhost:3000

Endpoint chính

GET /books?_page=&_limit=&q=&categories.id=&_sort=&_order=

GET /books/:id

GET /orders?userId=ME&_embed=orderItems&_sort=createdAt&_order=desc

POST /orders · POST /orderItems · PATCH /orders/:id

Auth mock: POST /login (json-server-auth) hoặc GET /users?email&password

Gợi ý dữ liệu mock/db.json (rút gọn)

json
Sao chép
Chỉnh sửa
{
  "categories": [{ "id": 1, "name": "Kinh tế" }],
  "books": [
    {
      "id": 1,
      "name": "Tư duy nhanh và chậm",
      "authors": [{ "name": "Daniel Kahneman" }],
      "categories": { "id": 1, "name": "Kinh tế" },
      "images": [{ "large_url": "https://..." }],
      "current_seller": { "price": 155000 },
      "original_price": 180000,
      "rating_average": 4.6,
      "quantity_sold": { "value": 1200 },
      "description": "<p>...</p>"
    }
  ],
  "users": [
    { "id": 1, "email": "user@example.com", "password": "123456", "role": "user" }
  ],
  "orders": [],
  "orderItems": []
}
🟡 Filter theo object: ?categories.id=1 là hợp lệ trong json-server.

🗺️ “Tôi muốn sửa X thì vào Y” (Recipes)
🎨 Giao diện
Đổi màu/chữ toàn site → main.tsx (AntD ConfigProvider) + index.css

Header/Layout khung → layouts/MainLayout.tsx

Trang Home: bố cục/breadcrumb/banner → features/books/pages/Home.tsx

Số cột & khoảng cách grid → features/books/components/ProductGrid.tsx

Card sản phẩm (ảnh/giá/badge) → features/books/components/BookCard.tsx

Sidebar danh mục → CategorySidebar.tsx

Search/Sort/Filter → FiltersBar.tsx

Phân trang → PaginationBar.tsx

Trang chi tiết → BookDetails.tsx

Giỏ hàng → cart/pages/Cart.tsx

🧠 Logic/State
Thêm field hiển thị (publisher/năm…)

features/books/bookApi.ts: thêm vào type Book + map trong mapToBook

Render field ở BookCard.tsx / BookDetails.tsx

Filter giá min/max

UI: thêm vào FiltersBar.tsx

URL: đọc/ghi ở Home.tsx

API: bookApi.ts dùng price_gte/price_lte

Tăng số sản phẩm mỗi trang → đổi limit mặc định ở Home.tsx

Hiển thị tất cả để demo → useGetBooksQuery({ page:1, limit:9999 }) (tạm thời)

Mua ngay → trong BookCard.tsx/BookDetails.tsx: clear() → add({book}) → navigate('/checkout')

🔧 Mock API
Thêm trường vào books → mock/db.json → update mapToBook → render UI

Tạo nhiều dữ liệu → viết script seed (tuỳ sprint 2)

Chậm nhanh API → --delay trong script start

🔄 Luồng dữ liệu (tóm tắt)
css
Sao chép
Chỉnh sửa
json-server
  └── /books?...  →  RTK Query (bookApi.ts) → transform to Book[]
                       └── Home.tsx → FiltersBar + ProductGrid + PaginationBar
                       └── BookDetails.tsx
cartSlice ← BookCard/Add to cart
Checkout → orderApi.ts (POST /orders + /orderItems) → OrderHistory
✅ DoD – Sprint 1
 Home: grid (ảnh/giá/tên/tác giả), search/sort/filter, URL đồng bộ

 BookDetails: ảnh + mô tả; (tuỳ) gợi ý tương tự theo danh mục

 Cart: thêm/xoá/đổi SL; tổng tiền cập nhật

 Checkout: login required; tạo order+items; clear cart; điều hướng /orders

 OrderHistory: list đơn; hủy khi status='confirmed'

 Không crash khi thiếu ảnh/giá (đã có fallback)

🧯 Troubleshooting
Không thấy sản phẩm

npm start đã chạy? http://localhost:3000/books có JSON chưa

.env đúng VITE_API_URL=http://localhost:3000? (restart dev)

Network → request /books?... trả 200? Response có mảng?

Ảnh không hiện

images là mảng object; bookApi.ts đã lấy large_url/base_url/...

Item không có ảnh → placeholder (không phải lỗi)

Trắng trang (toLocaleString undefined)

Dùng version BookCard.tsx có fallback Number(...??0) + placeholder ảnh

Alias @ báo đỏ

Kiểm tra tsconfig.json (paths) + vite.config.ts (resolve.alias), cài @types/node

Log Unchecked runtime.lastError

Do extension trình duyệt; thử Incognito/disable extension

🧭 Roadmap gợi ý
Sprint 2: Filter giá/nhà xuất bản, Similar books; Orders flow confirmed → shipping → delivered; Admin CRUD (layout riêng)

Sprint 3: Thanh toán cổng thật (mock trước), upload ảnh, RBAC chi tiết, analytics, i18n

⚙️ Cấu hình hữu ích
Scripts

json
Sao chép
Chỉnh sửa
"dev": "vite",
"build": "tsc -b && vite build",
"preview": "vite preview",
"start": "json-server --watch mock/db.json --port 3000 --delay 400",
"dev:all": "concurrently \"npm:dev\" \"npm:start\""
Alias @ → src

jsonc
Sao chép
Chỉnh sửa
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] },
    "types": ["vite/client", "node"]
  }
}
ts
Sao chép
Chỉnh sửa
// vite.config.ts
resolve: {
  alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) }
}