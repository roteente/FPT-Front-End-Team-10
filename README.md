# BookStore - Cửa hàng sách trực tuyến

Dự án BookStore được xây dựng với React + TypeScript + Vite, sử dụng kiến trúc feature-first và các công nghệ hiện đại.

## 🚀 Công nghệ sử dụng

- **Frontend**: React 19, TypeScript, Vite
- **State Management**: Redux Toolkit + RTK Query
- **Routing**: React Router v7
- **Styling**: Tailwind CSS v4
- **UI Components**: Custom Design System
- **Mock API**: JSON Server
- **Development**: ESLint, Concurrently

## 📁 Cấu trúc dự án

```
my-store/
├─ mock/                                   # dữ liệu giả khi dev
│  ├─ db.json
│  └─ README.md
│
├─ src/
│  ├─ app/                                  # khởi tạo ứng dụng
│  │  ├─ store.ts                           # Redux store + RTK Query middleware
│  │  ├─ hooks.ts                           # useAppDispatch/useAppSelector
│  │  └─ providers/                         # Provider cấp cao
│  │
│  ├─ core/                                 # hạ tầng chung
│  │  ├─ api/                               # RTK Query baseQuery, types
│  │  ├─ routing/                           # routes, guards
│  │  ├─ config/                            # env config
│  │  └─ utils/                             # format, storage helpers
│  │
│  ├─ theme/                                # design tokens
│  │  ├─ tokens.css                         # màu sắc, spacing, typography
│  │  └─ tailwind.css                       # custom utilities
│  │
│  ├─ ui/                                   # design system
│  │  ├─ primitives/                        # Button, Input, Card...
│  │  ├─ patterns/                          # SearchBar, Pagination...
│  │  └─ layout/                            # Header, Footer, MainLayout
│  │
│  ├─ features/                             # tổ chức theo domain
│  │  ├─ auth/                              # xác thực người dùng
│  │  ├─ books/                             # quản lý sách
│  │  ├─ categories/                        # danh mục sách
│  │  └─ cart/                              # giỏ hàng
│  │
│  ├─ pages/                                # error pages
│  ├─ App.tsx
│  ├─ main.tsx
│  └─ index.css
```

## 🛠️ Cài đặt và chạy dự án

### Yêu cầu hệ thống
- Node.js >= 18
- npm >= 9

### Cài đặt dependencies
```bash
npm install
```

### Chạy development server
```bash
# Chạy cả mock API và dev server
npm run dev:all

# Hoặc chạy riêng lẻ
npm run mock    # Mock API tại http://localhost:3000
npm run dev     # Dev server tại http://localhost:5173
```

### Build production
```bash
npm run build
```

### Linting
```bash
npm run lint
```

## 🏗️ Kiến trúc dự án

### Feature-First Architecture
Mỗi feature được tổ chức theo cấu trúc:
- `model/` - Types, slices, selectors
- `api/` - RTK Query endpoints
- `hooks/` - Custom hooks, view models
- `ui/` - Presentational components
- `containers/` - Connected components
- `sections/` - Composite components
- `pages/` - Route components

### Design System
- **Primitives**: Components cơ bản (Button, Input, Card...)
- **Patterns**: Components tổ hợp (SearchBar, Pagination...)
- **Layout**: Components bố cục (Header, Footer, MainLayout)

### State Management
- **Redux Toolkit**: Global state management
- **RTK Query**: API state management và caching
- **Local Storage**: Persist cart data

## 📝 Scripts có sẵn

- `npm run dev` - Chạy development server
- `npm run build` - Build production
- `npm run preview` - Preview production build
- `npm run lint` - Chạy ESLint
- `npm run mock` - Chạy JSON Server
- `npm run dev:all` - Chạy cả mock API và dev server

## 🔧 Cấu hình

### Environment Variables
Tạo file `.env` từ `.env.example`:
```bash
VITE_API_URL=http://localhost:3000
VITE_MOCK_API=true
```

### Path Aliases
Dự án sử dụng path alias `@/` trỏ đến thư mục `src/`

## 📚 Tài liệu tham khảo

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite Guide](https://vitejs.dev/guide)