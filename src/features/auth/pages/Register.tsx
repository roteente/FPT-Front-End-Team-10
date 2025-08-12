import { Link } from 'react-router-dom'
import { RegisterFormContainer } from '../containers/RegisterForm.container'

export default function Register() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Register Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Tạo tài khoản mới
            </h2>
            <p className="text-sm text-gray-600">
              Tham gia cùng Tiki để khám phá thế giới mua sắm
            </p>
          </div>

          <div className="mt-8">
            <RegisterFormContainer />
          </div>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Đã có tài khoản?{' '}
              <Link 
                to="/login" 
                className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
              >
                Đăng nhập ngay
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Illustration */}
      <div className="hidden lg:block flex-1 bg-gradient-to-br from-green-50 to-blue-100 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            {/* Robot Logo */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                {/* Main robot body */}
                <div className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center relative shadow-lg">
                  <div className="text-white text-4xl font-bold">nn</div>
                  
                  {/* Robot eyes */}
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-6 bg-green-600 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Robot arms */}
                  <div className="absolute -left-6 top-1/2 transform -translate-y-1/2">
                    <div className="w-4 h-8 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="absolute -right-6 top-1/2 transform -translate-y-1/2">
                    <div className="w-4 h-8 bg-green-400 rounded-full"></div>
                  </div>
                  
                  {/* Robot legs */}
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    <div className="w-3 h-6 bg-green-400 rounded-full"></div>
                    <div className="w-3 h-6 bg-green-400 rounded-full"></div>
                  </div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute -top-4 -left-4">
                  <div className="w-6 h-6 text-yellow-400">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
                
                <div className="absolute -top-2 -right-6">
                  <div className="w-4 h-4 text-yellow-300">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
                
                <div className="absolute -bottom-4 -right-2">
                  <div className="w-3 h-3 text-yellow-400">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Text */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-green-600">
                Chào mừng đến với Tiki
              </h3>
              <p className="text-green-500 max-w-sm mx-auto leading-relaxed">
                Khám phá hàng triệu sản phẩm chất lượng
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
