import { Link } from 'react-router-dom'

interface AuthButtonProps {
  user?: { name: string } | null
  onLogout?: () => void
}

export function AuthButton({ user, onLogout }: AuthButtonProps) {
  if (user) {
    return (
      <div className="flex flex-col items-center cursor-pointer hover:text-[#003EA1] transition-colors">
        <img 
          src="/header_header_account_img.svg" 
          alt="Tài khoản" 
          width="24"
          height="24"
          className="mb-1"
        />
        <span className="text-xs text-[#808089] hover:text-[#003EA1]">Tài khoản</span>
        <button 
          onClick={onLogout}
          className="text-[10px] text-gray-400 hover:text-[#003EA1] transition-colors mt-1"
        >
          Đăng xuất
        </button>
      </div>
    )
  }

  return (
    <Link to="/login" className="flex flex-col items-center cursor-pointer hover:text-[#003EA1] transition-colors">
      <img 
        src="/header_header_account_img.svg" 
        alt="Tài khoản" 
        width="24"
        height="24"
        className="mb-1"
      />
      <span className="text-xs text-[#808089] hover:text-[#003EA1]">Tài khoản</span>
    </Link>
  )
}
