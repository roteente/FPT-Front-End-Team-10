import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/app/hooks'
import { logout } from '@/features/auth/model/authSlice'
import { useLogoutMutation } from '@/features/auth/api/authApi'
import { useAuthVM } from '@/features/auth/hooks/useAuthVM'

interface AuthButtonProps {
  onLoginClick?: () => void
}

export function AuthButton({ onLoginClick }: AuthButtonProps) {
  const { isAuthenticated, user } = useAuthVM()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [logoutMutation] = useLogoutMutation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    try {
      await logoutMutation().unwrap()
    } catch (error) {
      // Even if the API call fails, we still want to log out locally
      console.error('Logout API error:', error)
    } finally {
      dispatch(logout())
      setIsDropdownOpen(false)
      navigate('/')
    }
  }

  if (isAuthenticated && user) {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex flex-col items-center cursor-pointer hover:text-[#003EA1] transition-colors"
        >
          {user.avatar ? (
            <img
              src={user.avatar}
              alt="Avatar"
              width="24"
              height="24"
              className="mb-1 rounded-full object-cover"
            />
          ) : (
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mb-1">
              <span className="text-white text-xs font-medium">
                {(user?.name?.charAt(0) || '').toUpperCase()}
              </span>
            </div>
          )}
          <span className="text-xs text-[#808089] hover:text-[#003EA1] truncate max-w-16">
            {user?.name || 'Người dùng'}
          </span>
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>

            <Link
              to="/profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => setIsDropdownOpen(false)}
            >
              Thông tin cá nhân
            </Link>

            <Link
              to="/orders"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => setIsDropdownOpen(false)}
            >
              Đơn hàng của tôi
            </Link>

            <Link
              to="/settings"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => setIsDropdownOpen(false)}
            >
              Cài đặt
            </Link>

            {user.role === 'admin' && (
              <Link
                to="/admin"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={() => setIsDropdownOpen(false)}
              >
                Quản trị
              </Link>
            )}

            <div className="border-t border-gray-100">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <button
      onClick={onLoginClick}
      className="flex flex-col items-center cursor-pointer hover:text-[#003EA1] transition-colors"
    >
      <img
        src="/header_header_account_img.svg"
        alt="Tài khoản"
        width="24"
        height="24"
        className="mb-1"
      />
      <span className="text-xs text-[#808089] hover:text-[#003EA1]">Đăng nhập</span>
    </button>
  )
}
