# Tính năng Giỏ hàng - Cart Feature

## Tổng quan

Tính năng giỏ hàng được thiết kế theo UI/UX của Tiki với đầy đủ các chức năng:

- ✅ Thêm sản phẩm vào giỏ hàng
- ✅ Xem danh sách sản phẩm trong giỏ
- ✅ Cập nhật số lượng sản phẩm
- ✅ Xóa sản phẩm khỏi giỏ
- ✅ Chọn sản phẩm để thanh toán
- ✅ Hiển thị số lượng sản phẩm ở header
- ✅ Tính toán tổng tiền

## Cấu trúc thư mục

```
src/features/cart/
├── api/
│   └── cartApi.ts           # RTK Query API endpoints
├── hooks/
│   ├── useCartActions.ts    # Hook cho các action cơ bản
│   ├── useAddToCart.ts      # Hook thêm sản phẩm vào giỏ
│   ├── useCartItemCount.ts  # Hook đếm số lượng items
│   └── useCartTotals.ts     # Hook tính toán tổng tiền
├── model/
│   ├── types.ts            # TypeScript interfaces
│   ├── cartSlice.ts        # Redux slice (nếu cần local state)
│   └── selectors.ts        # Redux selectors
├── pages/
│   ├── Cart.tsx            # Trang chính giỏ hàng
│   └── CartDemo.tsx        # Trang demo test chức năng
├── ui/
│   ├── CartTableUI.tsx     # Component bảng sản phẩm
│   ├── CartSummaryUI.tsx   # Component sidebar thanh toán
│   └── AddToCartButton.tsx # Component nút thêm vào giỏ
└── index.ts               # Export các components & hooks
```

## Cách sử dụng

### 1. Thêm sản phẩm vào giỏ hàng

```tsx
import { AddToCartButton } from '@/features/cart'

function ProductCard({ book }) {
  return (
    <div>
      <h3>{book.title}</h3>
      <p>{book.price}₫</p>
      <AddToCartButton
        bookId={book.id}
        title={book.title}
        price={book.price}
        image={book.image}
        quantity={1}
        className="w-full"
      />
    </div>
  )
}
```

### 2. Hiển thị số lượng items ở header

Header component đã được tích hợp sẵn hook `useCartItemCount()` để tự động cập nhật số lượng.

### 3. Trang giỏ hàng

Truy cập `/cart` để xem trang giỏ hàng đầy đủ chức năng.

## API Endpoints

Backend cần support các endpoints sau:

```
GET  /cart?userId={userId}&_expand=book  # Lấy danh sách giỏ hàng
POST /cart                               # Thêm sản phẩm vào giỏ
PATCH /cart/{id}                        # Cập nhật số lượng
DELETE /cart/{id}                       # Xóa sản phẩm
```

## Cấu trúc dữ liệu

### CartItem Interface

```typescript
interface CartItem {
  id: number
  userId: number   
  title: string
  price: number
  image: string
  quantity: number
  book?: Book      // Populated từ API với _expand=book
}
```

## Thiết kế UI

Trang giỏ hàng được thiết kế theo chuẩn Tiki:

1. **Header freeship**: Thông tin khuyến mãi
2. **Service badges**: Cam kết dịch vụ (100% hàng thật, freeship, etc.)
3. **Product table**: Bảng sản phẩm với checkbox, hình ảnh, thông tin
4. **Sidebar**: Thông tin giao hàng, khuyến mãi, tổng tiền

## Test tính năng

1. **Trang detail sản phẩm**: Truy cập `/books/:id` để test thêm sản phẩm vào giỏ
2. **Trang demo**: Truy cập `/cart-demo` để test với sản phẩm mẫu
3. **Đăng nhập**: Đăng nhập trước khi thêm sản phẩm
4. **Thêm sản phẩm**: Click "Thêm vào giỏ" - sẽ tự động cập nhật quantity nếu sản phẩm đã có
5. **Xem giỏ hàng**: Vào `/cart` để xem giỏ hàng đầy đủ
6. **Test các chức năng**: chọn/bỏ chọn, cập nhật số lượng, xóa

**Lưu ý**: Nút "Thêm vào giỏ" đã được bỏ khỏi GridProduct ở homepage. Chỉ có ở:
- Trang detail sản phẩm (`/books/:id`)
- Trang demo (`/cart-demo`)

## Tính năng nâng cao có thể mở rộng

- [ ] Lưu giỏ hàng local storage khi chưa đăng nhập
- [ ] Đồng bộ giỏ hàng từ local storage khi đăng nhập
- [ ] Voucher/mã giảm giá
- [ ] Tính phí vận chuyển theo địa chỉ
- [ ] Gợi ý sản phẩm liên quan
- [ ] Chia sẻ giỏ hàng
- [ ] Lưu để mua sau (wishlist)

## Lưu ý kỹ thuật

- Sử dụng RTK Query để cache data hiệu quả
- Toast notifications tạm thời dùng `alert()`, có thể thay bằng toast library
- Components được thiết kế responsive
- Type-safe với TypeScript
- Error handling cơ bản đã có
