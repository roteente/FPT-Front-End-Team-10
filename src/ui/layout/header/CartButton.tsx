import { Link } from 'react-router-dom'

interface CartButtonProps {
  itemCount?: number
}

export function CartButton({ itemCount = 0 }: CartButtonProps) {
  return (
    <Link to="/cart" className="relative flex flex-col items-center cursor-pointer hover:text-[#003EA1] transition-colors">
      {/* Standard cart icon regardless of empty status */}
      <svg className="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 24 24" color="#808089">
        <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
      </svg>
      <span className="text-xs text-[#808089] hover:text-[#003EA1]">Giỏ hàng</span>
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-[#FF424F] text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-semibold">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </Link>
  )
}
