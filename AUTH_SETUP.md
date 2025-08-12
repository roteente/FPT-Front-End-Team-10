# Hướng dẫn cấu hình Authentication

## 🔧 Cấu hình Environment

Tạo file `.env` trong thư mục root với nội dung:

```env
VITE_API_URL=http://localhost:3000
VITE_MOCK_API=false
```

## 🚀 Các tính năng đã được tích hợp

### 1. **Đăng nhập (Login)**
- **URL**: `/login`
- **API Endpoint**: `POST http://localhost:3000/login`
- **Tính năng**:
  - Validation real-time
  - Remember Me (lưu localStorage/sessionStorage)
  - Show/Hide password
  - Social login UI (Google, Facebook)
  - Auto redirect về trang chủ sau khi đăng nhập

### 2. **Đăng ký (Register)**
- **URL**: `/register`
- **API Endpoint**: `POST http://localhost:3000/register`
- **Tính năng**:
  - Form validation đầy đủ
  - Password strength validation
  - Confirm password
  - Terms & conditions checkbox
  - Auto redirect về trang chủ sau khi đăng ký

### 3. **Authentication State Management**
- **Session management** với localStorage/sessionStorage
- **Auto logout** khi session hết hạn
- **Activity tracking** để extend session
- **Persistent login** khi refresh trang

### 4. **Protected Routes**
- Cart page yêu cầu đăng nhập
- Auth pages redirect về home nếu đã đăng nhập
- Admin routes (sẵn sàng cho tương lai)

### 5. **User Interface**
- **Header dropdown** với user menu
- **Avatar display** hoặc initial letter
- **Logout functionality**
- **Responsive design**

## 📡 API Endpoints được sử dụng

```javascript
// Authentication
POST /login          // Đăng nhập
POST /register       // Đăng ký
POST /logout         // Đăng xuất
GET  /me            // Lấy thông tin user
POST /refresh       // Refresh token

// Profile Management
PUT  /profile                // Cập nhật profile
POST /change-password        // Đổi mật khẩu
POST /forgot-password        // Quên mật khẩu
POST /reset-password         // Reset mật khẩu
POST /verify-email           // Xác thực email
POST /resend-verification    // Gửi lại email xác thực
```

## 🔐 Request/Response Format

### Login Request
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Login Response
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "role": "user",
    "avatar": "https://...",
    "phone": "0123456789"
  },
  "token": "jwt_token_here",
  "refreshToken": "refresh_token_here"
}
```

### Register Request
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123",
  "phone": "0123456789"
}
```

## 🎯 Cách sử dụng

### 1. Khởi động JSON Server
```bash
# Trong thư mục json-server-with-auth
npm start
# Server sẽ chạy trên http://localhost:3000
```

### 2. Khởi động React App
```bash
# Trong thư mục my-store
npm run dev
# App sẽ chạy trên http://localhost:5175 (hoặc port khác)
```

### 3. Test Authentication
1. Truy cập `/register` để tạo tài khoản mới
2. Truy cập `/login` để đăng nhập
3. Sau khi đăng nhập, sẽ tự động redirect về trang chủ
4. Click vào avatar/tên ở header để xem user menu
5. Truy cập `/cart` để test protected route

## 🛡️ Security Features

- **JWT Token** authentication
- **Session expiry** với auto-logout
- **Password validation** với strength requirements
- **XSS protection** với proper sanitization
- **CSRF ready** với token-based auth
- **Role-based access control** (Admin/User)

## 🔄 State Management

Authentication state được quản lý bởi Redux Toolkit với:
- **authSlice**: quản lý user, token, loading states
- **Persistent storage**: tự động lưu/khôi phục từ localStorage/sessionStorage
- **Activity tracking**: theo dõi hoạt động user để extend session
- **Error handling**: quản lý lỗi với auto-clear

## 🎨 UI Components

- **LoginForm**: Form đăng nhập với validation
- **RegisterForm**: Form đăng ký với validation mạnh
- **AuthButton**: Button với dropdown menu
- **AuthGuard**: Component bảo vệ routes
- **Responsive design**: hoạt động tốt trên mobile/desktop

## 📱 Mobile Support

- Responsive design cho mobile
- Touch-friendly interfaces
- Optimized form inputs
- Mobile-first approach

Tất cả đã sẵn sàng để sử dụng! 🎉
