import { Link } from 'react-router-dom'
import { Logo } from './header/Logo'
import { SearchBox } from './header/SearchBox'
import { CartButton } from './header/CartButton'
import { AuthButton } from './header/AuthButton'
import { useCartItemCount } from '@/features/cart/hooks/useCartItemCount'
import { useEffect } from 'react'
import { useAppSelector } from '@/app/hooks'

interface HeaderProps {
  onSearch?: (query: string) => void
  onLoginClick?: () => void
}

export function Header({ onSearch, onLoginClick }: HeaderProps) {
  const { itemCount: cartItemsCount, refetchCart } = useCartItemCount()
  
  // Watch for API mutations to detect cart changes
  const mutations = useAppSelector((state) => state.api.mutations)
  const cartEndpoints = ['addCartItem', 'updateCartItem', 'removeCartItem']
  
  // Refresh cart count when component mounts, when it gains focus, and after cart mutations
  useEffect(() => {
    refetchCart()
    
    // Set up a focus event listener to refresh cart count when the tab regains focus
    const handleFocus = () => {
      refetchCart()
    }
    
    window.addEventListener('focus', handleFocus)
    
    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('focus', handleFocus)
    }
  }, [refetchCart])
  
  // Refresh cart count when cart mutations occur
  useEffect(() => {
    // Check if any cart-related mutations have occurred
    const hasMutation = Object.entries(mutations).some(
      ([_, mutation]) => 
        mutation && 
        mutation.status === 'fulfilled' && 
        mutation.endpointName && 
        cartEndpoints.some(endpoint => mutation.endpointName.includes(endpoint))
    )
    
    if (hasMutation) {
      refetchCart()
    }
  }, [mutations, refetchCart])

  return (
    <header className="bg-white shadow-sm border-b border-gray-200" style={{ height: '88px' }}>
      <div className="max-w-[1440px] mx-auto px-6 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Left section - Logo + Brand */}
          <div className="flex flex-col items-center" style={{ width: '96px' }}>
            <Logo />
            <span className="text-[10px] text-[#003EA1] font-medium mt-1">Tốt & Nhanh</span>
          </div>
          
          {/* Center - Search section */}
          <div className="flex-1 mx-8">
            <SearchBox onSearch={onSearch} />
          </div>
          
          {/* Right section - Home, Account and Cart */}
          <div className="flex items-center space-x-6">
            {/* Home navigation */}
            <Link 
              to="/" 
              className="flex flex-col items-center cursor-pointer hover:text-[#003EA1] transition-colors"
            >
              <img 
                src="/header_menu_item_home.svg" 
                alt="Trang chủ" 
                className="w-6 h-6 mb-1"
              />
              <span className="text-xs text-[#808089] hover:text-[#003EA1]">Trang chủ</span>
            </Link>
            
            <AuthButton onLoginClick={onLoginClick} />
            <CartButton itemCount={cartItemsCount} />
          </div>
        </div>
      </div>
    </header>
  )
}
