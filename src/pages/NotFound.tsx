import { Link } from 'react-router-dom'
import { Button } from '@/ui/primitives'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-300">404</h1>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Trang không tìm thấy
          </h2>
          <p className="text-gray-600 mb-8">
            Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link to="/">
            <Button variant="primary" size="lg" className="w-full">
              Về trang chủ
            </Button>
          </Link>
          
          <Link to="/search">
            <Button variant="outline" size="lg" className="w-full">
              Tìm kiếm sách
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
