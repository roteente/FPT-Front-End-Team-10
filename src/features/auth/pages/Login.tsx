import { Card, CardContent, CardHeader } from '@/ui/primitives'
import { LoginFormContainer } from '../containers/LoginForm.container'

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Đăng nhập vào tài khoản
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Chào mừng bạn quay trở lại BookStore
          </p>
        </div>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium">Thông tin đăng nhập</h3>
          </CardHeader>
          <CardContent>
            <LoginFormContainer />
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Chưa có tài khoản?{' '}
            <a href="/register" className="font-medium text-blue-600 hover:text-blue-500">
              Đăng ký ngay
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
